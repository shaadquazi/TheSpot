import axios from 'axios';
import authorize from '../test_data/authorize.json';
import userJoined from '../test_data/userjoined.json';
import userleft from '../test_data/userleft.json';
import users from '../test_data/usersOnline.json';
import getQueueData from '../test_data/currentQueue.json';
import removeTrackFromQueueData from '../test_data/removedFromQueue.json';
import addTrackToQueueData from '../test_data/addedToQueue.json';

export async function connectToSpotify() {
  // const response = await axios.get(`/authorize`);
  // console.log('Response: ', response);
  console.log('Data: ', authorize);
  console.log('Connected to Spotify');
  return authorize;
}

export async function getUser(token) {
  console.log('API CALLED getUser');
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function getTracksFromLibrary(token) {
  console.log('API CALLED getTracksByQuery');
  const tracks = [];
  const limit = 50;
  let offset = 0;
  let next = '';
  // while (next !== null) {
  while (offset < 50) {
    const endpoint = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.get(endpoint, config);
    tracks.push(...data.items.map((item) => {
      if (item.track.name === '') {
        return;
      }
      return item.track;
    })
        .filter((track) => typeof track !== 'undefined'));
    offset += limit;
    // eslint-disable-next-line no-unused-vars
    next = data.next;
  }
  console.log('All Tracks', tracks);
  return tracks;
}

export async function joinListeningRoom(user) {
  console.log('API CALLED joinListeningRoom');
  // const response = await axios.post(`/users`, user, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return userJoined;
}

export async function leaveListeningRoom(user) {
  console.log('API CALLED leaveListeningRoom');
  // const response = await axios.delete(`/users?id=${user.id}`);
  return userleft;
}

export async function getUsersInListeningRoom() {
  console.log('API CALLED getUsersInListeningRoom');
  // const response = await axios.get(`/users`);
  console.log(users.users);
  return users.users;
}

export async function addTrackToQueue(track) {
  console.log('API CALLED addTrackToQueue');
  // const response = await axios.post(`/queue`, track, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return addTrackToQueueData;
}

export async function removeTrackFromQueue(track) {
  console.log('API CALLED removeTrackFromQueue');
  // const response = await axios.delete(`/queue?id=${track.id}`);
  return removeTrackFromQueueData;
}

export async function getQueue() {
  console.log('API CALLED getQueue');
  // const response = await axios.get(`/queue`);
  console.log(getQueueData.queue);
  return getQueueData.queue;
}

export default {connectToSpotify,
  getUser,
  getTracksFromLibrary,
  joinListeningRoom,
  leaveListeningRoom,
  getUsersInListeningRoom,
  addTrackToQueue,
  removeTrackFromQueue,
  getQueue};
