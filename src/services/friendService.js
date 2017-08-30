import axios from 'axios';

export function getUsers(userId, searchValue) {
  return axios.get(`http://localhost:3021/api/users/${userId}?value=${searchValue}`)
    .then(response => response.data);
}

export function getUserFriends(userId) {
  return axios.get(`http://localhost:3021/api/friends/${userId}`)
    .then(response => response.data);
}

export function postFriendshipInvite(userId, inviteeId) {
  return axios.post(`http://localhost:3021/api/friends/${userId}/${inviteeId}`)
    .then(response => response.data);
}

export function getPendingFriendships(userId) {
  return axios.get(`http://localhost:3021/api/pending/${userId}`)
    .then(response => response.data);
}