import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import "./FilmChip.css";

const FilmChip = ({ category: { _id, symbol, name, bgColor, fontColor } }) => {
  return (
    <>
      <Chip
        avatar={
          <Avatar
            style={{
              paddingTop: "2px",
              paddingLeft: "4px",
              fontSize: "1rem",
              backgroundColor: "white",
            }}
          >
            {symbol}
          </Avatar>
        }
        style={{
          backgroundColor: bgColor,
          color: fontColor,
          height: "12px",
          fontSize: "0.4rem",
        }}
        label={name}
        size="small"
        clickable
      />
    </>
  );
};

FilmChip.propTypes = {
  category: PropTypes.object.isRequired,
};

export default FilmChip;
