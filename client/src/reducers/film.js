import {
  GET_FILMS,
  CREATE_FILM,
  GET_FILMS_ERROR,
  CREATE_FILM_ERROR,
} from "../actions/types";

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
    case CREATE_FILM: {
      return {
        ...state,
        films: [payload, ...state.films],
        loading: false,
      };
    }
    case GET_FILMS_ERROR:
      return {
        ...state,
        films: [],
        loading: false,
      };
    case CREATE_FILM_ERROR:
    default:
      return state;
  }
}
