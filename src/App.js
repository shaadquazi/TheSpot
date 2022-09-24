import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import * as React from 'react';
import PageHeader from './componenets/PageHeader';

import QueueCardList from './componenets/QueueCardList';
import InfoMenuList from './componenets/InfoMenuList';
import SuccessSnackbar from './componenets/SuccessSnackbar';
import {
  getUser,
  getTracksFromLibrary,
} from './spotify/index';
import {
  // connectToSpotify,
  joinListeningRoom,
  leaveListeningRoom,
  getUsersInListeningRoom,
  addTrackToQueue,
  // eslint-disable-next-line no-unused-vars
  removeTrackFromQueue,
  registerVote,
  getQueue,
} from './middleware/index';

function App() {
  const [users, setUsers] = React.useState({});
  const [songs, setSongs] = React.useState({});
  const [songsPriority, setSongPriority] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [showSnackBar, setSnackBar] = React.useState(false);
  const [searchTextBoxVisibility, setSearchTextBoxVisibility] =
    React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const [userAccessToken, setUserAccessToken] = React.useState('');
  const [userRefreshToken, setUserRefreshToken] = React.useState('');
  const [connected, setConnected] = React.useState(false);
  const [playerActive, setPlayerActive] = React.useState(false);
  const [userOptionSelected, setUserOptionSelected] = React.useState(-1);
  const [defaultSearchOptions, setDefaultSearchOptions] = React.useState({});

  React.useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      setUserAccessToken(urlParams.get('access_token'));
      setUserRefreshToken(urlParams.get('refresh_token'));
      setSnackBarMessage('Connected to Spotify');
      setSnackBar(true);
      setConnected(true);
    }
  }, []);

  const handleUserCardOptions = () => {
    if (userOptionSelected === 0) {
      if (connected) {
        getUser(userAccessToken).then((response) => {
          joinListeningRoom(response).then((response) => {
            setUsers((users) =>
              Object.assign({}, users, {[response.id]: response}),
            );
            setCurrentUser(response);
          });
        });
      } else {
        setSnackBarMessage('Please connect to Spotify');
        setSnackBar(true);
      }
    } else if (userOptionSelected === 1) {
      if (userAccessToken && userRefreshToken) {
        leaveListeningRoom(currentUser).then((response) => {
          setUsers((users) => {
            const remainingUsers = {...users};
            delete remainingUsers[response.id];
            return remainingUsers;
          });
          setUserAccessToken('');
          setUserRefreshToken('');
          setCurrentUser({});
          setConnected(false);
          window.location.search = '';
        });
      } else {
        // connectToSpotify().then((response) => {
        //   setUserAccessToken(response.access_token);
        //   setUserRefreshToken(response.refresh_token);
        //   setSnackBarMessage('Connected to Spotify');
        //   setSnackBar(true);
        //   setConnected(true);
        // });
      }
    }
  };

  const handleAddToQueue = (event, reason) => {
    if (connected) {
      if (currentUser.id) {
        setLoading(true);
      } else {
        setSnackBarMessage('Please join the session');
        setSnackBar(true);
      }
    } else {
      setSnackBarMessage('Please connect to Spotify');
      setSnackBar(true);
    }
  };

  const addToQueue = (song) => {
    addTrackToQueue(song).then((response) => {
      setSongs((songs) => Object.assign({},
          songs, {[response.song.id]: response.song}));
      setSongPriority(response.queueOrder);
      setSearchTextBoxVisibility(false);
      setSnackBarMessage('Added to your Queue');
      setSnackBar(true);
    });
  };

  React.useEffect(() => {
    console.log('useEffect<userOptionSelected>');
    setUserOptionSelected(handleUserCardOptions());


    if (!currentUser.id) {
      getUsersInListeningRoom(setErrors).then((response) => {
        setUsers((users) =>
          Object.assign({}, users, response),
        );
      });
    }
  }, [userOptionSelected]);

  React.useEffect(() => {
    console.log('useEffect<errors>');
    if (Object.keys(errors).length) {
      setSnackBarMessage(errors.message);
      setSnackBar(true);
    }
  }, [errors]);

  React.useEffect(() => {
    console.log('useEffect<loading>');
    if (loading) {
      if (Object.keys(defaultSearchOptions).length === 0) {
        getTracksFromLibrary(userAccessToken).then((response) => {
          const result = response.reduce(
              (obj, track) => ({...obj, [track.external_ids.isrc]: track}),
              {},
          );
          setDefaultSearchOptions((tracks) => Object.assign({},
              tracks, result));
          setLoading(false);
          setSearchTextBoxVisibility(true);
        });
      } else {
        setLoading(false);
        setSearchTextBoxVisibility(true);
      }
    }
  }, [loading]);

  React.useEffect(() => {
    console.log('useEffect<selectedOption>');

    getQueue(setErrors).then((response) => {
      setSongs((songs) => Object.assign({}, songs, response.queue));
      setSongPriority(response.queueOrder);
    });

    if (selectedOption && selectedOption.id) {
      addToQueue(selectedOption);
    }
  }, [selectedOption]);

  const handleUsersNavigation = (event, value) => {
    setUserOptionSelected(value);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };

  const handleSkipPreviousIcon = (event, reason) => {
    console.log('handleSkipPreviousIcon');
  };
  const handlePlayPauseArrowIcon = (event, reason) => {
    if (playerActive) {
      setPlayerActive(false);
    } else {
      setPlayerActive(true);
    }
  };
  const handleSkipNextIcon = (event, reason) => {
    console.log('handleSkipNextIcon');
  };

  const handleVote = (id, vote) => {
    registerVote(id, vote).then((response) => {
      setSongPriority(response);
    });
  };

  return (
    <Box>
      <Grid
        position='static'
        container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'row-reversed',
          alignContent: 'flex-start',
        }}
      >
        <PageHeader />
        <Box sx={{flexGrow: 1, mt: 2, mb: 2, boxShadow: 3, overflow: 'auto'}}>
          <Grid container direction='row' sx={{height: '100%'}}>
            <QueueCardList
              songs={songs}
              songsPriority={songsPriority}
              handleAddToQueue={handleAddToQueue}
              loading={loading}
              searchTextBoxVisibility={searchTextBoxVisibility}
              handleVote={handleVote}
              setSelectedOption={setSelectedOption}
              options={defaultSearchOptions}
            />
            <InfoMenuList
              handleAddUsers={handleUsersNavigation}
              handleSkipPreviousIcon={handleSkipPreviousIcon}
              handlePlayPauseArrowIcon={handlePlayPauseArrowIcon}
              handleSkipNextIcon={handleSkipNextIcon}
              playerActive={playerActive}
              users={users}
              connected={connected}
            />
          </Grid>
        </Box>
        <SuccessSnackbar
          snackBarMessage={snackBarMessage}
          handleCloseSnackBar={handleCloseSnackBar}
          showSnackBar={showSnackBar}
        />
      </Grid>
    </Box>
  );
}

export default App;
