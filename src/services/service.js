import axios from 'axios';

export function getHandle() {
    return axios.get('http://localhost:3021/api/user/0/handle')
    .then(response => response.data[0].handle)
}