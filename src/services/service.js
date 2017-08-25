import axios from 'axios';

export function getHandle() {
    return axios.get('http://localhost:3002/api/user/0/handle')
    .then(response => response.data[0].handle)
}