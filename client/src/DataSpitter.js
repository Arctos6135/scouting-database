import React from 'react';

class DataSpitter extends React.Component {
    constructor(props) {
	super(props);
	this.onTeamChange = this.onTeamChange.bind(this);
	this.onTeamSubmit = this.onTeamSubmit.bind(this);
	this.state={valid_number: false,
		    team_to_search: null};
    }
    
    render() {
        return (
		<div>
		<form onSubmit={this.onTeamSubmit}>
		<h2>Data Spitter</h2>
		  <label htmlFor="teamToSearch"> Team: </label>
		<input type="text" id="teamToSearch" name="teamToSearch" value={this.team_to_search} onChange={this.onTeamChange} size="5"/>
		<label htmlFor="teamToSearch"> {this.state.valid_number ? "valid - hit enter to submit" : "invalid"} </label>
</form>
	    {this.props.event_code && this.props.data_spitter_output ? (
		<table>
		  <thead>
		    <tr>
		      <th>Match Type</th>
		      <th>Match Number</th>
		    <th>Alliance ID</th>
		    
		    <th>Red 1</th>
		      <th>Red 2</th>
		      <th>Red 3</th>
		      <th>Blue 1</th>
		      <th>Blue 2</th>
		    <th>Blue 3</th>
		      <th>Score</th>
		      <th>Complete Rocket RP</th>
		    <th>HAB Climb RP</th>
		    
		      <th>Team Number</th>
		      <th>Start Level</th>
		      <th>Sand CS Hatch</th>
		      <th>Sand R1 Hatch</th>
		      <th>Sand R2 Hatch</th>
		      <th>Sand R3 Hatch</th>
		      <th>Sand CS Cargo</th>
		      <th>Sand R1 Cargo</th>
		      <th>Sand R2 Cargo</th>
		      <th>Sand R3 Cargo</th>
		      <th>Tele CS Hatch</th>
		      <th>Tele R1 Hatch</th>
		      <th>Tele R2 Hatch</th>
		      <th>Tele R3 Hatch</th>
		      <th>Tele CS Cargo</th>
		      <th>Tele R1 Cargo</th>
		      <th>Tele R2 Cargo</th>
		      <th>Tele R3 Cargo</th>
		      <th>Defense Time</th>
		      <th>Assist Level</th>
		      <th>Climb Level</th>
		      <th>Tipped</th>
		      <th>Broke</th>
		      <th>Floor Hatch Ability</th>
		      <th>Dropped Hatches</th>
		      <th>Penalties</th>
		        
		    </tr>
		  </thead>
		    <tbody>
		      {this.props.data_spitter_output.map(match_info =>
							  <tr key={match_info.match_type + match_info.match_number}>
			<td>{match_info.match_type}</td>
			<td>{match_info.match_number}</td>
			<td>{match_info.alliance_id}</td>
			
			<td>{match_info.red1}</td>
			<td>{match_info.red2}</td>
			<td>{match_info.red3}</td>
			<td>{match_info.blue1}</td>
			<td>{match_info.blue2}</td>
			<td>{match_info.blue3}</td>
			<td>{match_info.score}</td>
			<td>{match_info.RP1_rocket}</td>
			<td>{match_info.RP2_climbed}</td>

			<td>{match_info.team_number}</td>
			<td>{match_info.start_level}</td>
			<td>{match_info.sand_cs_hatch}</td>
			<td>{match_info.sand_r1_hatch}</td>
			<td>{match_info.sand_r2_hatch}</td>
			<td>{match_info.sand_r3_hatch}</td>
			<td>{match_info.sand_cs_cargo}</td>
			<td>{match_info.sand_r1_cargo}</td>
			<td>{match_info.sand_r2_cargo}</td>
			<td>{match_info.sand_r3_cargo}</td>
			<td>{match_info.tele_cs_hatch}</td>
			<td>{match_info.tele_r1_hatch}</td>
			<td>{match_info.tele_r2_hatch}</td>
			<td>{match_info.tele_r3_hatch}</td>
			<td>{match_info.tele_cs_cargo}</td>
			<td>{match_info.tele_r1_cargo}</td>
			<td>{match_info.tele_r2_cargo}</td>
			<td>{match_info.tele_r3_cargo}</td>
			<td>{match_info.defense_time}</td>
			<td>{match_info.assist_level}</td>
			<td>{match_info.climb_level}</td>
			<td>{match_info.tipped}</td>
			<td>{match_info.broke}</td>
			<td>{match_info.floor_hatch}</td>
			<td>{match_info.dropped_hatch}</td>
			<td>{match_info.penalties}</td>
		
		
		      </tr>)}
		  </tbody>
		    </table> )
		: <span>Select an event and enter a team</span>}
	      </div>		
        );
    }
    onTeamSubmit(event) {
	event.preventDefault();
	if (this.state.valid_number){
	    console.log("submitting");
	    console.log(this.state.team_to_search);
	    this.props.teamChange(this.state.team_to_search);
	    //note that data does not immediately appear. This is because the query takes a few seconds to run on the server
	}
    }
    
    onTeamChange(event) {
	console.log(this.isValidTeam(event.target.value));
	this.setState({valid_number: this.isValidTeam(event.target.value)});

	if (this.isValidTeam(event.target.value)){
	    this.setState({team_to_search: event.target.value});
	}
    }

    isValidTeam (number) {
	//a very Java-y way to do this
	for (var i = 0; i < this.props.valid_teams.length; i++){
	    if (this.props.valid_teams[i].team_number == number) {
		return true;
	    }
	}
	return false;
    }

}
export default DataSpitter;

