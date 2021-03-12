import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import { getMyFilms } from "../../actions/myFilm";

const Watchlist = ({ myFilm: { myFilms }, getMyFilms }) => {
  useEffect(() => {
    getMyFilms();
  }, [getMyFilms]);

  return (
    <Fragment>
      <h1>Watchlist</h1>
      <FilmCards films={myFilms} typeOfList={"watchlist"} />
    </Fragment>
  );
};

Watchlist.propTypes = {
  myFilm: PropTypes.object.isRequired,
  getMyFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myFilm: state.myFilm,
});

export default connect(mapStateToProps, { getMyFilms })(Watchlist);
