import {
  GET_FILMS,
  CREATE_FILM,
  GET_FILMS_ERROR,
  CREATE_FILM_ERROR,
  UPDATE_FILM,
  UPDATE_FILM_ERROR,
  SELECT_FILM,
  DESELECT_FILM,
} from "../actions/types";

const initialState = {
  films: [],
  film: {},
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
    case UPDATE_FILM: {
      return {
        ...state,
        films: state.films.map((film) => {
          if (film._id === payload._id) return payload;
          else return film;
        }),
        loading: false,
      };
    }
    case GET_FILMS_ERROR:
      return {
        ...state,
        films: [],
        loading: false,
      };
    case SELECT_FILM:
      return {
        ...state,
        film: state.films.filter((film) => film._id === payload),
      };
    case DESELECT_FILM:
      return {
        ...state,
        film: {},
      };
    case CREATE_FILM_ERROR:
    case UPDATE_FILM_ERROR:
    default:
      return state;
  }
}
