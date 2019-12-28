import React from 'react';

class Matches extends React.Component {
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
                      <td className='redTeam'>{m.red1}</td>
                      <td className='redTeam'>{m.red2}</td>
                      <td className='redTeam rightDivider'>{m.red3}</td>
                      <td className='blueTeam'>{m.blue1}</td>
                      <td className='blueTeam'>{m.blue2}</td>
                      <td className='blueTeam'>{m.blue3}</td>
                    </tr>))}
                </tbody>
			</table>) :<span>Select an event</span>}
                </div>
        );
    }
}

export default Matches;
