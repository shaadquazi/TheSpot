import axios from 'axios';
import authorize from '../test_data/authorize.json';
import s from '../test_data/search.json';

export async function connectToSpotify() {
  // const response = await axios.get(`/authorize`);
  // console.log('Response: ', response);
  console.log('Data: ', authorize);
  console.log('Connected to Spotify');
  return authorize;
}

export async function getUser(token) {
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function search(query) {
  // const response = await axios.get(`/search`);
  // console.log('Response: ', response);
  console.log('Data: ', s);
  return s;
}

export default {connectToSpotify, getUser, search};
