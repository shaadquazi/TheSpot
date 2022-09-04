import axios from 'axios';

export async function getUser(token) {
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function getTracksFromLibrary(token) {
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

export default {
  getUser,
  getTracksFromLibrary,
};
