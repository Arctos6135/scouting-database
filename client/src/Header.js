import React from 'react';

import arctos_logo from './arctos_logo.png';

class Header extends React.Component {
    render() {
        return (
            <header>
              <Settings 
		 event_code={this.props.event_code} 
		 events={this.props.events}
	    next_match_number={this.props.next_match}
	    match_type={this.props.match_type}
		 onEventChange={this.props.eventSelected}
		 onMatchChange={this.props.matchSelected}/>
              <div className="titleBar">
		<img src={arctos_logo}  alt="Arctos" height="150" />
		<h1>Arctos Orion Prototype</h1>
              </div>
            </header>
        );
    }
}

class Settings extends React.Component {
	constructor(props) {
		super(props);
	    this.onEventSelect = this.onEventSelect.bind(this);
	    this.onLastMatchChange = this.onLastMatchChange.bind(this);
	    this.onNextMatchChange = this.onNextMatchChange.bind(this);
	    this.onMatchTypeChange = this.onMatchTypeChange.bind(this);
	    this.onMatchSubmit = this.onMatchSubmit.bind(this);
	    this.state = {last_match: null,
			  next_match: null,
			  match_type: null};
	}

    // When user chooses an event from the event dropdown
    onEventSelect(e) {
	// tell our parent that something changed.
	this.props.onEventChange(e.target.value);
    }
    
    onLastMatchChange(event) {
	//this.props.onMatchChange(e.target.value);
	this.setState({last_match: event.target.value});
	console.log("last " + event.target.value);
    }
    onNextMatchChange(event) {
	this.setState({next_match: event.target.value});
	console.log("next " + event.target.value);
    }
    onMatchTypeChange(event) {
	this.setState({match_type: event.target.value});
	console.log(event.target.value);
    }
		      
    onMatchSubmit(event) {
	event.preventDefault();
	console.log(event);
	console.log("last match " + this.state.last_match);
	this.props.onMatchChange(this.state.last_match, this.state.next_match, this.state.match_type);
	
    }

	render() {
		return (
        <div className='settings'>
            <h5>Event {this.props.event_code}</h5>
            <select onChange={this.onEventSelect}>
	      <option key='none' value=''>what event are you at?</option>
			{this.props.events.map(evt =>
					       <option 
					       name={evt.event_code} 
					       key={evt.event_code}
					       >
					       {evt.event_code}
					       </option>)}
		    
            </select>
			<h5> Next Match {this.state.next_match ? this.state.next_match : this.props.next_match_number} {this.props.match_type} </h5>
			<form onSubmit={this.onMatchSubmit}>
	    <label htmlFor="last_match_number"> Type last match number </label>
			<input type="text" id="last_match_number" name="last_match_number" size="4" pattern="\d*" onChange={this.onLastMatchChange}/>
			<label htmlFor="next_match_number">Or don't type next match number</label>
			<input type="text" id="next_match_number" name="next_match_number" size="4" pattern="\d*" onChange={this.onNextMatchChange}/>
			<div>
			<select onChange={this.onMatchTypeChange} id="match_type" required>
			  <option key='none' value=''>Select match type</option>
			  <option name='p' key='p'>p</option>
			  <option name='qm' key='qm'>qm</option>
			  <option name='qf' key='qf'>qf</option>
			  <option name='sf' key='sf'>sf</option>
			  <option name='f' key='f'>f</option>
			</select>
			</div>
			<input type="submit"/>
			</form>
        </div>
    );
	}
}

export default Header;
