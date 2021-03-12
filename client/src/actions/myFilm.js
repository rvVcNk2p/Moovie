import {
  GET_MY_FILMS,
  GET_MY_FILMS_ERROR,
  CREATE_MY_FILM,
  CREATE_MY_FILM_ERROR,
  WATCH_FILM,
  WATCH_FILM_ERROR,
  UNWATCH_FILM,
  UNWATCH_FILM_ERROR,
  DELETE_MY_FILM,
  DELETE_MY_FILM_ERROR,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getMyFilms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/my-films");

    dispatch({
      type: GET_MY_FILMS,
      payload: res.data.films,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: GET_MY_FILMS_ERROR,
    });
  }
};

export const deleteMyFilm = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/my-films/${_id}`);

    dispatch({
      type: DELETE_MY_FILM,
      payload: _id,
    });
    dispatch(setAlert(res.data.msg, "info"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: DELETE_MY_FILM_ERROR,
    });
  }
};

export const addFilmToWatchList = (filmId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/my-films", { filmId }, config);

    dispatch({
      type: CREATE_MY_FILM,
      payload: res.data.myFilm,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: CREATE_MY_FILM_ERROR,
    });
  }
};
export const watchFilm = (_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/my-films/watch", { _id }, config);

    dispatch({
      type: WATCH_FILM,
      payload: res.data.film,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: WATCH_FILM_ERROR,
    });
  }
};

export const unWatchFilm = (_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/my-films/unwatch", { _id }, config);

    dispatch({
      type: UNWATCH_FILM,
      payload: res.data.film,
    });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: UNWATCH_FILM_ERROR,
    });
  }
};