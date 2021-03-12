import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FilmCards from "../film/FilmCards";
import { getMyFilms } from "../../actions/myFilm";
import { getCategories } from "../../actions/category";
import { getFilms } from "../../actions/film";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Library = ({
  myFilm: { myFilms },
  getMyFilms,
  getCategories,
  getFilms,
}) => {
  useEffect(() => {
    getMyFilms();
    getCategories();
    getFilms();
  }, [getMyFilms, getFilms, getCategories]);

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>My Library</h1>
        <Link to="/create-film" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" endIcon={<AddIcon />}>
            Add new film
          </Button>
        </Link>
      </Box>
      <FilmCards films={myFilms} typeOfList={"library"} />
    </Fragment>
  );
};

Library.propTypes = {
  myFilm: PropTypes.object.isRequired,
  getMyFilms: PropTypes.func.isRequired,
  getFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myFilm: state.myFilm,
});

export default connect(mapStateToProps, {
  getMyFilms,
  getCategories,
  getFilms,
})(Library);
