drop procedure if exists calculate_team_data;
DELIMITER ;;

CREATE PROCEDURE calculate_team_data()
BEGIN

DECLARE counter int DEFAULT 1;

label1: LOOP
	SELECT count(*) FROM team_numbers INTO @no_of_teams;
    
	SELECT team_number
	FROM team_numbers
	WHERE id = counter
    INTO @team_number;
    
    
    SELECT
		@start_lvl := avg(start),
		
		@ss_max_gmpc := max(ss_cs_hatch+ss_r1_hatch+ss_r2_hatch+ss_r3_hatch+ss_cs_cargo+ss_r1_cargo+ss_r2_cargo+ss_r3_cargo),
		@ss_max_hatch := max(ss_cs_hatch+ss_r1_hatch+ss_r2_hatch+ss_r3_hatch),
		@ss_cs_hatch := avg(ss_cs_hatch),
		@ss_r1_hatch := avg(ss_r1_hatch),
		@ss_r2_hatch := avg(ss_r2_hatch),
		@ss_r3_hatch := avg(ss_r3_hatch),
		
		@ss_max_cargo := max(ss_cs_cargo+ss_r1_cargo+ss_r2_cargo+ss_r3_cargo),
		@ss_cs_cargo := avg(ss_cs_cargo),
		@ss_r1_cargo := avg(ss_r1_cargo),
		@ss_r2_cargo := avg(ss_r2_cargo),
		@ss_r3_cargo := avg(ss_r3_cargo),
		
		@tele_max_gmpc := max(tele_cs_hatch+tele_r1_hatch+tele_r2_hatch+tele_r3_hatch+tele_cs_cargo+tele_r1_cargo+tele_r2_cargo+tele_r3_cargo),
		@tele_max_hatch := max(tele_cs_hatch+tele_r1_hatch+tele_r2_hatch+tele_r3_hatch),
		@tele_cs_hatch := avg(tele_cs_hatch),
		@tele_r1_hatch := avg(tele_r1_hatch),
		@tele_r2_hatch := avg(tele_r2_hatch),
		@tele_r3_hatch := avg(tele_r3_hatch),
		
		@tele_max_cargo := max(tele_cs_cargo+tele_r1_cargo+tele_r2_cargo+tele_r3_cargo),
		@tele_cs_cargo := avg(tele_cs_cargo),
		@tele_r1_cargo := avg(tele_r1_cargo),
		@tele_r2_cargo := avg(tele_r2_cargo),
		@tele_r3_cargo := avg(tele_r3_cargo),
		
		@defense := avg(defense),
		@assist := avg(assist),
		@climb := avg(climb),
		@tipped := avg(tipped),
		@broke := avg(broke),
		@floor_h := avg(floor_h),
		@drop_h := avg(dropped_h),
		@no_of_matches := count(*),
		@max_climb := max(climb)
	FROM
		raw_data
	WHERE
		team_number = @team_number;
    
	SELECT
		@avg_points := (@ss_cs_cargo+@ss_r1_cargo+@ss_r2_cargo+@ss_r3_cargo+@tele_cs_cargo+@tele_r1_cargo+@tele_r2_cargo+@tele_r3_cargo)*3+
		(@ss_cs_hatch+@ss_r1_hatch+@ss_r2_hatch+@ss_r3_hatch+@tele_cs_hatch+@tele_r1_hatch+@tele_r2_hatch+@tele_r3_hatch)*2+
		(@start_lvl)*3+
		if(@climb > 2, (@climb - 1)*6, (@climb)*3),
		
		@avg_low_level_points := (@ss_cs_cargo + @ss_r1_cargo + @tele_cs_cargo + @tele_r1_cargo)*3+
		(@ss_cs_hatch + @ss_r1_hatch + @tele_cs_hatch + @tele_r1_hatch)*2
	;
    
    INSERT INTO processed_data_2 VALUES
    (@team_number,
    "Arctos",
    @avg_points,
    @avg_low_level_points,
    0,
    @start_lvl,
    @ss_max_gmpc,
    @ss_max_hatch,
    @ss_cs_hatch,
    @ss_r1_hatch,
    @ss_r2_hatch,
    @ss_r3_hatch,
    @ss_max_cargo,
    @ss_cs_cargo,
    @ss_r1_cargo,
    @ss_r2_cargo,
    @ss_r3_cargo,
    @tele_max_gmpc,
    @tele_max_hatch,
    @tele_cs_hatch,
    @tele_r1_hatch,
    @tele_r2_hatch,
    @tele_r3_hatch,
    @tele_max_cargo,
    @tele_cs_cargo,
    @tele_r1_cargo,
    @tele_r2_cargo,
    @tele_r3_cargo,
    @defense,
    @assist,
    @climb,
    @tipped,
    @broke,
    @floor_h,
    0,
    @drop_h,
    @no_of_matches,
    0,
    0,
    0,
    0,
    @max_climb);
    
    IF counter = @no_of_teams THEN
		LEAVE label1;
	END IF;
    
    SET counter = counter + 1;
    ITERATE label1;
END LOOP label1;
END ;;

DELIMITER ;