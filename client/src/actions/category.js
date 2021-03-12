import { GET_CATEGORIES, GET_CATEGORIES_ERROR } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.categories,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: GET_CATEGORIES_ERROR,
    });
  }
};
