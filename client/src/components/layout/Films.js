import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FilmCards from "../film/FilmCards";
import SearchFilms from "./SearchFilms";
import { getFilms } from "../../actions/film";
// Material-UI Elements
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Films = ({
  film: { films, filteredFilms, searchingTerm },
  getFilms,
  isAuthenticated,
}) => {
  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>Films</h1>
        <SearchFilms location="films" />
        {isAuthenticated && (
          <Link to="/create-film" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" endIcon={<AddIcon />}>
              Add new film
            </Button>
          </Link>
        )}
      </Box>
      <FilmCards
        films={searchingTerm.length > 0 ? filteredFilms : films}
        typeOfList={"films"}
      />
    </Fragment>
  );
};

Films.propTypes = {
  getFilms: PropTypes.func.isRequired,
  filteredFilms: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  searchingTerm: PropTypes.string,
};

const mapStateToProps = (state) => ({
  film: state.film,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getFilms,
})(Films);
