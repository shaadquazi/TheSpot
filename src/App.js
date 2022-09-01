import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import * as React from 'react';
import PageHeader from './componenets/PageHeader';

import QueueCardList from './componenets/QueueCardList';
import InfoMenuList from './componenets/InfoMenuList';
import SuccessSnackbar from './componenets/SuccessSnackbar';
import { connectToSpotify, getUser } from './componenets/client';

function App() {
  const [users, setUsers] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [showSnackBar, setSnackBar] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const [userAccessToken, setUserAccessToken] = React.useState('');
  const [userRefreshToken, setUserRefreshToken] = React.useState('');
  const [connected, setConnected] = React.useState(false);
  const [playerActive, setPlayerActive] = React.useState(false);
  const [userOptionSelected, setUserOptionSelected] = React.useState(-1);

  const handleUserCardOptions = () => {
    if (userOptionSelected === 0) {
      if (connected) {
        getUser(userAccessToken).then((response) => {
          setCurrentUser(response);
          setUsers((users) =>
            Object.assign({}, users, { [response.id]: response })
          );
        });
      } else {
        setSnackBarMessage('Please connect to Spotify');
        setSnackBar(true);
      }
    } else if (userOptionSelected === 1) {
      if (userAccessToken.length > 0 && userRefreshToken.length > 0) {
        setUsers((users) => {
          const remainingUsers = { ...users };
          delete remainingUsers[currentUser.id];
          return remainingUsers;
        });
        setUserAccessToken('');
        setUserRefreshToken('');
        setCurrentUser({});
        setConnected(false);
      } else {
        connectToSpotify().then((response) => {
          setUserAccessToken(response.access_token);
          setUserRefreshToken(response.refresh_token);
          setSnackBarMessage('Connected to Spotify');
          setSnackBar(true);
          setConnected(true);
        });
      }
    }
  };

  const handleAddToQueue = (event, reason) => {
    if (connected) {
      if (currentUser.id) {
        setSongs((songs) => [...songs, 'New Songs']);
        setSnackBarMessage('Added to your Queue');
        setSnackBar(true);
      } else {
        setSnackBarMessage('Please join the session');
        setSnackBar(true);
      }
    } else {
      setSnackBarMessage('Please connect to Spotify');
      setSnackBar(true);
    }
  };

  React.useEffect(() => {
    console.log('Inside useEffect');
    setUserOptionSelected(handleUserCardOptions());
  }, [userOptionSelected]);

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
        <Box sx={{ flexGrow: 1, mt: 2, mb: 2, boxShadow: 3, overflow: 'auto' }}>
          <Grid container direction='row' sx={{ height: '100%' }}>
            <QueueCardList songs={songs} handleAddToQueue={handleAddToQueue} />
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
