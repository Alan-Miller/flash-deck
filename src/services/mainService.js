import axios from 'axios';

const URL = process.env.REACT_APP_URL;

export function getUserID() {
  // Check for user's auth id
  return axios.get('/auth/me').then(response => {
    // console.log('mainService, /auth/me .then response', response) // good
    return response.data.id;
  })
  // Send auth id to db to retrieve user id
  .then(userAuthId => {
    // console.log('mainService, userAuthId', userAuthId)
    return axios.get(`${URL}/user/${userAuthId}`)
    .then(response => {
      console.log('mainService, /user/:userAuthID .then response', response)
      return response.data[0].id;
      // const userID = response.data[0].id;
      // this.props.setUserID(userID);
      // return userID;
    });
  });
}