import {
  GET_MY_FILMS,
  GET_MY_FILMS_ERROR,
  CREATE_MY_FILM,
  CREATE_MY_FILM_ERROR,
  WATCH_FILM,
  WATCH_FILM_ERROR,
  UNWATCH_FILM,
  UNWATCH_FILM_ERROR,
} from "../actions/types";

const initialState = {
  myFilms: [],
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_FILMS:
      return {
        ...state,
        myFilms: [...payload],
        loading: false,
      };
    case CREATE_MY_FILM:
      return {
        ...state,
        myFilms: [payload, ...state.myFilms],
        loading: false,
      };
    case WATCH_FILM:
    case UNWATCH_FILM:
      return {
        ...state,
        myFilms: state.myFilms.map((myfilm) => {
          if (myfilm._id === payload._id) {
            return payload;
          } else return myfilm;
        }),
        loading: false,
      };
    case GET_MY_FILMS_ERROR:
      return {
        ...state,
        myFilms: [],
        loading: false,
      };
    case CREATE_MY_FILM_ERROR:
    case WATCH_FILM_ERROR:
    case UNWATCH_FILM_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
