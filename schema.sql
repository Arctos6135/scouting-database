CREATE DATABASE strategy;
USE strategy;
/*  MySQL 8 has pluggable authentication methods.
 The default is caching_sha2_password  but node mysql does not support it.
 Downgrade this account to use plaintext password authentication. */

CREATE USER 'strategy'@'%' IDENTIFIED WITH mysql_native_password BY 'foo';
GRANT SELECT,INSERT,UPDATE,DELETE
  ON strategy.*
  TO 'strategy';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS team;
CREATE TABLE team (
	team_number INT PRIMARY KEY, 
    name VARCHAR(128)
);
DROP TABLE IF EXISTS frc_event;
CREATE TABLE frc_event (
	event_code VARCHAR (32) PRIMARY KEY
);
DROP TABLE IF EXISTS frc_match;
CREATE TABLE frc_match (
	match_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	match_number NUMERIC, -- assigned by event scheduler (ex. quals 4)
    event_code VARCHAR (32),
    match_type ENUM('p', 'qm', 'qf', 'sf', 'f'),
    CONSTRAINT FOREIGN KEY (event_code) REFERENCES frc_event (event_code) ON DELETE CASCADE,
    UNIQUE(match_number, event_code, match_type)
);
DROP TABLE IF EXISTS alliance;
CREATE TABLE alliance (
	alliance_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	match_id INT,
	alliance_colour ENUM ('red', 'blue'), 
    CONSTRAINT FOREIGN KEY (match_id) REFERENCES frc_match (match_id) ON DELETE CASCADE,
    UNIQUE(match_id, alliance_colour)
);
DROP TABLE IF EXISTS alliance_member; 
CREATE TABLE alliance_member (
	alliance_id INT,
    team_number INT,
    CONSTRAINT FOREIGN KEY (team_number) REFERENCES team (team_number) ON DELETE CASCADE, 
	CONSTRAINT FOREIGN KEY (alliance_id) REFERENCES alliance (alliance_id) ON DELETE CASCADE,
    UNIQUE (alliance_id, team_number)
);
DROP TABLE IF EXISTS alliance_outcome;
CREATE TABLE alliance_outcome (
	alliance_id INT NOT NULL,
    score NUMERIC,
    RP1_rocket BOOLEAN,
    RP2_climbed BOOLEAN,
    CONSTRAINT FOREIGN KEY (alliance_id) REFERENCES alliance (alliance_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS alliance_member_outcome;
CREATE TABLE alliance_member_outcome (
	alliance_id INT NOT NULL,
    team_number INT NOT NULL, 
	start_level	INT,
	sand_cs_hatch INT,
	sand_r1_hatch INT,
	sand_r2_hatch INT,
	sand_r3_hatch INT,
	sand_cs_cargo INT,
	sand_r1_cargo INT,
	sand_r2_cargo INT,
	sand_r3_cargo INT,

	tele_cs_hatch	INT,
	tele_r1_hatch	INT,
	tele_r2_hatch	INT,
	tele_r3_hatch	INT,
	tele_cs_cargo	INT,
	tele_r1_cargo	INT,
	tele_r2_cargo	INT,
	tele_r3_cargo	INT,

	defense_time	NUMERIC,
	assist_level	INT,
	climb_level	    INT,
	tipped			BOOLEAN,
	broke			BOOLEAN,
	floor_hatch		BOOLEAN,
	dropped_hatch	INT,
    penalties       INT,

    CONSTRAINT FOREIGN KEY (alliance_id) REFERENCES alliance (alliance_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (team_number) REFERENCES alliance_member (team_number) ON DELETE CASCADE,
    UNIQUE (alliance_id, team_number)
);

-- denormalized view of the matches with all teams in all alliances
CREATE OR REPLACE VIEW denormalized_schedule AS 
WITH match_team_pos AS (
SELECT m.match_id
     , a.alliance_colour
	 , t.team_number
     , team.name
     , ROW_NUMBER() OVER w as r
FROM frc_match m
INNER JOIN alliance a
        ON a.match_id = m.match_id
INNER JOIN alliance_member t
        ON t.alliance_id = a.alliance_id
INNER JOIN team
        ON team.team_number = t.team_number
WINDOW w AS (partition by m.match_id, a.alliance_colour ORDER BY t.team_number))
SELECT m.match_id
	 , m.event_code
     , m.match_type
     , m.match_number
     , r1.team_number as red1
     , r1.name        as red1_name
     , r2.team_number as red2
     , r2.name        as red2_name
     , r3.team_number as red3
     , r3.name        as red3_name
     , b1.team_number as blue1
     , b1.name        as blue1_name
     , b2.team_number as blue2
     , b2.name        as blue2_name
     , b3.team_number as blue3
     , b3.name        as blue3_name
FROM frc_match m
INNER JOIN match_team_pos r1
 ON r1.match_id = m.match_id AND r1.alliance_colour = 'red' and r1.r = 1
INNER JOIN match_team_pos r2
 ON r2.match_id = m.match_id AND r2.alliance_colour = 'red' and r2.r = 2
INNER JOIN match_team_pos r3
 ON r3.match_id = m.match_id AND r3.alliance_colour = 'red' and r3.r = 3
INNER JOIN match_team_pos b1
 ON b1.match_id = m.match_id AND b1.alliance_colour = 'blue' and b1.r = 1
INNER JOIN match_team_pos b2
 ON b2.match_id = m.match_id AND b2.alliance_colour = 'blue' and b2.r = 2
INNER JOIN match_team_pos b3
 ON b3.match_id = m.match_id AND b3.alliance_colour = 'blue' and b3.r = 3;
 
CREATE OR REPLACE VIEW all_scouting_output AS 
SELECT 	am.team_number, 
		avg(ao.score)/3 AS 'avg_per_bot_score', 
        avg(2*(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch +
			   amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch)+
			3*(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo + 
               amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo)+
			power(2,amo.climb_level)+amo.climb_level+floor(amo.climb_level/3)+
            power(2,amo.assist_level)+amo.assist_level+floor(amo.assist_level/3)) AS 'avg_score',
        avg(ao.RP1_rocket)/3 AS 'avg_rocket_RP_fraction', 
        avg(amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'avg_rocket_RP',
        
        avg(ao.RP2_climbed)/3 AS 'avg_climb_RP_fraction',
		avg((power(2,amo.climb_level)+amo.climb_level+floor(amo.climb_level/3))/15) AS 'avg_climb_RP',
        
        min(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'min_game_pieces',
		max(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'max_game_pieces',
		avg(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'avg_game_pieces',
            
        min(amo.start_level) AS 'min_start_level',
        max(amo.start_level) AS 'max_start_level',
        avg(amo.start_level) AS 'avg_start_level',
        min(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'min_sand_hatch',
        max(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'max_sand_hatch',
        avg(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'avg_sand_hatch',
        min(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'min_sand_cargo',
		max(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'max_sand_cargo',
        avg(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'avg_sand_cargo',
        
        min(amo.tele_cs_hatch) AS 'min_tele_cs_hatch',
        max(amo.tele_cs_hatch) AS 'max_tele_cs_hatch',
        avg(amo.tele_cs_hatch) AS 'avg_tele_cs_hatch',
        min(amo.tele_r1_hatch) AS 'min_tele_r1_hatch',
        max(amo.tele_r1_hatch) AS 'max_tele_r1_hatch',
        avg(amo.tele_r1_hatch) AS 'avg_tele_r1_hatch',
        min(amo.tele_r2_hatch) AS 'min_tele_r2_hatch',
        max(amo.tele_r2_hatch) AS 'max_tele_r2_hatch',
        avg(amo.tele_r2_hatch) AS 'avg_tele_r2_hatch',
        min(amo.tele_r3_hatch) AS 'min_tele_r3_hatch',
        max(amo.tele_r3_hatch) AS 'max_tele_r3_hatch',
        avg(amo.tele_r3_hatch) AS 'avg_tele_r3_hatch',
        
        min(amo.tele_cs_cargo) AS 'min_tele_cs_cargo',
        max(amo.tele_cs_cargo) AS 'max_tele_cs_cargo',
        avg(amo.tele_cs_cargo) AS 'avg_tele_cs_cargo',
        min(amo.tele_r1_cargo) AS 'min_tele_r1_cargo',
        max(amo.tele_r1_cargo) AS 'max_tele_r1_cargo',
        avg(amo.tele_r1_cargo) AS 'avg_tele_r1_cargo',
        min(amo.tele_r2_cargo) AS 'min_tele_r2_cargo',
        max(amo.tele_r2_cargo) AS 'max_tele_r2_cargo',
        avg(amo.tele_r2_cargo) AS 'avg_tele_r2_cargo',
        min(amo.tele_r3_cargo) AS 'min_tele_r3_cargo',
        max(amo.tele_r3_cargo) AS 'max_tele_r3_cargo',
        avg(amo.tele_r3_cargo) AS 'avg_tele_r3_cargo',
        
        min(amo.defense_time) AS 'min_defense_time',
		max(amo.defense_time) AS 'max_defense_time',
        avg(amo.defense_time) AS 'avg_defense_time',
        
        min(amo.assist_level) AS 'min_assist_level',
        max(amo.assist_level) AS 'max_assist_level',
        avg(amo.assist_level) AS 'avg_assist_level',
        
        min(amo.climb_level) AS 'min_climb_level',
        max(amo.climb_level) AS 'max_climb_level',
        avg(amo.climb_level) AS 'avg_climb_level',
        
        avg(amo.tipped) AS 'avg_tipped',
        avg(amo.broke) AS 'avg_broke',
        max(amo.floor_hatch) AS 'floor_hatch',
        min(amo.dropped_hatch) AS 'min_dropped_hatch',
        max(amo.dropped_hatch) AS 'max_dropped_hatch',
        avg(amo.dropped_hatch) AS 'avg_dropped_hatch',
        
        min(amo.penalties) AS 'min_penalties',
        max(amo.penalties) AS 'max_penalties',
        avg(amo.penalties) AS 'avg_penalties'
FROM frc_match m
	INNER JOIN alliance a
			ON a.match_id = m.match_id
	INNER JOIN alliance_member am
			ON am.alliance_id = a.alliance_id
	INNER JOIN alliance_outcome ao
			ON ao.alliance_id = a.alliance_id
	INNER JOIN alliance_member_outcome amo
			ON amo.alliance_id = a.alliance_id
		   AND amo.team_number = am.team_number
GROUP BY am.team_number;

CREATE OR REPLACE VIEW specific_scouting_output AS 
SELECT 	m.event_code,
		am.team_number, 
		avg(ao.score)/3 AS 'avg_per_bot_score', 
        avg(2*(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch +
			   amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch)+
			3*(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo + 
               amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo)+
			power(2,amo.climb_level)+amo.climb_level+floor(amo.climb_level/3)+
            power(2,amo.assist_level)+amo.assist_level+floor(amo.assist_level/3)) AS 'avg_score',
        avg(ao.RP1_rocket)/3 AS 'avg_rocket_RP_fraction', 
        avg(amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'avg_rocket_RP',
        
        avg(ao.RP2_climbed)/3 AS 'avg_climb_RP_fraction',
		avg((power(2,amo.climb_level)+amo.climb_level+floor(amo.climb_level/3))/15) AS 'avg_climb_RP',
        
        min(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'min_game_pieces',
		max(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'max_game_pieces',
		avg(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch + 
            amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo +
            amo.tele_cs_hatch + amo.tele_r1_hatch + amo.tele_r2_hatch + amo.tele_r3_hatch +
            amo.tele_cs_cargo + amo.tele_r1_cargo + amo.tele_r2_cargo + amo.tele_r3_cargo) AS 'avg_game_pieces',
            
        min(amo.start_level) AS 'min_start_level',
        max(amo.start_level) AS 'max_start_level',
        avg(amo.start_level) AS 'avg_start_level',
        min(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'min_sand_hatch',
        max(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'max_sand_hatch',
        avg(amo.sand_cs_hatch + amo.sand_r1_hatch + amo.sand_r2_hatch + amo.sand_r3_hatch) AS 'avg_sand_hatch',
        min(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'min_sand_cargo',
		max(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'max_sand_cargo',
        avg(amo.sand_cs_cargo + amo.sand_r1_cargo + amo.sand_r2_cargo + amo.sand_r3_cargo) AS 'avg_sand_cargo',
        
        min(amo.tele_cs_hatch) AS 'min_tele_cs_hatch',
        max(amo.tele_cs_hatch) AS 'max_tele_cs_hatch',
        avg(amo.tele_cs_hatch) AS 'avg_tele_cs_hatch',
        min(amo.tele_r1_hatch) AS 'min_tele_r1_hatch',
        max(amo.tele_r1_hatch) AS 'max_tele_r1_hatch',
        avg(amo.tele_r1_hatch) AS 'avg_tele_r1_hatch',
        min(amo.tele_r2_hatch) AS 'min_tele_r2_hatch',
        max(amo.tele_r2_hatch) AS 'max_tele_r2_hatch',
        avg(amo.tele_r2_hatch) AS 'avg_tele_r2_hatch',
        min(amo.tele_r3_hatch) AS 'min_tele_r3_hatch',
        max(amo.tele_r3_hatch) AS 'max_tele_r3_hatch',
        avg(amo.tele_r3_hatch) AS 'avg_tele_r3_hatch',
        
         min(amo.tele_cs_cargo) AS 'min_tele_cs_cargo',
        max(amo.tele_cs_cargo) AS 'max_tele_cs_cargo',
        avg(amo.tele_cs_cargo) AS 'avg_tele_cs_cargo',
        min(amo.tele_r1_cargo) AS 'min_tele_r1_cargo',
        max(amo.tele_r1_cargo) AS 'max_tele_r1_cargo',
        avg(amo.tele_r1_cargo) AS 'avg_tele_r1_cargo',
        min(amo.tele_r2_cargo) AS 'min_tele_r2_cargo',
        max(amo.tele_r2_cargo) AS 'max_tele_r2_cargo',
        avg(amo.tele_r2_cargo) AS 'avg_tele_r2_cargo',
        min(amo.tele_r3_cargo) AS 'min_tele_r3_cargo',
        max(amo.tele_r3_cargo) AS 'max_tele_r3_cargo',
        avg(amo.tele_r3_cargo) AS 'avg_tele_r3_cargo',
        
        min(amo.defense_time) AS 'min_defense_time',
		max(amo.defense_time) AS 'max_defense_time',
        avg(amo.defense_time) AS 'avg_defense_time',
        
        min(amo.assist_level) AS 'min_assist_level',
        max(amo.assist_level) AS 'max_assist_level',
        avg(amo.assist_level) AS 'avg_assist_level',
        
        min(amo.climb_level) AS 'min_climb_level',
        max(amo.climb_level) AS 'max_climb_level',
        avg(amo.climb_level) AS 'avg_climb_level',
        
        avg(amo.tipped) AS 'avg_tipped',
        avg(amo.broke) AS 'avg_broke',
        avg(amo.floor_hatch) AS 'avg_floor_hatch',
        min(amo.dropped_hatch) AS 'min_dropped_hatch',
        max(amo.dropped_hatch) AS 'max_dropped_hatch',
        avg(amo.dropped_hatch) AS 'avg_dropped_hatch',
        
        min(amo.penalties) AS 'min_penalties',
        max(amo.penalties) AS 'max_penalties',
        avg(amo.penalties) AS 'avg_penalties'
FROM frc_match m
	INNER JOIN alliance a
			ON a.match_id = m.match_id
	INNER JOIN alliance_member am
			ON am.alliance_id = a.alliance_id
	INNER JOIN alliance_outcome ao
			ON ao.alliance_id = a.alliance_id
	INNER JOIN alliance_member_outcome amo
			ON amo.alliance_id = a.alliance_id
		   AND amo.team_number = am.team_number
GROUP BY m.event_code, am.team_number;

-- this view is for when you need to look something up quickly (like writing a very specific query on the fly)
-- it uses the denormalized schedule so including team information is easy
CREATE OR REPLACE VIEW id_sheet AS
	SELECT ds.*, 
		   m.match_id,
           red.alliance_id AS 'red alliance_id',
           blue.alliance_id AS 'blue alliance_id'
	FROM denormalized_schedule ds
		INNER JOIN frc_match m
				ON ds.event_code = m.event_code
			   AND ds.match_type = m.match_type
               AND ds.match_number = m.match_number
		INNER JOIN alliance red
				ON m.match_id = red.match_id
			   AND red.alliance_colour = 'red'
		INNER JOIN alliance blue
				ON m.match_id = blue.match_id
                AND blue.alliance_colour = 'blue';
        
DROP VIEW match_teams;

