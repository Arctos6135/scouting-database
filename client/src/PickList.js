import React from 'react';

class PickList extends React.Component {
	render() {
		return (
				<div className="pick-list">
                <h2>Pick List</h2>
				<table>
				  <thead>
					<tr><th>Rank</th><th>Number</th><th>Name</th><th>Climb</th></tr>
				  </thead>
				  <tbody>
				{this.props.picks.map((p,i) => <Pick pick={p} key={p.team_number} />)}
				  </tbody>
				</table>
                </div>
		);
	}
}

// One row in the picklist
function Pick(props) {
	const pick = props.pick;
	return (<tr key={pick.team_number}>
		<td>{pick.ranking}</td>
		<td>{pick.team_number}</td>
		<td>{pick.name}</td>
		<td>{pick.climb.toFixed(2)}</td>
		</tr>);
}

		
export default PickList;
