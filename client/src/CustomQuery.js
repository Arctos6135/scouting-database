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
		<h3>Fun queries/reference:</h3>
		<p>Manually enter data (after quick adding match from command line). Fill blanks with right info</p>
		<code>   INSERT INTO alliance_member_outcome VALUES ((SELECT a.alliance_id FROM frc_match m INNER JOIN alliance a ON a.match_id = m.match_id WHERE m.match_type =     AND m.match_number =    AND m.event_code =           AND a.alliance_colour =     ),         ;</code>
<div></div>
								     <code> INSERT INTO alliance_outcome VALUES ((SELECT a.alliance_id FROM frc_match m
											  INNER JOIN alliance a
													  ON a.match_id = m.match_id
												WHERE m.match_type =        
												  AND m.match_number =    
                                                  AND m.event_code =     
														  AND a.alliance_colour =      ),         ;</code>
			<p>Tables and views: team, frc_event, frc_match, alliance, alliance_member, alliance_member_outcome, alliance_outcome, denormalized_schedule, all_scouting_output, specific_scouting_output</p>

		<p>team</p>
		<ul>
		  <li>team_number</li>
		  <li>name</li>
		</ul>

		<p>frc_event</p>
		<ul>
		  <li>event_code</li>
		</ul>

		<p>frc_match</p>
		<ul>
		  <li>match_id</li>
		  <li>match_number</li>
		  <li>event_code</li>
		  <li>match_type</li>
		</ul>

		<p>alliance</p>
		<ul>
		  <li>alliance_id</li>
		  <li>match_id</li>
		  <li>alliance_colour</li>
		</ul>

		<p>alliance_member</p>
		<ul>
		  <li>team_number</li>
		  <li>alliance_id</li>
		</ul>

		<p>alliance_member_outcome has too many columns</p>
		<p>alliance_id team_number start_level sand_cs_hatch
	sand_r1_hatch 
	sand_r2_hatch 
	sand_r3_hatch 
	sand_cs_cargo 
	sand_r1_cargo 
	sand_r2_cargo 
	sand_r3_cargo 

	tele_cs_hatch 
	tele_r1_hatch 
	tele_r2_hatch 
	tele_r3_hatch 
	tele_cs_cargo 
	tele_r1_cargo 
	tele_r2_cargo 
	tele_r3_cargo 

	defense_time 
	assist_level 
	climb_level 
	tipped	 
	broke	
	floor_hatch 
	dropped_hatch 
		  penalties </p>

		<p>alliance_outcome</p>
		<ul>
		  <li>alliance_id</li>
		  <li>score</li>
		  <li>RP1_rocket</li>
		  <li>RP2_climbed</li>
		</ul>
		
		<p>all_scouting_output and specific_scouting_output have similar columns, just specific starts with event_code</p>
		<ul>
		  <li>team_number</li>
		  <li>undecided</li>
		</ul>

		<p>denormalized_schedule</p>
		<ul>
		  <li>match_id</li>
		  <li>event_code</li>
		  <li>match_type</li>
		  <li>match_number</li>
		  <li>red1</li>
		  <li>red1_name</li>
		  <li>red2</li>
		  <li>red2_name</li>
		  <li>red3</li>
		  <li>red3_name</li>
		  <li>blue1</li>
		  <li>blue1_name</li>
		  <li>blue2</li>
		  <li>blue2_name</li>
		  <li>blue3</li>
		  <li>blue3_name</li>
		</ul>

		<p>id_sheet</p>
		<ul>
		  <li>match_id</li>
		  <li>event_code</li>
		  <li>match_type</li>
		  <li>match_number</li>
		  <li>red1</li>
		  <li>red1_name</li>
		  <li>red2</li>
		  <li>red2_name</li>
		  <li>red3</li>
		  <li>red3_name</li>
		  <li>blue1</li>
		  <li>blue1_name</li>
		  <li>blue2</li>
		  <li>blue2_name</li>
		  <li>blue3</li>
		  <li>blue3_name</li>
		  <li>match_id</li>
		  <li>red alliance_id</li>
		  <li>blue alliance_id</li>
		</ul>
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
