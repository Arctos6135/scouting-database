import React from 'react';
//add checkbox for determining whether all or specific
//currently can only do specific
class ScoutingOutput extends React.Component {
    constructor(props) {
	super(props);
	this.onFilterChange = this.onFilterChange.bind(this);
	this.state = {specific_scouting_output: this.props.specific_scouting_output};
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
			       <th>Rocket RP Part</th>
			       <th>Climb RP Part</th>
			       <th>Average Start Level</th>
			       <th>Max Total Gamepiece</th>
			       <th>Average Total Gamepiece</th>
			       <th>Max Sand Hatch</th>
			       <th>Average Sand Hatch</th>
			       <th>Max Sand Cargo</th>
			       <th>Average Sand Cargo</th>
			       <th>Max Hatch</th>
			       <th>Avg CS Hatch</th>
			       <th>Avg R1 Hatch</th>
			       <th>Avg R2 Hatch</th>
			       <th>Avg R3 Hatch</th>
			       <th>Avg CS Cargo</th>
			       <th>Avg R1 Cargo</th>
			       <th>Avg R2 Cargo</th>
			       <th>Avg R3 Cargo</th>
			       <th>Avg Defense Time</th>
			       <th>Max Climb</th>
			       <th>Average Climb</th>
			       <th>Average Tipped</th>
			       <th>Average Broke</th>
			       <th>Floor Hatch</th>
			       <th>Average Dropped Hatch</th>
			     </tr>
			   </thead>
			   <tbody>
			     {this.props.scouting_output.map(team_output => <tr key={team_output.team_number}>
			       <td>{team_output.team_number}</td>
			       <td>{team_output.avg_score}</td>
			       <td>{team_output.avg_rocket_RP}</td>
			       <td>{team_output.avg_climb_RP}</td>
			       <td>{team_output.avg_start_level}</td>
			       <td>{team_output.max_gamepiece}</td>
			       <td>{team_output.avg_gamepiece}</td>

			       <td>{team_output.max_sand_hatch}</td>
			       <td>{team_output.avg_sand_hatch}</td>
			       <td>{team_output.max_sand_cargo}</td>
			       <td>{team_output.avg_sand_cargo}</td>
			       <td>{team_output.max_tele_hatch}</td>
			       <td>{team_output.avg_tele_cs_hatch}</td>
			       <td>{team_output.avg_tele_r1_hatch}</td>
			       <td>{team_output.avg_tele_r2_hatch}</td>
			       <td>{team_output.avg_tele_r3_hatch}</td>

			       <td>{team_output.avg_tele_cs_cargo}</td>
			       <td>{team_output.avg_tele_r1_cargo}</td>
			       <td>{team_output.avg_tele_r2_cargo}</td>
			       <td>{team_output.avg_tele_r3_cargo}</td>

			       <td>{team_output.avg_defense_time}</td>
			       <td>{team_output.max_climb_level}</td>
			       <td>{team_output.avg_climb_level}</td>
			       <td>{team_output.avg_tipped}</td>
			       <td>{team_output.avg_broke}</td>
			       <td>{team_output.floor_hatch}</td>
			       <td>{team_output.avg_dropped_hatch}</td>
			    
			     </tr>)}
			   </tbody>
			 </table>
			 ) : <span>Select an event</span>}
		       </div>
		);
    }
    	onFilterChange(event) {
	    this.setState({specific_scouting_output: event.target.checked});
	    // tell our parent that something changed.
	    this.props.filterChange(event.target.checked);
	}
}

export default ScoutingOutput;
