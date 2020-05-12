import React from 'react';

class DataTable extends React.Component {
    constructor(props){
	super(props);
	//props: data, displayed in tbody, headers (optional) for labelling
	
    }

    render() {
        return ( <div>
		{this.props.data ? (
			  <table>
			    <thead>
                  <tr>
				  {this.props.headers === null ? void 0 : Object.keys(this.props.data[0]).map((key) =>
					<th key={key}>{key}</th>) 
				}
			      </tr>
			    </thead>

			    <tbody>
				{this.props.data.map((result, index) =>
						<tr key={index}>
						{Object.keys(result).map(header => 
									 <td key={result[header]}>{result[header]}</td>)}
						</tr>)}
			    </tbody>

			  </table>
			) : console.log("nothing") }
			</div>
        )
	}
}
export default DataTable;
