import React from 'react';

class MatchAdder extends React.Component {
	constructor(props) {
		super(props);

		this.onTeamChange = this.onTeamChange.bind(this);
		this.onMatchesSubmit = this.onMatchesSubmit.bind(this);

		this.no_of_matches = 40;
		this.team_identifiers = ["red1", "red2", "red3", "blue1", "blue2", "blue3"];

		this.state = {
			valid_input : true
		}
	}

    render() {
		var rows = [];
		this.valid_team_numbers = this.props.valid_teams.map(team_obj => team_obj.team_number)

		for (let i = 1; i <= this.no_of_matches; ++i) {
			rows.push(
				<tr key={i.toString()} id={i.toString()}>
					<td>{i}</td>
					{this.team_identifiers.map(teamid => 
						<td>
							<input type="text" id={i.toString() + "-" + teamid} name={i.toString() + "-" + teamid} size="4" onChange={this.onTeamChange} required />
						</td>)
					}
				</tr>
			)
		}
        return (
              <div>
				  <h2>Add Matches</h2>
				  {this.props.event_code ?
				  <form id="match-adder" onSubmit={this.onMatchesSubmit}>
					  <input type="submit" value="Submit Matches"/>
					  <table>
						  <thead>
							  <th>match #</th>
							  <th>red 1</th>
							  <th>red 2</th>
							  <th>red 3</th>
							  <th>blue 1</th>
							  <th>blue 2</th>
							  <th>blue 3</th>
						  </thead>
						  <tbody>
							  {rows}
						  </tbody>
					  </table>
				  </form>
				  : <span>Select an event</span>}
			  </div>
        );
	}
	
	onTeamChange(event) {
		if (this.valid_team_numbers.includes(parseInt(event.target.value)) || event.target.value === "") {
			event.target.classList.remove("invalid-team");
			console.log("valid team");
		} else {
			event.target.classList.add("invalid-team");
			console.log("invalid team");
		}
	}

	onMatchesSubmit(event) {
		event.preventDefault();
		var form = document.getElementById("match-adder");
		var all_inputs = form.getElementsByTagName("input");
		var rows = form.getElementsByTagName("tr");
		var valid = true;
		var matches = []

		for (var i = 0; i < all_inputs.length; ++i) {
			var input = all_inputs[i];
			if (input.classList.contains("invalid-team")) {
				valid = false;
				console.log("invalid input")
				break;
			}
		}

		if (valid) {
			for (i = 0; i < rows.length; ++i) {
				var row = rows[i]

				const match_number = row.getAttribute("id")
				console.log(match_number + "-red1")
				var row_inputs = {
					red1: document.getElementById(match_number + "-red1"),
					red2: document.getElementById(match_number + "-red2"),
					red3: document.getElementById(match_number + "-red3"),
					blue1: document.getElementById(match_number + "-blue1"),
					blue2: document.getElementById(match_number + "-blue2"),
					blue3: document.getElementById(match_number + "-blue3"),
				}

				var red_teams = ["frc" + row_inputs.red1.value, "frc" + row_inputs.red2.value, "frc" + row_inputs.red3.value]
				var blue_teams = ["frc" + row_inputs.blue1.value, "frc" + row_inputs.blue2.value, "frc" + row_inputs.blue3.value]

				matches.push({
					event_key: this.props.event_code,
					comp_level: "qm",
					match_number: match_number,
					alliances: {
						red: {team_keys: red_teams},
						blue: {team_keys: blue_teams}
					}
				})
			}
			console.log(matches)
		}

	}
}
export default MatchAdder;
