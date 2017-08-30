import axios from 'axios';

export function getAllCards(userId) {
  return axios.get(`http://localhost:3021/api/cards/${userId}`)
    .then(response => response.data);
}

export function saveCard(userId, front, back) {
  return axios.post(`http://localhost:3021/api/cards/${userId}`, { front, back })
    .then(response => response.data);
}

export function switchBool(cardId, colName, userId) {
  return axios.put(`http://localhost:3021/api/cards/${cardId}/${colName}`, { userId })
    .then(response => response.data);
}

export function deleteCard(cardId, userId) {
  return axios.delete(`http://localhost:3021/api/cards/${cardId}/${userId}`)
    .then(response => response.data);
}