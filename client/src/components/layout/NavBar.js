import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
// Material-UI elements
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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

const NavBar = ({ auth: { loading, isAuthenticated }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <Fragment>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<ExitToAppIcon style={{ color: "white" }} />}
          onClick={logout}
        >
          Logout
        </Button>
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<AccountCircleOutlinedIcon style={{ color: "white" }} />}
        >
          Sign up
        </Button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          style={{ color: "white" }}
          size="small"
          startIcon={<MeetingRoomIcon style={{ color: "white" }} />}
        >
          Sign in
        </Button>
      </Link>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Moovie.io
          </Typography>
          {!loading && isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);
