import React from 'react';

class Teams extends React.Component {
	render() {
		return(
			<div>
				<h2>Teams</h2>
				{this.props.event_code ? (
				<table>
				<thead>
				<tr><th>Number</th><th>Name</th></tr>
				</thead>
				<tbody>
				{this.props.teams.map(team => <tr key={team.team_number}><td>{team.team_number}</td><td>{team.name}</td></tr>)}
				</tbody>
				</table>) : <span>Select an event</span>}
				</div>
		);
	}
}

export default Teams;
