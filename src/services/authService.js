import {callAPI} from './wsService';

export default function endSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}

export function signIn(username, password){
    const body = {
        username: username,
        password: password,
        client_secret: '67igzfy23p4w04gg8gg8kkwkw0gwo0sk040wgkcogckksw8swo',
        client_id: '1_56aou7x5ewkcc08k0sw00880gkc8ckcg0o8kgcocs8s8wkg00w',
        grant_type: 'password',
    };
    return callAPI('/oauth/v2/token', 'POST', body)
        .then((response)=> {
            localStorage.setItem('token', 'Bearer '+response.access_token);
        });
}


