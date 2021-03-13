import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { searchInFilms } from "../../actions/film";
import { searchInMyFilms } from "../../actions/myFilm";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchFilms = ({
  location,
  searchInFilms,
  searchInMyFilms,
  myFilmSearchingTerm,
  filmSearchingTerm,
}) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (location === "films") searchInFilms(inputText);
    else if (location === "watchlist" || location === "library")
      searchInMyFilms(inputText);
  }, [inputText]);

  useEffect(() => {
    setInputText(myFilmSearchingTerm);
  }, [myFilmSearchingTerm]);
  useEffect(() => {
    setInputText(filmSearchingTerm);
  }, [filmSearchingTerm]);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setInputText("");
      searchInFilms("");
      searchInMyFilms("");
    });
  }, [history]);

  return (
    <div style={{ width: "300px" }}>
      <TextField
        variant="outlined"
        placeholder="Search for anything"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  myFilmSearchingTerm: state.myFilm.searchingTerm,
  filmSearchingTerm: state.film.searchingTerm,
});

export default connect(mapStateToProps, { searchInFilms, searchInMyFilms })(
  SearchFilms
);
