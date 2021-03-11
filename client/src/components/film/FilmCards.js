import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FilmCard from "./FilmCard";

import Grid from "@material-ui/core/Grid";

const FilmCards = ({ films, typeOfList }) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    spacing={2}
  >
    {films.map((film) => {
      if (film.isAlreadySeen && typeOfList === "library")
        return <FilmCard myFilm={film} key={film._id} />;
      if (film.isNeedItToWatch && typeOfList === "watchlist")
        return <FilmCard myFilm={film} key={film._id} />;
    })}
  </Grid>
);

FilmCards.propTypes = {
  films: PropTypes.array.isRequired,
};

export default FilmCards;
