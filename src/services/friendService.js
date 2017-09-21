import axios from 'axios';

const URL = process.env.REACT_APP_URL;

export function getUsers(userID, searchValue) {
  return axios.get(`${URL}/users/${userID}?value=${searchValue}`)
    .then(response => response.data);
}

export function getUserFriends(userID) {
  return axios.get(`${URL}/friends/${userID}`)
    .then(response => response.data);
}

export function postFriendshipInvite(userID, inviteeId) {
  return axios.post(`${URL}/friends/${userID}/${inviteeId}`)
    .then(response => response.data);
}

export function getPendingFriendships(userID) {
  return axios.get(`${URL}/pending/${userID}`)
    .then(response => response.data);
}