import PropTypes from "prop-types";
import FilmChip from "./FilmChip";
import { connect } from "react-redux";
import {
  watchFilm,
  unWatchFilm,
  addFilmToWatchList,
  deleteMyFilm,
} from "../../actions/myFilm";
// Material-UI Card Elements
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Material-UI Icons
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    // flexDirection: "row",
  },
  content: {
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  media: {
    cursor: "pointer",
    minWidth: "40%",
  },
  actions: {
    display: "flex",
    direction: "row",
    justifyContent: "space-between",
  },
});

const FilmCard = ({
  myFilm: {
    _id: myFilmId,
    filmId: { coverURI, name, categories, _id },
    note,
  },
  typeOfList,
  addFilmToWatchList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
  isAuthenticated,
}) => {
  const classes = useStyles();

  const watchOrUnwatch = (myFilmId) => {
    if (typeOfList === "watchlist") {
      watchFilm(myFilmId);
    } else if (typeOfList === "library") {
      unWatchFilm(myFilmId);
    } else if (typeOfList === "films") {
      if (isAuthenticated) addFilmToWatchList(_id);
    }
  };

  return (
    <Grid item xs={6} sm={4} md={3} key={_id}>
      <Card className={classes.root}>
        <Box component="div" display="flex" flexDirection="row">
          <CardMedia
            component="img"
            className={classes.media}
            image={coverURI}
            title="gone-girs-cover"
            onClick={() => watchOrUnwatch(myFilmId)}
          />
          <CardContent className={classes.content}>
            <Typography className={classes.title} component="h4">
              {name}
            </Typography>
            <Box component="div">
              {categories.map((category) => {
                return (
                  <FilmChip category={category} key={category._id + _id} />
                );
              })}
            </Box>
            <Typography variant="body2" component="p">
              {/* {note !== null && note} */}
            </Typography>
          </CardContent>
        </Box>
        {isAuthenticated && (
          <CardActions disableSpacing className={classes.actions}>
            <Box component="div">
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
            {typeOfList !== "films" && (
              <IconButton
                aria-label="share"
                onClick={() => deleteMyFilm(myFilmId)}
              >
                <DeleteIcon />
              </IconButton>
            )}
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
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  addFilmToWatchList,
  watchFilm,
  unWatchFilm,
  deleteMyFilm,
})(FilmCard);
