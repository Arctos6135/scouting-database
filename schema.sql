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
    team_number INT, 
	start_level	INT NOT NULL,
	sand_cs_hatch INT NOT NULL,
	sand_r1_hatch	INT NOT NULL,
	sand_r2_hatch	INT NOT NULL,
	sand_r3_hatch	INT NOT NULL,
	sand_cs_cargo INT NOT NULL,
	sand_r1_cargo INT NOT NULL,
	sand_r2_cargo INT NOT NULL,
	sand_r3_cargo INT NOT NULL,

	tele_cs_hatch	INT NOT NULL,
	tele_r1_hatch	INT NOT NULL,
	tele_r2_hatch	INT NOT NULL,
	tele_r3_hatch	INT NOT NULL,
	tele_cs_cargo	INT NOT NULL,
	tele_r1_cargo	INT NOT NULL,
	tele_r2_cargo	INT NOT NULL,
	tele_r3_cargo	INT NOT NULL,

	defense_time	NUMERIC NOT NULL,
	assist			INT NOT NULL,
	climb			INT NOT NULL,
	tipped			INT NOT NULL,
	broke			INT NOT NULL,
	floor_h			INT NOT NULL,
	dropped_h		INT NOT NULL,

    CONSTRAINT FOREIGN KEY (alliance_id) REFERENCES alliance (alliance_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (team_number) REFERENCES alliance_member (team_number) ON DELETE CASCADE
    
)