// API for The Blue Alliance
// See https://www.thebluealliance.com/apidocs/v3

const https = require('https');

const endpoint = "https://www.thebluealliance.com/api/v3";

const district_key = "2019ont";

// This is my API key.
const api_key = "sX6YAEFTW4k2ovNN9IQKRhwFe5XArlokFHUU899aK6Vr4ZlbiA4tq36R4gKEmh6h";

function api_options() {
	return {"headers": 
			{"X-TBA-Auth-Key": api_key}};
}

// get the teams.  Call a handler function for each team.
// team_handler is a function that is called once for each team that the API returns
// no_more_teams is a function (of no args) called after all teams have been read
// page is an optional input used to get the next set of teams.
function all_teams(team_handler, no_more_teams, page=0) {
    var url =  endpoint + "/" + "teams/" + page + "/simple";
    https.get(url,
	      api_options(),   // TBA needs your account key
	      (resp) => {
		  // collect all the response data until there is no more
		  let reply = "";
		  resp.on('data', (chunk) => {
		      // got more data from TBA, add it to the string
		      reply += chunk;
		  });
		  
		  resp.on('end', () => {
		      // TBA got to the end of this page
		      if (reply.length <= 2) {
				  // we hit the last page so we are done
				  no_more_teams();
		      } else {
				  // the reply is a JSON object we need to parse it
				  //the result is an array of team objects, call team_handler for each one
				  JSON.parse(reply)
					  .forEach(team => team_handler(team));
				  // now get the next page of teams
				  all_teams(team_handler, no_more_teams, page+1);
		      }
		  });
		  
	      }).on('error', (e) => {
			  console.error(e);
	      });
}

// Get all the events for district 
// Call event_handler for each one.
// no_more_events is a function (of no args) called after all events have been read
function all_events(event_handler, no_more_events) {
    var url =  endpoint + "/" + "district/" + district_key + "/events/simple";
    https.get(url,
			  api_options(),   // TBA needs your account key
			  (resp) => {
				  // collect all the response data until there is no more
				  let reply = "";
				  resp.on('data', (chunk) => {
					  // got more data from TBA, add it to the string
					  reply += chunk;
				  });
		  
				  resp.on('end', () => {
					  // the reply is a JSON object we need to parse it
					  //the result is an array of event objects, call event_handler for each one
					  JSON.parse(reply)
						  .forEach(event => event_handler(event));
					  no_more_events();
				  });
			  }).on('error', (e) => {
				  console.error(e);
			  });
}

// Get all the matches for the specified event_code
// For each one, call handler
// event_handler is a function that is called once for each event that the API returns
function matches_at_event(event_code, match_handler, no_more_matches) {
    var url =  endpoint + "/event/" + event_code + "/matches/simple";
    https.get(url,
			  api_options(),   // TBA needs your account key
			  (resp) => {
				  // collect all the response data until there is no more
				  let reply = "";
				  resp.on('data', (chunk) => {
					  // got more data from TBA, add it to the string
					  reply += chunk;
				  });
		  
				  resp.on('end', () => {
					  // the reply is a JSON object we need to parse it
					  //the result is an array of match objects, call team_handler for each one
					  JSON.parse(reply)
						  .forEach(match => match_handler(match));
					  no_more_matches();
				  });
		  
	      }).on('error', (e) => {
			  console.error(e);
	      });
}

module.exports.all_teams = all_teams;
module.exports.all_events = all_events;
module.exports.matches_at_event = matches_at_event;

//If run at top level, just show the teams.  This is for testing/demo purposes
if (require.main === module) {
	all_teams(team => console.log(team.nickname),
			  () => console.log("done")
			 );
}
