import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FilmChip from "./FilmChip";
import { connect } from "react-redux";
import {
  watchFilm,
  unWatchFilm,
  addFilmToList,
  deleteMyFilm,
} from "../../actions/myFilm";
import { selectFilm } from "../../actions/film";
import { Link } from "react-router-dom";
// Material-UI Card Elements
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
// Material-UI Icons
import QueueIcon from "@material-ui/icons/Queue";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  content: {
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  media: {
    width: "100px",
    height: "150px",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
  },
});

const FilmCard = ({
  myFilm: {
    _id: myFilmId,
    filmId: { coverURI, name, categories, _id },
    note,
  },
  myFilms,
  typeOfList,
  // Functions
  addFilmToList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
  selectFilm,
  isAuthenticated,
}) => {
  const classes = useStyles();

  const libraryCardAcions = (
    <Fragment>
      <Box component="div">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="unwatch-film"
          onClick={() => unWatchFilm(myFilmId)}
        >
          <UpdateIcon />
        </IconButton>
      </Box>
      <IconButton aria-label="delete" onClick={() => deleteMyFilm(myFilmId)}>
        <DeleteIcon />
      </IconButton>
    </Fragment>
  );

  const wachlistCardAcions = (
    <Fragment>
      <Box component="div">
        <IconButton aria-label="watch-film" onClick={() => watchFilm(myFilmId)}>
          <AddToQueueIcon />
        </IconButton>
      </Box>
      <IconButton aria-label="delete" onClick={() => deleteMyFilm(myFilmId)}>
        <DeleteIcon />
      </IconButton>
    </Fragment>
  );

  const filmsCardAcions = (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <IconButton
          aria-label="add-to-library"
          onClick={(e) => {
            if (isAuthenticated) addFilmToList(_id, "library");
          }}
        >
          <AddToQueueIcon />
        </IconButton>
        <IconButton
          aria-label="add-to-watchlist"
          onClick={(e) => {
            if (isAuthenticated) addFilmToList(_id, "watchlist");
          }}
        >
          <QueueIcon />
        </IconButton>
        <Link to={`/edit-film/${_id}`}>
          <IconButton aria-label="edit" onClick={(e) => selectFilm(_id)}>
            <EditIcon />
          </IconButton>
        </Link>
      </Box>
    </Fragment>
  );

  // const alreadyAdded = (_id) => {
  //   let founded = false;
  //   myFilms.forEach((myFilm) => {
  //     if (_id === myFilm.filmId._id) founded = true;
  //   });
  //   return founded ? "+" : "-";
  // };

  return (
    <Grid item xs={6} sm={4} md={3} key={_id}>
      <Card>
        <Box component="div" display="flex" flexDirection="row">
          <CardMedia
            component="img"
            className={classes.media}
            image={coverURI}
            title="gone-girs-cover"
          />
          <CardContent className={classes.content}>
            <Typography className={classes.title} component="h4">
              {name}
            </Typography>
            <Box component="div">
              {categories.map((category) => {
                return (
                  <FilmChip
                    category={category}
                    typeOfList={typeOfList}
                    key={category._id + _id}
                  />
                );
              })}
            </Box>
            <Box component="div">
              {/* {note !== null && note} */}
              {/* {typeOfList === "films" && isAuthenticated ? (
                <p>{alreadyAdded(_id)}</p>
              ) : (
                ""
              )} */}
            </Box>
          </CardContent>
        </Box>
        {isAuthenticated && (
          <CardActions disableSpacing className={classes.actions}>
            {typeOfList === "library" ? libraryCardAcions : ""}
            {typeOfList === "watchlist" ? wachlistCardAcions : ""}
            {typeOfList === "films" ? filmsCardAcions : ""}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

FilmCard.propTypes = {
  myFilm: PropTypes.object.isRequired,
  watchFilm: PropTypes.func.isRequired,
  typeOfList: PropTypes.string.isRequired,
  unWatchFilm: PropTypes.func.isRequired,
  deleteMyFilm: PropTypes.func.isRequired,
  selectFilm: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  myFilms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  myFilms: state.myFilm.myFilms,
});

export default connect(mapStateToProps, {
  addFilmToList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
  selectFilm,
})(FilmCard);
