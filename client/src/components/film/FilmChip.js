import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { searchInFilms } from "../../actions/film";
import { searchInMyFilms } from "../../actions/myFilm";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./FilmChip.css";

const FilmChip = ({
  category: { _id, symbol, name, bgColor, fontColor },
  typeOfList,
  searchInFilms,
  searchInMyFilms,
}) => {
  const setSearchField = (name) => {
    if (typeOfList === "films") searchInFilms(name);
    else if (typeOfList === "watchlist" || typeOfList === "library")
      searchInMyFilms(name);
  };
  return (
    <>
      <Chip
        avatar={
          <Avatar
            style={{
              paddingTop: "2px",
              paddingLeft: "4px",
              fontSize: typeOfList === "preview" ? "0.75rem" : "1rem",
              backgroundColor: "white",
            }}
          >
            {symbol}
          </Avatar>
        }
        style={{
          backgroundColor: bgColor,
          color: fontColor,
          height: typeOfList === "preview" ? 24 : 12,
          fontSize: typeOfList === "preview" ? "" : "0.4rem",
        }}
        label={name || "Category name"}
        size="small"
        clickable
        onClick={(e) => setSearchField(name)}
      />
    </>
  );
};

FilmChip.propTypes = {
  category: PropTypes.object.isRequired,
  typeOfList: PropTypes.string,
  searchInMyFilms: PropTypes.func.isRequired,
  searchInFilms: PropTypes.func.isRequired,
};

export default connect(null, { searchInFilms, searchInMyFilms })(FilmChip);
