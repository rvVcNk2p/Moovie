import { GET_CATEGORIES, GET_CATEGORIES_ERROR } from "../actions/types";

const initialState = {
  categories: [],
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...payload],
        loading: false,
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
