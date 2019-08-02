USE strategy;

SELECT * FROM team ORDER BY team_number;
SELECT * from frc_event;
SELECT * FROM frc_match order by match_id ASC;
SELECT * from alliance;
SELECT * from alliance_member;
SELECT * FROM alliance_member_outcome ORDER BY alliance_id ASC;
SELECT * FROM denormalized_schedule
	WHERE event_code = '2019onosh'
ORDER BY match_number ASC;
SELECT * FROM scouting_output;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM alliance_outcome;

-- find alliance sizes for all frc_match
SELECT
   m.event_code
 , m.match_number
 , red.alliance_id as red_id
 , blue.alliance_id as blue_id
 , COUNT(DISTINCT red_team.team_number) as nRed
 , COUNT(DISTINCT blue_team.team_number) as nBlue
FROM frc_match m
INNER JOIN alliance red
   ON red.match_id = m.match_id
  AND red.alliance_colour = 'red'
INNER JOIN alliance blue
 ON blue.match_id = m.match_id
  AND blue.alliance_colour = 'blue'
INNER JOIN alliance_member red_team
 ON red_team.alliance_id = red.alliance_id
INNER JOIN alliance_member blue_team
 ON blue_team.alliance_id = blue.alliance_id
GROUP BY m.event_code, m.match_number, red.alliance_id, blue.alliance_id
ORDER BY m.event_code, m.match_number;
 
 -- select all frc_match of 6135
SELECT
   m.event_code
 , m.match_number
 , a.alliance_colour
FROM frc_match m
INNER JOIN alliance a
   ON a.match_id = m.match_id
INNER JOIN alliance_member team
 ON team.alliance_id = a.alliance_id
WHERE team.team_number = 6135
ORDER BY event_code, match_number;

-- find Arctos' next match given match number and event code
SELECT min(m.match_number)
FROM frc_match m
INNER JOIN alliance a
	ON a.match_id = m.match_id
INNER JOIN alliance_member team
	ON team.alliance_id = a.alliance_id
WHERE team.team_number = 6135 
  AND m.match_number > 4
  AND event_code = '2019onosh'

