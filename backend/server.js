const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./db');

const API_PORT = 3001;
const app = express();

app.use(cors());
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('This is the API server for the Arctos Strategy Web app.  It expects Ajax queries to /api')
})

var connection = null;
db.with_connection(c => connection = c);

// all events
router.get('/getEvents', (req, res) => {
    try {
	connection.query(
            `SELECT DISTINCT event_code FROM frc_event ORDER BY event_code`,
            (error, results) => error
		? res.json({success: false, error: error})
            : res.json({success: true, data: results}));
    }
    catch (err) {
	res.json({success: false, error: err})
    }
});

// ?event_code=2019onosh
router.get('/getTeams', (req, res) => {
    try {
        const event_code = req.query.event_code;
        console.log(`Getting teams from event ${event_code}`);
        connection.query(
            `SELECT DISTINCT t.team_number, team.name
             FROM frc_match m 
             INNER JOIN alliance a
                     ON a.match_id = m.match_id
             INNER JOIN alliance_member t
                     ON t.alliance_id = a.alliance_id
             INNER JOIN team
                     ON team.team_number = t.team_number
             WHERE m.event_code = ?
             ORDER BY t.team_number ASC`,
            [event_code],
            (error, results) => error
                ? res.json({success: false, error: error})
            : res.json({success: true, data: results}));
    } catch (err) {
        res.json({success: false, error: err});
    }
});

router.get('/getMatches', (req, res) => {
    try {
	const event_code = req.query.event_code;
	connection.query(
            `SELECT match_type, match_number
               ,red1 ,red1_name
               ,red2 ,red2_name
               ,red3 ,red3_name
               ,blue1 ,blue1_name
               ,blue2 ,blue2_name
               ,blue3 ,blue3_name
	    FROM denormalized_schedule
	    WHERE event_code = ?
		ORDER BY match_type DESC, match_number ASC`,
	    [event_code],
            (error, results) =>
		error
		? res.json({success: false, error: error})
                : res.json({success: true, data: results}));
    } catch (err) {
        res.json({success: false, error: err});
    }
});

router. get('/getNextMatchInfo', (req, res) => {
    try {
	console.log("getNextMatchInfo");
	const event_code = req.query.event_code;
	const match_number = parseInt(req.query.match_number, 10);
	console.log("query" + req.query.match_number);
	console.log("match num =" + match_number);
	const specific_scouting_output = req.query.specific_scouting_output == "true";
	const match_type = req.query.match_type;

	if (specific_scouting_output) {
	    console.log("specific next match");
	    //this query fails to return teams not in scouting output. There is a problem with those views, not this program
	    connection.query(`SELECT *
          
                 FROM frc_match m
			         INNER JOIN alliance a
			                 ON a.match_id = m.match_id
			         INNER JOIN alliance_member am
			                 ON am.alliance_id = a.alliance_id
			         INNER JOIN specific_scouting_output sso
			                 ON sso.team_number = am.team_number
			     WHERE m.match_number = ?
			     AND m.match_type = ?
			     AND m.event_code = ?
			     AND sso.event_code = ?
			     ORDER BY a.alliance_colour, am.team_number;`,
			     [match_number, match_type, event_code, event_code],
			     (error, results) =>
			     (error)
			     ? res.json({success: false, error: error})
			     : res.json({success: true, data: results}));
	}

	else {
	    console.log("all " + [match_number,match_type, event_code]);
	    connection.query(`SELECT *
			     FROM frc_match m
			         INNER JOIN alliance a
			                 ON a.match_id = m.match_id
			         INNER JOIN alliance_member am
			                 ON am.alliance_id = a.alliance_id
			         INNER JOIN all_scouting_output aso
			                 ON aso.team_number = am.team_number
			     WHERE m.match_number = ?
			     AND m.match_type = ?
			       AND m.event_code = ?
			     ORDER BY a.alliance_colour, am.team_number;`,
			     [match_number, match_type, event_code],
			     (error, results) =>
			     (error)
			     ? res.json({success: false, error: error})
			     : res.json({success: true, data: results}));
	}
    }
    catch (err) {
	res.json({success: false, error: err});
    }
});
	    
router.get('/getScoutingOutput', (req, res) => {
    try {
	const event_code = req.query.event_code;
	const specific_scouting_output = req.query.specific_scouting_output == "true";
	
	//based off of view_scouting_output.js
	if (specific_scouting_output) {
	    connection.query(`SELECT * FROM specific_scouting_output 
				 WHERE event_code = ? 
				 ORDER BY team_number ASC`,
			     [event_code],
			     (error, results) =>
			     (error)
			     ? res.json({success: false, error: error}) 
			     : res.json({success: true, data: results})
			    );
	}

	else {
	    
	    connection.query(`SELECT * FROM all_scouting_output aso 
			     WHERE aso.team_number IN (SELECT t.team_number
						       FROM frc_match m 
						       INNER JOIN alliance a
						       ON a.match_id = m.match_id
							   INNER JOIN alliance_member t
						       ON t.alliance_id = a.alliance_id
							   INNER JOIN team
						       ON team.team_number = t.team_number
						       WHERE m.event_code = ?)
			     ORDER BY aso.team_number ASC`,
				 [event_code],
			     (error, results) =>
			     (error)
			     ? res.json({success: false, error: error})
			     : res.json({success: true, data: results})
			    );
	}
    } catch (err) {
        res.json({success: false, error: err});
    } 
});

router.get('/getSpecificTeamsInfo', (req, res) => {
    //this query takes a few seconds to run, for some reason
    try {
	const team_to_search = parseInt(req.query.team_to_search);
	const event_code = req.query.event_code
	connection.query(`SELECT m.match_type,
			 m.match_number,
			 amo.*,
			 ao.score,
			 ao.RP1_rocket,
			 ao.RP2_climbed,
				 dn.red1, dn.red2, dn.red3,
				 dn.blue1, dn.blue2, dn.blue3 FROM frc_match m
				 INNER JOIN alliance a
				         ON m.match_id = a.match_id
				 INNER JOIN alliance_member am
				         ON am.alliance_id = a.alliance_id
				 INNER JOIN alliance_member_outcome amo
				         ON amo.team_number = am.team_number
            				AND amo.alliance_id = a.alliance_id
				 INNER JOIN alliance_outcome ao
				         ON ao.alliance_id = a.alliance_id
				 INNER JOIN denormalized_schedule dn 
				         ON dn.match_id = m.match_id
				 WHERE am.team_number = ?
    				   AND m.event_code = ?
			 ORDER BY m.match_type ASC, m.match_number DESC;`,
			 [team_to_search, event_code],
			 (error, results) =>
			 (error)
			 ? res.json({success: false, error: error})
			 : res.json({success: true, data: results})
			);
    }
    catch (err) {
	res.json({success: false, error: err});
    }
});

router.get('/getNextMatchNumber', (req, res) => {
    try {
	const last_match_number = req.query.last_match_number;
	const match_type = req.query.match_type;
	const event_code = req.query.event_code;
	console.log("getting next match #");
	connection.query(`SELECT m.match_number, m.match_type FROM frc_match m
			 INNER JOIN alliance a
			 ON a.match_id = m.match_id
			 INNER JOIN alliance_member am
			 ON am.alliance_id = a.alliance_id
			 WHERE am.team_number = 6135
			 AND (m.match_type > ?
			      OR m.match_number > ?)
			 AND m.event_code = ?
			 ORDER BY m.match_type ASC, m.match_number ASC`,
			 [match_type, last_match_number, event_code],
			 (error, results) =>
			 (error)
			 ? res.json({success: false, error: error})
			 : res.json({success: true, data: results[0]})
			);
    }  catch (err) {
        res.json({success: false, error: err});
    }
});

router.get('/runCustomQuery', (req, res) => {
    try {
	const db_query = req.query.query;
	console.log(db_query);
	connection.query(db_query, [],
			 (error, results) =>
			 (error)
			 ? res.json({success: false, error: error})
			 : res.json({success: true, data: results})
			);
    }
    catch (error) {
	res.json({success: false, error: error});
    }
});

router.get('/getPicklist', (req, res) =>  {
    const event_code = req.query.event_code;
    // This is a totally FAKE query. Just used  to show that dynamic updating works.
    // it just picks 10 teams at random from the teams that are at the event.
    // Somebody will write a real picklist query.
    try { 
	connection.query(
	    `SELECT 
	    ROW_NUMBER() OVER (ORDER BY fake.climb DESC) as ranking,
	    fake.*
		FROM  (SELECT random_teams.*, rand() * 3 as climb
		       FROM (SELECT DISTINCT t.team_number, team.name
			     FROM frc_match m 
			     INNER JOIN alliance a
			     ON a.match_id = m.match_id
			     INNER JOIN alliance_member t
			     ON t.alliance_id = a.alliance_id
			     INNER JOIN team
			     ON team.team_number = t.team_number
			     WHERE m.event_code = ?
			     ORDER BY RAND()
			     LIMIT 10) as random_teams
           ) AS fake
	    ORDER BY ranking ASC`,
	    [event_code],
	    (error, results) => error 
		? res.json({success: false, error: error})
	    : res.json({success: true, data: results}));
    }  catch (err) {
        res.json({success: false, error: err});
    }
});


// All API requests are under the url /api, e.g. /api/getTeams
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
