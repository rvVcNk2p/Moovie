import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FilmCards from "../film/FilmCards";
import { getFilms } from "../../actions/film";

const Library = ({ film: { films }, getFilms }) => {
  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <Fragment>
      <h1>FILMS</h1>
      <FilmCards films={films} typeOfList={"films"} />
    </Fragment>
  );
};

Library.propTypes = {
  getFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

export default connect(mapStateToProps, {
  getFilms,
})(Library);
