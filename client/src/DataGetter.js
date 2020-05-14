import axios from 'axios';

const serverURL = "http://localhost:3001";

class DataGetter{
    constructor (props){
        
    }

    // Get the list of all events.  (axios returns a Promise to get it)
    // return that promise so the caller can process it (ex set state)
    getEvents() {
        return callPromise("getEvents");
    }

    getTeams(event_code) {
        return callPromise("getTeams", ["event_code"], event_code);
    }
    
    getMatches(event_code) {
        return callPromise("getMatches", ["event_code"], event_code);
    }

    getNextMatchNumber(last_match_number, match_type, event_code) {
        return callPromise("getNextMatchNumber", ["event_code", "last_match_number", "match_type"], event_code, last_match_number, match_type);
    }


    getNextMatchInfo(event_code, next_match_number, match_type, specific_scouting_output) {
        return callPromise("getNextMatchInfo", ["event_code", "match_number", "specific_scouting_output", "match_type"], event_code, next_match_number, specific_scouting_output, match_type);
    }

    getSpecificTeamsInfo(event_code, team_to_search) {
        return callPromise("getSpecificTeamsInfo", ["event_code", "team_to_search"], event_code, team_to_search);
    }
    
    getScoutingOutput(event_code, specific_scouting_output) {
        return callPromise("getScoutingOutput", ["event_code", "specific_scouting_output"], event_code, specific_scouting_output);
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

//creates a string that the server gets sent as the request. some hairy string things let the rest of the data getter look tidy
function api(method, parameters, param_vals){
    return serverURL + "/api/" + method + (parameters 
        ? parameters.map((param,index) => (index == 0 ? "?" : "&" ) + param + "=" + param_vals[index])
        //map gives an array of &param=param_val looking things. The reducer is needed to take out the commas, essentially
            .reduce((accumulator, this_arg) => accumulator + this_arg)
        : "")
}
function processResponse(response) {
    return response.data.data;
}
export default DataGetter;