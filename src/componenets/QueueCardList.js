import * as React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import CardList from './CardList';
import ListItem from './ListItem';

export default function QueueCardList(props) {
  const {
    handleAddToQueue,
    setSelectedOption,
    songs,
    songsPriority,
    searchTextBoxVisibility,
    handleVote,
    options,
    loading,
  } = props;

  const QueueList = styled(CardList)({
    height: '75vh',
  });

  const queueBottomNavigation = (
    <BottomNavigation showLabels onChange={handleAddToQueue}>
      <BottomNavigationAction label='Add to Queue' icon={<PlaylistAddIcon />} />
    </BottomNavigation>
  );

  return (
    <Grid item xs={8}>
      <QueueList
        elevation={2}
        headerText='Song Queue'
        BottomNavigation={
          loading ? (
            <CircularProgress />
          ) : searchTextBoxVisibility ? (
            <Autocomplete
              sx={{width: 350}}
              onChange={(event, value) => {
                setSelectedOption(value);
              }}
              getOptionLabel={(songs) => songs.name}
              options={Object.values(options)}
              renderOption={(props, option) => (
                <Box {...props}>
                  <ListItem
                    key={`${Date.now()}_${option.external_ids.isrc}`}
                    alt={option.name}
                    src={option.album.images[0].url}
                    title={option.name}
                    caption={option.artists
                        .map((artist) => artist.name)
                        .join(', ')}
                  />
                  <Divider />
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label='Search' />}
            />
          ) : (
            queueBottomNavigation
          )
        }
      >
        {Object.keys(songs).length ? (
          songsPriority.map(function(key) {
            const song = songs[key];
            return (
              <Box key={key}>
                <Grid container direction='row' sx={{
                  justifyContent: 'space-between',
                  flexWrap: 'nowrap',
                }}>
                  <ListItem
                    key={key}
                    alt={song.name}
                    src={song.album.images[0].url}
                    title={song.name}
                    caption={
                      song.artists.map((artist) => artist.name).join(', ')
                    }
                  />
                  <Box>
                    <Grid container direction='row' sx={{
                      justifyContent: 'space-between',
                      flexWrap: 'nowrap',
                    }}>
                      <IconButton>
                        <AddIcon onClick={() => handleVote(song.id, 1)}/>
                      </IconButton>
                      <IconButton>
                        <RemoveIcon onClick={() => handleVote(song.id, -1)}/>
                      </IconButton>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            );
          })
        ) : (
          <Typography>No Songs in Queue</Typography>
        )}
      </QueueList>
    </Grid>
  );
}
