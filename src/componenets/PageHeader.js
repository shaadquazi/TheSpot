import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

import * as React from "react";

export default function PageHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" elevation={12}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ZoomInMapIcon sx={{ margin: 2 }} />
            <Typography>THE SPOT</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
