import {callAPI} from './wsService';

export function getEvents(type, upcoming){
    const data = {
        type : type,
        upcoming: upcoming
    };
    return callAPI('/api/events?type=' + data.type +'&upcoming=' + data.upcoming, 'GET', null)
}

export function postEvent(event){
    return callAPI('/api/events', 'POST', event)
}



