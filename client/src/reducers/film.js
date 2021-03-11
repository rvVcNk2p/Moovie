import { GET_FILMS, GET_FILMS_ERROR } from "../actions/types";

const initialState = {
  films: [],
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FILMS:
      return {
        ...state,
        films: [...payload],
        loading: false,
      };
    case GET_FILMS_ERROR:
      return {
        ...state,
        films: [],
        loading: false,
      };
    default:
      return state;
  }
}
