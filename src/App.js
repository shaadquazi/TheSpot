import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import * as React from "react";

import PageHeader from "./componenets/PageHeader";

import QueueCardList from "./componenets/QueueCardList";
import InfoMenuList from "./componenets/InfoMenuList";
import SuccessSnackbar from "./componenets/SuccessSnackbar";

function App() {
  const [users, setUsers] = React.useState([]);
  const [showSnackBar, setSnackBar] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [playerActive, setPlayerActive] = React.useState(false);

  const handleAddToQueue = (event, reason) => {
    setSongs((songs) => [...songs, "New Songs"]);
    setSnackBar(true);
    setSnackBarMessage("Added to your Queue");
  };

  const handleAddUsers = (event, reason) => {
    setUsers((users) => [...users, "New Songs"]);
    setSnackBar(true);
    setSnackBarMessage("User Joined");
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };

  const handleSkipPreviousIcon = (event, reason) => {
    console.log("handleSkipPreviousIcon");
  };
  const handlePlayPauseArrowIcon = (event, reason) => {
    if (playerActive) {
      setPlayerActive(false);
    } else {
      setPlayerActive(true);
    }
  };
  const handleSkipNextIcon = (event, reason) => {
    console.log("handleSkipNextIcon");
  };

  return (
    <Box>
      <Grid
        position="static"
        container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "row-reversed",
          alignContent: "flex-start",
        }}
      >
        <PageHeader />
        <Box sx={{ flexGrow: 1, mt: 2, mb: 2, boxShadow: 3, overflow: "auto" }}>
          <Grid container direction="row" sx={{ height: "100%" }}>
            <QueueCardList songs={songs} handleAddToQueue={handleAddToQueue} />
            <InfoMenuList
              handleAddUsers={handleAddUsers}
              handleSkipPreviousIcon={handleSkipPreviousIcon}
              handlePlayPauseArrowIcon={handlePlayPauseArrowIcon}
              handleSkipNextIcon={handleSkipNextIcon}
              playerActive={playerActive}
              users={users}
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
