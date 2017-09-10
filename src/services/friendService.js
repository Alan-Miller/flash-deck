import axios from 'axios';

const URL = process.env.REACT_APP_URL;

export function getUsers(userId, searchValue) {
  return axios.get(`${URL}/users/${userId}?value=${searchValue}`)
    .then(response => response.data);
}

export function getUserFriends(userId) {
  return axios.get(`${URL}/friends/${userId}`)
    .then(response => response.data);
}

export function postFriendshipInvite(userId, inviteeId) {
  return axios.post(`${URL}/friends/${userId}/${inviteeId}`)
    .then(response => response.data);
}

export function getPendingFriendships(userId) {
  return axios.get(`${URL}/pending/${userId}`)
    .then(response => response.data);
}