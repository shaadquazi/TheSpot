import axios from 'axios';

export async function getUser(token) {
  console.log('getUser<v1/me <GET>>');
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function getTracksFromLibrary(token) {
  console.log('getTracksFromLibrary<v1/me/tracks <GET>>');
  const tracks = [];
  const limit = 50;
  const maxLimit = 450;
  let offset = 0;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  while (offset < maxLimit) {
    const endpoint = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;
    const {data} = await axios.get(endpoint, config);
    tracks.push(...data.items.map((item) => {
      if (item.track.name === '') {
        return;
      }
      return item.track;
    })
        .filter((track) => typeof track !== 'undefined'));

    offset += limit;
  }

  return tracks;
}

export async function addTrackToSpotifyQueue(token, track) {
  console.log('addTrackToSpotifyQueue<v1/me/player/queue <POST>>');
  const response = await axios.post(`https://api.spotify.com/v1/me/player/queue`, null, {
    params: {
      uri: track.uri,
    },
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export default {
  getUser,
  getTracksFromLibrary,
  addTrackToSpotifyQueue,
};
