import { GET_FILMS, GET_FILMS_ERROR } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getMyFilms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/my-films");

    dispatch({
      type: GET_FILMS,
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
      type: GET_FILMS_ERROR,
    });
  }
};
