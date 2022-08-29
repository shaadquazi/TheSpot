import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

export default function CardList(props) {
  const { className, elevation } = props;
  const { headerText, headerCaption, BottomNavigation } = props;

  return (
    <Card
      elevation={elevation}
      sx={{ display: "flex", flexDirection: "column", m: 2 }}
      className={className}
    >
      {headerText && (
        <CardContent sx={{ m: 2 }}>
          <Typography>{headerText}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.65rem" }}>
            {headerCaption}
          </Typography>
        </CardContent>
      )}
      <Divider />
      {props.children && (
        <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
          {props.children}
        </CardContent>
      )}
      <Divider />
      <CardActions sx={{ justifyContent: "space-around" }}>
        {BottomNavigation}
      </CardActions>
    </Card>
  );
}
