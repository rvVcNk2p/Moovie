import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import { getMyFilms } from "../../actions/film";

const Watchlist = ({ film, getMyFilms }) => {
  useEffect(() => {
    getMyFilms();
  }, [getMyFilms]);

  return (
    <Fragment>
      <h1>Watchlist</h1>
      <FilmCards films={film.films} typeOfList={"watchlist"} />
    </Fragment>
  );
};

Watchlist.propTypes = {
  film: PropTypes.object.isRequired,
  getMyFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

export default connect(mapStateToProps, { getMyFilms })(Watchlist);
