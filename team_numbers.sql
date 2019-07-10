DROP PROCEDURE IF EXISTS make_team_numbers_table;

DELIMITER ;;

CREATE PROCEDURE make_team_numbers_table()
BEGIN

	CREATE TABLE IF NOT EXISTS team_numbers (
	id	INT unsigned NOT NULL AUTO_INCREMENT,
    team_number INT NOT NULL,
    PRIMARY KEY	(id)
	);

	TRUNCATE TABLE team_numbers;
	INSERT INTO team_numbers (team_number) SELECT DISTINCT team_number FROM raw_data ORDER BY team_number ASC;
    
END ;;

