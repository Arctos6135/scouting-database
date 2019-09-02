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
    connection.query(
        `SELECT DISTINCT event_code FROM frc_event ORDER BY event_code`,
        (error, results) => error
            ? res.json({success: false, error: error})
            : res.json({success: true, data: results}));
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
        (error, results) => error
            ? res.json({success: false, error: error})
        : res.json({success: true, data: results}));
});

router.get('/getScoutingOutput', (req, res) => {
    const event_code = req.query.event_code;
    const specific_scouting_output = req.query.specific_scouting_output == "true";
    
    //based off of view_scouting_output.js
    if (specific_scouting_output) {
	console.log("specific");
	return new Promise(
	    (resolve, reject) =>
		connection.query(`SELECT * FROM specific_scouting_output 
				 WHERE event_code = ? 
				 ORDER BY team_number ASC`,
				 [event_code],
				 (error, results) =>
				 (error)
				 ? res.json({success: false, error: error})
				 : res.json({success: true, data: results})
				));
    }

    else {
	console.log("all");
	return new Promise(
	    (resolve, reject) =>
		connection.query(`SELECT * FROM all_scouting_output aso 
				 WHERE aso.team_number IN (SELECT t.team_number
							         FROM frc_match m 
							   INNER JOIN alliance a
							           ON a.match_id = m.match_id
							   INNER JOIN alliance_member t
							           ON t.alliance_id = a.alliance_id
							   INNER JOIN team
							           ON team.team_number = t.team_number
							   WHERE m.event_code = ?) `,
				 [event_code],
				 (error, results) =>
				 (error)
				 ? res.json({success: false, error: error})
				 : res.json({success: true, data: results})
				));
    }
    
});


router.get('/getPicklist', (req, res) =>  {
    const event_code = req.query.event_code;
    // This is a totally FAKE query. Just used  to show that dynamic updating works.
    // it just picks 10 teams at random from the teams that are at the event.
    // Somebody will write a real picklist query.
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
});


// All API requests are under the url /api, e.g. /api/getTeams
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
