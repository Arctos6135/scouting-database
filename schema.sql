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
    practice BOOLEAN DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (event_code) REFERENCES frc_event (event_code) ON DELETE CASCADE,
    UNIQUE(match_number, event_code, practice)
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
)