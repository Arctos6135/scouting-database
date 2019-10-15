import React from 'react';

class CustomQuery extends React.Component {
    constructor(props){
	super(props);
	this.onQuerySubmit = this.onQuerySubmit.bind(this);
	this.onQueryChange = this.onQueryChange.bind(this);

	this.state = {query: ""};
    }
    render() {
        return (
              <div>
		<h1>Enter SQL Injection Attack</h1>
	   
		<form onSubmit={this.onQuerySubmit}>
		  <textarea id="dbQuery" name="dbQuery" onChange={this.onQueryChange} value={this.state.query ? this.state.query : ""}/>
		  <div/>
		  <input type="submit" value="Query"/>
		</form>
		{this.props.results ? (
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
	      </div>
        );
    }
    onQuerySubmit(event){
	event.preventDefault();
	//console.log(this.state.query);
	this.props.querySubmit(this.state.query);
    }
	      
    onQueryChange(event){
	this.setState({query: event.target.value});
	//console.log(event.target.value);
    }

}
export default CustomQuery;
/* {this.props.results.map((result, index) =>
						<p key={index}>{JSON.stringify(result)}</p>)}*/
