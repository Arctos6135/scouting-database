import React from 'react';

class HelpInfo extends React.Component {
	render() {
		return(
			<div>
			  <h2>Help</h2>
			  <p>
			    <em>How do I add matches to the schedule?</em>
			  <p>Currently, you need to go the the command line, and enter <code>node quick_insert_match.js event_code match_type match_number red1(#) red2(#) red3(#) blue1(#) blue2(#) blue3(#)</code> from the scouting-database directory. After that, you'll also need to actually add the data via custom query.
			    
			  </p>
			  <em>Why isn't fresh data being added to Scouting Output and Data Spitter?</em>
			  <p>
			This system only knows about data in the strategy MySQL server you should have running on your machine. To add alliance member outcome data to it from a correctly formatted output.json, run <code>node parse_output.js [optionally specify a file path and name]</code>. Today, run <code>node parse_output.js ../scouting-app/desktopSide/output.json</code>To add alliance-wide outcome data, either run <code>node load_alliance_outcomes.js</code> (requires Internet connection) or manually enter data from Custom Query.
			    If you've run parse_output.js and scouting output hasn't been recalculated, then you need to add alliance outcomes for each match added.
			  </p>
			  <em>Other stuff isn't updating</em>
			  <p> Some of the queries take up to 4 seconds to run. Other parts of the app update every 10 seconds, though if there is a filter box you can toggle it to force a refresh.</p>
			  <em>It's crashing a lot. Why???? </em>
			  <p> Two possible reasons: your SQL server isn't actually running, so it's trying to talk to something that isn't there (check the shell you ran npm start from to see if this is plausible, and restart your server and this app if it is), or something's broken, sorry.</p>
			  
			    <em>What do you mean by "run"?</em>
			    <p>Go to your command line, navigate to the folder this app is running in (the same folder you started it from), and enter the command. All commands run from the base folder (not client or backend).</p>
			  </p>
	
			</div>
		);
	}
}

export default HelpInfo;
