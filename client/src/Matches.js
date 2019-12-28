import React from 'react';

class Matches extends React.Component {
	state = {
		team_to_search: 1114,
	}

    render() {
        return(
            <div>
                <h2>Matches</h2>
                {this.props.event_code ? (
                <table className='matches'>
                  <thead>
                    <tr><th className='matchNumber rightDivider'>Number</th>
                        <th>red 1</th>
                        <th>red 2</th>
                        <th className='rightDivider'>red 3</th>
                        <th>blue 1</th>
                        <th>blue 2</th>
                        <th>blue 3</th>
                    </tr>
                  </thead>
                <tbody>
                {this.props.matches.map(m => 
                    (<tr key={m.match_number}>
                      <td className='matchNumber rightDivider'>{m.match_number}</td>
                      <td className={`redTeam ${(m.red1 === 6135) ? "ourTeam" : (m.red1 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.red1}</td>
                      <td className={`redTeam ${(m.red2 === 6135) ? "ourTeam" : (m.red2 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.red2}</td>
                      <td className={`rightDivider redTeam ${(m.red3 === 6135) ? "ourTeam" : (m.red3 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.red3}</td>
                      <td className={`blueTeam ${(m.blue1 === 6135) ? "ourTeam" : (m.blue1 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.blue1}</td>
                      <td className={`blueTeam ${(m.blue2 === 6135) ? "ourTeam" : (m.blue2 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.blue2}</td>
                      <td className={`blueTeam ${(m.blue3 === 6135) ? "ourTeam" : (m.blue3 === this.state.team_to_search) ? "searchedTeam" : ""}`}>{m.blue3}</td>
                    </tr>))}
                </tbody>
			</table>) :<span>Select an event</span>}
                </div>
        );
    }
}

export default Matches;
