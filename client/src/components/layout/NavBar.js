import React from "react";
import { Link } from "react-router-dom";
// Material-UI elements
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Moovie.io
          </Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="conatined"
              style={{ color: "white" }}
              size="small"
              startIcon={
                <AccountCircleOutlinedIcon style={{ color: "white" }} />
              }
            >
              Sign up
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="conatined"
              style={{ color: "white" }}
              size="small"
              startIcon={<MeetingRoomIcon style={{ color: "white" }} />}
            >
              Sign in
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
