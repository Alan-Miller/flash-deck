import axios from 'axios';

const URL = process.env.REACT_APP_URL;

export function getAllCards(userID) {
  return axios.get(`${URL}/cards/${userID}`)
    .then(response => response.data);
}

export function saveCard(userID, front, back) {
  return axios.post(`${URL}/card/${userID}`, { front, back })
    .then(response => response.data);
}

export function saveCards(userID, cards) {
  return axios.post(`${URL}/cards/${userID}`, { cards })
    .then(response => response.data);
}

export function editCard(cardFace, newContent, cardID, userID) {
  return axios.put(`${URL}/card/${cardFace}/${cardID}/${userID}`, { newContent })
    .then(response => response.data);
}

export function switchBool(cardID, colName, userID) {
  return axios.put(`${URL}/card/${cardID}/${colName}`, { userID })
    .then(response => response.data);
}

export function deleteCard(cardID, userID) {
  return axios.delete(`${URL}/card/${cardID}/${userID}`)
    .then(response => response.data);
}