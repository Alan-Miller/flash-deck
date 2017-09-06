import axios from 'axios';
export const URL = 'http://localhost:3021/api'; // dev
// export const URL = 'http://flashdeck.alan.provo411.com/:3021/api'; // production

export function getAllCards(userId) {
  return axios.get(`${URL}/cards/${userId}`)
    .then(response => response.data);
}

export function saveCard(userId, front, back) {
  return axios.post(`${URL}/card/${userId}`, { front, back })
    .then(response => response.data);
}

export function saveCards(userId, cards) {
  return axios.post(`${URL}/cards/${userId}`, { cards })
    .then(response => response.data);
}

export function switchBool(cardId, colName, userId) {
  return axios.put(`${URL}/card/${cardId}/${colName}`, { userId })
    .then(response => response.data);
}

export function deleteCard(cardId, userId) {
  return axios.delete(`${URL}/card/${cardId}/${userId}`)
    .then(response => response.data);
}