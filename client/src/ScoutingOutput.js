import React from 'react';
//add checkbox for determining whether all or specific
//currently can only do specific
class ScoutingOutput extends React.Component {
    constructor(props) {
	super(props);
	this.onFilterChange = this.onFilterChange.bind(this);
    }

    render() {
	return(
                       <div>
  
			 <h2>Scouting Output</h2>
			 
			 <div className="outputFilter">
			   <input type="checkbox" id="specificAllToggle" name="scouting_output_mode" value="specific" onChange={this.onFilterChange}/>
			   <label htmlFor="specificAllToggle">Only current event</label>
			 </div>
			 
			 {this.props.event_code ? (
			 <table>
			   <thead>
			     <tr>
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
			     {this.props.scouting_output.map(team_output => <tr key={team_output.team_number}>
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
			 ) : <span>Select an event</span>}
		       </div>
		);
	}
    	onFilterChange(event) {
	    // tell our parent that something changed.
	    this.props.filterChange(event.target.checked);
	}
}

export default ScoutingOutput;
