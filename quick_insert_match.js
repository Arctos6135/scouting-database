//adds matches to the database with plain text inputs

//uses a portion of the load_matches program to load our own matches. The match_info object matches the structure of tba's match simple object
//takes 9 arguments:
//event_code match_type match_number red1(#) red2(#) red3(#) blue1(#) blue2(#) blue3(#) 

const loader = require('./load_matches.js');
const db = require('./scouting.js');

function get_match_info () {
    return {
	event_key: get_argument(2),
	comp_level: get_argument(3),
	match_number: get_argument(4),
	alliances: {
	    red: {
		team_keys: ["frc" + get_argument(5), "frc" + get_argument(6), "frc" + get_argument(7)]
	    },
	    blue: {
		team_keys: ["frc" + get_argument(8), "frc" + get_argument(9), "frc" + get_argument(10)]
	    }
	}
    };
}

function get_argument(position){
    if (process.argv.length < position + 1){
	console.error("Missing argument at position " + postion);
	process.exit();
    }
    else {
	return process.argv[position];
    }
}


if (require.main === module) {
    db.with_connection(connection => loader.load_matches(connection, [get_match_info()]));
}
