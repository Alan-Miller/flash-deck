import axios from 'axios';

const URL = process.env.REACT_APP_URL;
// const URL = 'http://localhost:3021/api'; // dev
// const URL = 'http://flashdeck.alan.provo411.com/:3021/api'; // production

export function getUserId() {
  // Check for user's auth id
  return axios.get('/auth/me').then(response => {
    return response.data.id;
  })
  // Send auth id to db to retrieve user id
  .then(userAuthId => {
    return axios.get(`${URL}/user/${userAuthId}`)
    .then(response => {
      return response.data[0].id;
      // const userID = response.data[0].id;
      // this.props.setUserId(userID);
      // return userID;
    });
  });
}