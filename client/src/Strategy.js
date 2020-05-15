import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './Strategy.css';
import DG from './DataGetter';
import Header from './Header.js';
import Footer from './Footer.js';
import Matches from './Matches.js';
import NextMatch from './NextMatch.js';
import DataSpitter from './DataSpitter.js';
import ScoutingOutput from './ScoutingOutput.js';
import Teams from './Teams.js';
import PickList from './PickList.js';
import CustomQuery from './CustomQuery.js';
import MatchAdder from './MatchAdder.js';
import Help from './HelpInfo.js';

// The base URL for the server.
const refreshTime = 10;
const DataGetter = new DG();


class Strategy extends React.Component {
    constructor(props) {
        super(props);
	
	this.eventSelected = this.eventSelected.bind(this);
	this.matchSelected = this.matchSelected.bind(this);
	this.dataFilterChange = this.dataFilterChange.bind(this);
	this.searchTeamChange = this.searchTeamChange.bind(this);
	this.getCustomQueryResults = this.getCustomQueryResults.bind(this);
	
        this.state={
			events: [],
		    teams: [],
		    matches: [],
		    next_match_info: [],
		    data_spitter_output: [],
		    scouting_output: [],
            picklist: [],
		    custom_query_results: [{}],
		    event_code: null,
		    next_match_number: null,
		    next_match_type: null,
		    team_to_search: null,
			specific_scouting_output: false};
			
    }

    // React calls this method (once) after the component has been rendered.
    // Ask the server for the set of all known events, and if the user has selected an event,
    // get the event-specific information
    componentDidMount() {
        DataGetter.getEvents().then((data) => this.setState({events: data}));
        // start an automatic-refresh loop.  Every 10 seconds (set by refreshTime constant) update things
    	this.interval = setInterval(() => this.refresh(), refreshTime * 1000);
    }

    // When the component is going away it should clean up after itself.
    componentWillUnmount() {
        // we no longer need the automatic update timer
        clearInterval(this.interval);
    }

    // This method does any periodic refreshing we want.
    refresh() {
        // add calls here to refresh any other dynamic component, or a clock, or whatever
        DataGetter.getPicklist(this.state.event_code).then(data => this.setState({picklist: data}));
		DataGetter.getScoutingOutput(this.state.event_code, this.state.specific_scouting_output)
			.then(data => this.setState({ scouting_output: data }));
		if (this.state.event_code && this.state.next_match_number && this.state.next_match_type && this.state.specific_scouting_output){
			DataGetter.getSpecificTeamsInfo(this.state.event_code, this.state.team_to_search)
			.then(data => this.setState({data_spitter_output: data}));
    	}
	}
			
		

    // a new Event has been selected (in the event bar)
    eventSelected(event_code) {
        // Remember the event_code
		this.setState({event_code: event_code});
        this.getEventSpecificInfo(event_code);
    }

    matchSelected(last_match_number, next_match_number, match_type) {
		if (this.state.event_code) {
			if (!next_match_number){
				DataGetter.getNextMatchNumber(last_match_number, match_type, this.state.event_code)
					.then(data => this.setState({next_match: data.match_number, next_match_type: data.match_type}) 
									//we cannot simple do a separate getNMI call since the state of next match number has not been updated.
									//therefore we have to chain it like this
									|| DataGetter.getNextMatchInfo(this.state.event_code, data.match_number, data.match_type, this.state.specific_scouting_output)
										.then(data => this.setState({next_match_info: data}))
					);
					//.then(data => DataGetter.getNextMatchInfo(this.state.event_code, data.match_number, data.match_type, this.state.specific_scouting_output));
			}
			else {
				//console.log("have next match num: " + next_match_number);
				this.setState({next_match_number: next_match_number, next_match_type: match_type});
				DataGetter.getNextMatchInfo(this.state.event_code, next_match_number, match_type, this.state.specific_scouting_output)
					.then(data => this.setState({next_match_info: data}));
			}
		}
    }
    
    getEventSpecificInfo(event_code) {
        if (event_code) {
	    console.log("getting event info");
			DataGetter.getTeams(event_code)
				.then(data => this.setState({teams: data}));
			DataGetter.getMatches(event_code)
				.then(data => this.setState({matches: data}));
			DataGetter.getScoutingOutput(event_code, this.state.specific_scouting_output)
				.then(data => this.setState({ scouting_output: data }));
        }
    }

    //this method handles both next match and scouting output's specific/all toggle.
    //In the future when they have more settings we'll probably want to separate them
    dataFilterChange(specific_scouting_output) {
		this.setState({specific_scouting_output: specific_scouting_output});
		console.log("specific_scouting_output:" + specific_scouting_output);
		DataGetter.getScoutingOutput(this.state.event_code, specific_scouting_output)
			.then(data => this.setState({scouting_output: data})); //this doesn't use state since setState is async and may run after this 
		if (this.state.next_match && this.state.event_code) {
			DataGetter.getNextMatchInfo(this.state.event_code, this.state.next_match, this.state.next_match_type, specific_scouting_output)
				.then((data) => this.setState({next_match_info: data }));
		}
    }

    searchTeamChange(team_to_search) {
		this.setState({team_to_search: team_to_search});
		DataGetter.getSpecificTeamsInfo(this.state.event_code, team_to_search)
			.then(data => this.setState({data_spitter_output: data}));
	}
	
	getCustomQueryResults(query){
		DataGetter.getCustomQueryResults(query).then(data => this.setState({custom_query_results: data}));
	}

    // draw the entire strategyweb app
    // This method returns the JSX (which looks like fancy HTML) for the component.
    // The only tricky bit is that we need to provide the header object with a callback
    // to be called when the user chooses an event. Scouting output also requires a similar callback.
    // Callbacks like this are needed whenever
    // a lower-level component updates state that belongs to a parent. 
    render() {
        return (
        <div className="Strategy">
          <Header event_code={this.state.event_code} 
            events={this.state.events}
	    next_match={this.state.next_match}
	    match_type={this.state.next_match_type}
            eventSelected={this.eventSelected}
	    matchSelected={this.matchSelected}
		/>
          <div className='app'>
            <Tabs>
              <TabList>
                <Tab>Schedule</Tab>
		<Tab>Next Match</Tab>
		<Tab>Data Spitter</Tab>
		<Tab>Scouting Output</Tab>
		<Tab>Pick List</Tab>
		<Tab>Custom Query</Tab>
		<Tab>Add Matches</Tab>
                <Tab>Teams</Tab>
		<Tab>Help</Tab>
              </TabList>
              <TabPanel>
                <Matches event_code={this.state.event_code}
	                 matches={this.state.matches}/>
	      </TabPanel>
	      <TabPanel>
		<NextMatch event_code={this.state.event_code}
	    next_match={this.state.next_match_number}
	    next_match_info={this.state.next_match_info}
			   specific_scouting_output={this.state.specific_scouting_output}
			   filterChange={this.dataFilterChange} 
		/>
	      </TabPanel>
	      <TabPanel>
		<DataSpitter event_code={this.state.event_code}
	    valid_teams={this.state.teams}
	    data_spitter_output={this.state.data_spitter_output}
	    teamChange={this.searchTeamChange}
		/>
	      </TabPanel>
	      <TabPanel>
		<ScoutingOutput event_code={this.state.event_code}
				scouting_output={this.state.scouting_output}
				filterChange={this.dataFilterChange}
				/>
	      </TabPanel>
	      <TabPanel>
                <PickList event_code={this.state.event_code}
			  picks={this.state.picklist}/>
	      </TabPanel>
	      <TabPanel>
		<CustomQuery results={this.state.custom_query_results}
	    querySubmit={this.getCustomQueryResults}/>
	      </TabPanel>
	      <TabPanel>
		<MatchAdder/>
	      </TabPanel>
	      <TabPanel>
                <Teams event_code={this.state.event_code}
		       teams={this.state.teams}/>
	      </TabPanel>
	      <TabPanel>
		<Help/>
	      </TabPanel>
            </Tabs>
          </div>
          <Footer/>
        </div>
        );
    }
}

export default Strategy;
