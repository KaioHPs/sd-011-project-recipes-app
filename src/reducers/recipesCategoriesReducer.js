import {
  GET_RECIPES_CATEGORIES, GET_RECIPES_CATEGORIES_SUCCESS, GET_RECIPES_CATEGORIES_ERROR,
  SET_SELECTED_CATEGORY,
} from '../actions';

const INITIAL_STATE = {
  categories: [],
  type: 'not defined',
  loading: true,
  error: null,
  selectedCategory: 'all',
};

const recipesCategoriesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_RECIPES_CATEGORIES:
    return {
      ...state,
      loading: true,
      error: null,
      selectedCategory: 'all',
    };
  case GET_RECIPES_CATEGORIES_SUCCESS:
    return {
      ...state,
      loading: false,
      categories: payload.categories,
      type: payload.type,
    };
  case GET_RECIPES_CATEGORIES_ERROR:
    return {
      ...state,
      loading: false,
      error: `${payload}`,
    };
  case SET_SELECTED_CATEGORY:
    return {
      ...state,
      selectedCategory: state.selectedCategory === payload
        ? 'all'
        : payload,
    };
  default:
    return state;
  }
};

export default recipesCategoriesReducer;
