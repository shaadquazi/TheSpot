import * as React from "react";

import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import CardList from "./CardList";
import ListItem from "./ListItem";

export default function QueueCardList(props) {
  const { handleAddToQueue, songs } = props;

  const QueueList = styled(CardList)({
    height: "75vh",
  });

  const queueBottomNavigation = (
    <BottomNavigation showLabels onChange={handleAddToQueue}>
      <BottomNavigationAction label="Add to Queue" icon={<PlaylistAddIcon />} />
    </BottomNavigation>
  );

  return (
    <Grid item xs={8}>
      <QueueList
        elevation={2}
        headerText="Song Queue"
        BottomNavigation={queueBottomNavigation}
      >
        {songs && songs.length > 0 ? (
          songs.map((song) => <ListItem key={song.id} props={song} />)
        ) : (
          <Typography>No Songs in Queue</Typography>
        )}
      </QueueList>
    </Grid>
  );
}
