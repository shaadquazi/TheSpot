// import axios from 'axios';
import connectToSpotifyFakeData
  from '../proxydata/connectToSpotifyFakeData.json';
import joinListeningRoomFakeData
  from '../proxydata/joinListeningRoomFakeData.json';
import leaveListeningRoomFakeData
  from '../proxydata/leaveListeningRoomFakeData.json';
import getUsersInListeningRoomFakeData
  from '../proxydata/getUsersInListeningRoomFakeData.json';
import getQueueFakeData
  from '../proxydata/getQueueFakeData.json';
import removeTrackFromQueueFakeData
  from '../proxydata/removeTrackFromQueueFakeData.json';
import addTrackToQueueFakeData
  from '../proxydata/addTrackToQueueFakeData.json';

export async function connectToSpotify() {
  // const response = await axios.get(`/authorize`);
  return connectToSpotifyFakeData;
}

export async function joinListeningRoom(user) {
  // const response = await axios.post(`/users`, user, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return joinListeningRoomFakeData;
}

export async function leaveListeningRoom(user) {
  // const response = await axios.delete(`/users?id=${user.id}`);
  return leaveListeningRoomFakeData;
}

export async function getUsersInListeningRoom() {
  // const response = await axios.get(`/users`);
  return getUsersInListeningRoomFakeData.users;
}

export async function addTrackToQueue(track) {
  // const response = await axios.post(`/queue`, track, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return addTrackToQueueFakeData;
}

export async function removeTrackFromQueue(track) {
  // const response = await axios.delete(`/queue?id=${track.id}`);
  return removeTrackFromQueueFakeData;
}

export async function getQueue() {
  // const response = await axios.get(`/queue`);
  return getQueueFakeData.queue;
}

export default {connectToSpotify,
  joinListeningRoom,
  leaveListeningRoom,
  getUsersInListeningRoom,
  addTrackToQueue,
  removeTrackFromQueue,
  getQueue};
