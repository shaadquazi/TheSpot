import axios from 'axios';
import authorize from '../test_data/authorize.json';
import me from '../test_data/me.json';
import search from '../test_data/search.json';

export async function connectToSpotify() {
  // const response = await axios.get(`/authorize`);
  // console.log('Response: ', response);
  console.log('Data: ', authorize);
  console.log('Connected to Spotify');
  return authorize;
}

export async function getUser(token) {
  // const response = await axios.get(`/me`);
  // console.log('Response: ', response);
  console.log('Data: ', me);
  return me;
}

export async function search(query) {
  // const response = await axios.get(`/search`);
  // console.log('Response: ', response);
  console.log('Data: ', search);
  return search;
}

export default {connectToSpotify, getUser, search};
