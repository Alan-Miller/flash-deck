import axios from 'axios';
const URL = process.env.REACT_APP_URL;

export function getCollections(userID) {
  return axios.get(`${URL}/collections/${userID}`)
    .then(response => response.data);
}

export function getAllCollectionInfo(userID) {
  return axios.get(`${URL}/collection/info/${userID}`)
    .then(response => response.data);
}

// export function getCollectionsForThisCard(userID, cardID) {
//   return axios.get(`${URL}/collections/${userID}/${cardID}`)
//     .then(response => response.data);
// }

export function unapplyCollection(userID, cardsInCollectionsID) {
  return axios.delete(`${URL}/collections/${userID}/${cardsInCollectionsID}`)
    .then(response => response.data);
}

export function saveCollection(userID, name) {
  return axios.post(`${URL}/collection/${userID}`, { name })
    .then(response => response.data);
}

export function updateCollections(userID, cardIDs, collectionIDs) {
  return axios.put(`${URL}/collections/${userID}`, { cardIDs, collectionIDs })
  .then(response => response.data);
}