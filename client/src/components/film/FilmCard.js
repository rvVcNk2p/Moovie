import PropTypes from "prop-types";
import FilmChip from "./FilmChip";
// Material-UI Card Elements
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  media: {
    minWidth: "40%",
  },
});

const FilmCard = ({
  myFilm: {
    filmId: { coverURI, name, categories, _id },
    note,
  },
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={4} md={3} key={_id}>
      <Card className={classes.root}>
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
              return <FilmChip category={category} key={category._id + _id} />;
            })}
          </Box>
          <Typography variant="body2" component="p">
            {/* {note !== null && note} */}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

FilmCard.propTypes = {
  myFilm: PropTypes.object.isRequired,
};

export default FilmCard;
