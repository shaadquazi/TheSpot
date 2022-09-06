// import axios from 'axios';
// import connectToSpotifyFakeData
//   from '../proxydata/connectToSpotifyFakeData.json';
// import joinListeningRoomFakeData
//   from '../proxydata/joinListeningRoomFakeData.json';
// import leaveListeningRoomFakeData
//   from '../proxydata/leaveListeningRoomFakeData.json';
// import getUsersInListeningRoomFakeData
//   from '../proxydata/getUsersInListeningRoomFakeData.json';
// import getQueueFakeData
//   from '../proxydata/getQueueFakeData.json';
// import removeTrackFromQueueFakeData
//   from '../proxydata/removeTrackFromQueueFakeData.json';
// import addTrackToQueueFakeData
//   from '../proxydata/addTrackToQueueFakeData.json';
import axios from 'axios';

const client = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
  });
  return instance;
};

export async function connectToSpotify() {
  const {data} = await client().get(`/authorize`);
  console.log('connectToSpotify</authorize <GET>>', data);
  return data; // connectToSpotifyFakeData;
}

export async function joinListeningRoom(user) {
  const {data} = await axios.post(`/users`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('joinListeningRoom</users <POST>>', data);
  return data;// joinListeningRoomFakeData;
}

export async function leaveListeningRoom(user) {
  const {data} = await axios.delete(`/users?id=${user.id}`);
  console.log('leaveListeningRoom</users <DELETE>>', data);
  return data;// leaveListeningRoomFakeData;
}

export async function getUsersInListeningRoom() {
  console.log('getUsersInListeningRoom</users <GET>>');
  // const response = await axios.get(`/users`);
  return data;// getUsersInListeningRoomFakeData.users;
}

export async function addTrackToQueue(track) {
  const {data} = await axios.post(`/queue`, track, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('addTrackToQueue</queue <POST>>'), data;
  return data;// addTrackToQueueFakeData;
}

export async function removeTrackFromQueue(track) {
  const {data} = await axios.delete(`/queue?id=${track.id}`);
  console.log('removeTrackFromQueue</queue <DELETE>>'), data;
  return data;// removeTrackFromQueueFakeData;
}

export async function getQueue() {
  const {data} = await axios.get(`/queue`);
  console.log('getQueue</queue <GET>>', data);
  return data;// getQueueFakeData.queue;
}

export default {connectToSpotify,
  joinListeningRoom,
  leaveListeningRoom,
  getUsersInListeningRoom,
  addTrackToQueue,
  removeTrackFromQueue,
  getQueue};
