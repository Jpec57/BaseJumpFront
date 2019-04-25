const BASE_URI = "/basejump";

function handle(response) {
    if (!response.ok) {
        throw response.status;
    }
    else {
        return response.json();
    }
}

export function callAPI(endpoint, method, body){
    const headers = {
        'Content-Type': 'application/json'
    };
    if (localStorage.getItem('token')) {
        headers['Authorization'] = localStorage.getItem('token');
    }
    if (method === 'GET'){
        return fetch(BASE_URI + endpoint, {
            method: method,
            headers: headers,
        }).then(handle);
    }
    return fetch(BASE_URI + endpoint, {
        method: method,
        headers: headers,
        body:  JSON.stringify(body)
    }).then(handle);
}

