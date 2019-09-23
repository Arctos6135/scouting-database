import React from 'react';

import arctos_logo from './arctos_logo.png';

class Header extends React.Component {
    render() {
        return (
            <header>
              <Settings 
		 event_code={this.props.event_code} 
		 events={this.props.events}
		 next_match={this.props.next_match}
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
	    this.onMatchEnter = this.onMatchEnter.bind(this);
	}

    // When user chooses an event from the event dropdown
    onEventSelect(e) {
	// tell our parent that something changed.
	this.props.onEventChange(e.target.value);
    }
    
    onMatchEnter(e) {
	this.props.onMatchChange(e.target.value);
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
	    <h5> Next Match {this.props.next_match} </h5>
	    <label htmlFor="last_match_number"> Enter last match number </label>
			<input type="text" id="last_match_number" name="last_match_number" size="4" required pattern="\d*" onChange={this.onMatchEnter}/>
        </div>
    );
	}
}

export default Header;
