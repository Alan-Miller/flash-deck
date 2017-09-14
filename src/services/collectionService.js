import axios from 'axios';
const URL = process.env.REACT_APP_URL;

export function getAllCollections(userId) {
  return axios.get(`${URL}/collections/${userId}`)
    .then(response => response.data);
}

export function saveCollection(userId, name) {
  return axios.post(`${URL}/collection/${userId}`, { name })
    .then(response => response.data);
}

export function updateCollections(userID, cardIDs, collectionIDs) {
  return axios.put(`${URL}/collections/${userID}`, { cardIDs, collectionIDs })
  .then(response => response.data);
}