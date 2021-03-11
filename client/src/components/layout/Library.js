import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import { getMyFilms } from "../../actions/film";

const Library = ({ film, getMyFilms }) => {
  useEffect(() => {
    getMyFilms();
  }, [getMyFilms]);

  return (
    <Fragment>
      <h1>My Library</h1>
      <FilmCards films={film.films} typeOfList={"library"} />
    </Fragment>
  );
};

Library.propTypes = {
  film: PropTypes.object.isRequired,
  getMyFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

export default connect(mapStateToProps, { getMyFilms })(Library);
