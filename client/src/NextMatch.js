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
			
			<th>Average Start Level</th>
			<th>Max Sand Hatch</th>
			<th>Avg Sand Hatch</th>
			<th>Max Sand Cargo</th>
			<th>Avg Sand Cargo</th>
			
			<th>Max Gamepiece</th>
			
			<th>Max Hatch</th>
			<th>Avg CS Hatch</th>
			<th>Avg R1 Hatch</th>
			<th>Avg R2 Hatch</th>
			<th>Avg R3 Hatch</th>

			<th>Max Cargo</th>
			<th>Avg CS Cargo</th>
			<th>Avg R1 Cargo</th>
			<th>Avg R2 Cargo</th>
			<th>Avg R3 Cargo</th>
			
			<th>Max Climb</th>
			<th>Avg Climb</th>
			
			<th>Avg Defense</th>
		
		  </tr>
		    </thead>
		    <tbody>
		      {this.props.next_match_info.map(team_output => 
			  <tr key={team_output.team_number} className={`${(team_output.alliance_colour === 'red') ? "redTeam" : "blueTeam"}
				  ${team_output.team_number === this.props.next_match_info[2].team_number ? "bottomDivider" : ""}`}>
			<td>{team_output.match_number}</td>
			<td>{team_output.alliance_colour}</td>
			<td>{team_output.team_number}</td>
			
			<td>{team_output.avg_score}</td>
			<td>{team_output.avg_rocket_RP}</td>
			
			<td>{team_output.avg_start_level}</td>
			<td>{team_output.max_sand_hatch}</td>
			<td>{team_output.avg_sand_hatch}</td>
			<td>{team_output.max_sand_cargo}</td>
			<td>{team_output.avg_sand_cargo}</td>
			
			<td>{team_output.max_game_pieces}</td>

			<td>{team_output.max_tele_hatch}</td>
			<td>{team_output.avg_tele_cs_hatch}</td>
			<td>{team_output.avg_tele_r1_hatch}</td>
			<td>{team_output.avg_tele_r2_hatch}</td>
			<td>{team_output.avg_tele_r3_hatch}</td>

			<td>{team_output.max_tele_cargo}</td>
			<td>{team_output.avg_tele_cs_cargo}</td>
			<td>{team_output.avg_tele_r1_cargo}</td>
			<td>{team_output.avg_tele_r2_cargo}</td>
			<td>{team_output.avg_tele_r3_cargo}</td>
			
			<td>{team_output.max_climb_level}</td>
			<td>{team_output.avg_climb_level}</td>
			<td>{team_output.avg_defense_time}</td>

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
