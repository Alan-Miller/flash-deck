import axios from 'axios';

export function getUsername() {
    return axios.get('http://localhost:3021/api/user/2/username')
    .then(response => response.data[0].username)
}

export function getDisplayName() {
    return axios.get('http://localhost:3021/api/user/2/displayname')
    .then(response => {console.log(response.data[0].display_name); return response.data[0].display_name;})
}