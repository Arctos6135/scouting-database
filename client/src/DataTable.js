import React from 'react';

class DataTable extends React.Component {
    constructor(props){
	super(props);
	
    }

    render() {
        return (
		{this.props.results? (
			<div>
			  <table>
			    <thead>
			      <tr>
				{Object.keys(this.props.results[0]).map((key) =>
									<th key={key}>{key}</th>)}
			      </tr>
			    </thead>
			    <tbody>
			{this.props.results.map((result, index) =>
						<tr key={index}>
						{Object.keys(result).map(header => 
									 <td key={result[header]}>{result[header]}</td>)}
						</tr>)}
			    </tbody>
			  </table>
			</div>) : console.log("nothing") }
        )
    }
