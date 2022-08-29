import * as React from 'react';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Box from '@mui/material/Box';
import UserCardList from './UserCardList';
import CardList from './CardList';
import ListItem from './ListItem';

export default function QueueCardList(props) {
  const {
    handleAddUsers,
    handleSkipPreviousIcon,
    handlePlayPauseArrowIcon,
    handleSkipNextIcon,
  } = props;

  const {users, playerActive} = props;

  const playerBottomNavigation = (
    <>
      <IconButton aria-label="previous" onClick={handleSkipPreviousIcon}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause" onClick={handlePlayPauseArrowIcon}>
        {playerActive ? (
          <PauseIcon sx={{height: 38, width: 38}} />
        ) : (
          <PlayArrowIcon sx={{height: 38, width: 38}} />
        )}
      </IconButton>
      <IconButton aria-label="next" onClick={handleSkipNextIcon}>
        <SkipNextIcon />
      </IconButton>
    </>
  );

  return (
    <Grid item xs={4}>
      <Box>
        <Grid container direction="column">
          <CardList elevation={2} BottomNavigation={playerBottomNavigation}>
            <ListItem key="asd" />
          </CardList>
          <UserCardList users={users} handleAddUsers={handleAddUsers} />
        </Grid>
      </Box>
    </Grid>
  );
}
