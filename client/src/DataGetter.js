import axios from 'axios';

const serverURL = "http://localhost:3001";

class DataGetter{
    constructor (props){
        
    }

    // Get the list of all events.  (axios returns a Promise to get it)
    // return that promise so the caller can process it (ex set state)
    getEvents() {
        return callPromise("getEvents",[]);
    }

    getTeams(event_code) {
        return callPromise("getTeams", ["event_code"], event_code);
    }
    
    getMatches(event_code) {
        return callPromise("getMatches", ["event_code"], event_code);
    }

    getNextMatchNumber(last_match_number, match_type, event_code) {
	    return axios.get(_api("getNextMatchNumber") + "?event_code=" + event_code + "&last_match_number=" + last_match_number + "&match_type=" + match_type)
            .then(processResponse);
    }


    getNextMatchInfo(event_code, next_match_number, match_type, specific_scouting_output) {
	    return axios.get(_api("getNextMatchInfo") + "?event_code=" + event_code + "&match_number=" + next_match_number + "&specific_scouting_output=" + specific_scouting_output + "&match_type=" + match_type)
	        .then(processResponse);
    }

    getSpecificTeamsInfo(event_code, team_to_search) {
	    return axios.get(_api("getSpecificTeamsInfo") + "?event_code=" + event_code + "&team_to_search=" + team_to_search)
	        .then(processResponse);
    }
    
    getScoutingOutput(event_code, specific_scouting_output) {
	    return axios.get(_api("getScoutingOutput") + "?event_code=" + event_code + "&specific_scouting_output=" + specific_scouting_output)
	        .then(processResponse);
    }
    
    // get the picklist
    getPicklist(event_code) {
        return callPromise("getPicklist", ["event_code"], event_code);
    }

    getCustomQueryResults(query) {
        return callPromise("runCustomQuery", ["query"], query);
    }
    
}
function callPromise(method, parameters, ...param_vals){
    return axios.get(api(method, parameters, param_vals)).then(processResponse);
}
// return the URL to invoke the API method on the server.
function _api(method) {
    return serverURL + "/api/" + method;
};
//doesn't handle multiple parameters well (at all). issue is map expects to return an array so it adds a comma ?param_one=val,&param_two=val2
function api(method, parameters, ...param_vals){
    return serverURL + "/api/" + method + (parameters.map((param,index) => (index == 0 ? "?" : "&" ) + param + "=" + param_vals[index]))
}
function processResponse(response) {
    return response.data.data;
}
export default DataGetter;

/*
broken shit
    getNextMatchNumber(last_match_number, match_type, event_code) {
        return callPromise("getNextMatchNumber", ["event_code", "last_match_number", "match_type"], event_code, last_match_number, match_type);
    }


    getNextMatchInfo(event_code, next_match_number, match_type, specific_scouting_output) {
        return callPromise("getNextMatchInfo", ["event_code", "match_number", "specific_scouting_output", "match_type"], event_code, next_match_number, specific_scouting_output, match_type);
    }

    getSpecificTeamsInfo(event_code, team_to_search) {
        return callPromise("getSpecifcTeamsInfo", ["event_code", "team_to_search"], event_code, team_to_search);
    }
    
    getScoutingOutput(event_code, specific_scouting_output) {
        return callPromise("getScoutingOutput", ["event_code", "specific_scouting_output"], event_code, specific_scouting_output);
    }
*/