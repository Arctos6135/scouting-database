import React from 'react';

class NextMatch extends React.Component {
    constructor(props) {
	super(props);
	this.onFilterChange = this.onFilterChange.bind(this);

    }
    
    render() {
        return (
		<div>
		  <h2>Next Match Info</h2>
		  
		  <div className="outputFilter">
		    <input type="checkbox" id="specificAllToggle" name="scouting_output_mode" value="specific" onChange={this.onFilterChange}/>
		    <label htmlFor="specificAllToggle">Only current event</label>
		  </div>
		  
		  {this.props.event_code && this.props.next_match_info ? (
		  <table>
		    <thead>
		      <tr>
			<th>Match Number</th>
			<th>Alliance Colour</th>
			<th>Team Number</th>
			<th>Average Score</th>
			<th>Rocket RP Fraction</th>
			<th>Climb RP Fraction</th>
			<th>Average Start Level</th>
			<th>Max Climb</th>
			<th>Average Sand Hatch</th>
		  </tr>
		    </thead>
		    <tbody>
		      {this.props.next_match_info.map(team_output => <tr key={team_output.team_number}>
			<td>{team_output.match_number}</td>
			<td>{team_output.alliance_colour}</td>
			<td>{team_output.team_number}</td>
			<td>{team_output.average_per_bot_score}</td>
			<td>{team_output.average_rocket_fraction}</td>
			<td>{team_output.average_climb_RP_fraction}</td>
			<td>{team_output.average_start_level}</td>
			<td>{team_output.max_climb_ability}</td>
			<td>{team_output.average_sand_hatch}</td>
		      </tr>)}
		    </tbody>
		  </table>
		  ) : <span>Select an event and enter the previous match number</span>}
		</div>
        );
	}
	onFilterChange(event) {
	    this.props.filterChange(event.target.checked);
	}
}
export default NextMatch;
