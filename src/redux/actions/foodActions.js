import { fetchAPIName, fetchAPICategory,
  fetchAPICategoryFilter, fetchAPIByID,
  fetchFoodRandom } from '../../services/fetchAPIFood';
import { fetchAPIName as fetchRecomendations } from '../../services/fetchAPIDrink';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';
export const FOOD_CATEGORY_SUCCESS = 'FOOD_CATEGORY_SUCCESS';
export const FOOD_LIST_CATEGORY_SUCCESS = 'FOOD_LIST_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const FOOD_DETAILS_ID_SUCCESS = 'FOOD_DETAILS_ID_SUCCESS';
export const DRINK_RECOMENDATIONS_SUCCESS = 'DRINK_RECOMENDATIONS_SUCCESS';

const foodListSuccess = (payload) => ({
  type: FOOD_LIST_SUCCESS,
  payload,
});

export const fetchFoodList = (name) => async (dispatch) => {
  const returnFetch = await fetchAPIName(name);
  dispatch(foodListSuccess(returnFetch));
};

const foodCategorySuccess = (payload) => ({
  type: FOOD_CATEGORY_SUCCESS,
  payload,
});

export const fetchFoodCategory = (category) => async (dispatch) => {
  const returnFetch = await fetchAPICategory(category);
  dispatch(foodCategorySuccess(returnFetch));
};

const foodListByCategorySuccess = (payload) => ({
  type: FOOD_LIST_CATEGORY_SUCCESS,
  payload,
});

const drinkRecomendations = (payload) => ({
  type: DRINK_RECOMENDATIONS_SUCCESS,
  payload,
});

export const fetchDrinkRecomendations = (name) => async (dispatch) => {
  const returnFetch = await fetchRecomendations(name);
  dispatch(drinkRecomendations(returnFetch));
};

export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload,
});

export const fetchFoodListByCategory = (category) => async (dispatch) => {
  dispatch(updateCategory(category));
  const returnFetch = await fetchAPICategoryFilter(category);
  dispatch(foodListByCategorySuccess(returnFetch));
};

const foodDetailsIDSuccess = (payload) => ({
  type: FOOD_DETAILS_ID_SUCCESS,
  payload,
});

export const fetchFoodID = (id) => async (dispatch) => {
  const returnFetch = await fetchAPIByID(id);
  dispatch(foodDetailsIDSuccess(returnFetch));
};

export const saveFavoriteRecipe = (id) => async () => {
  const returnFetch = await fetchAPIByID(id);
  const genericObj = {
    id: returnFetch[0].idMeal,
    type: 'comida',
    area: returnFetch[0].strArea,
    category: returnFetch[0].strCategory,
    alcoholicOrNot: '',
    name: returnFetch[0].strMeal,
    image: returnFetch[0].strMealThumb,
  };
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([genericObj]));
  } else {
    const newFavoriteRecipes = [...favoriteRecipes, genericObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  }
};

export const removeFavoriteRecipe = (id) => async () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipes = favoriteRecipes
    .filter((item) => item.id !== id && item.type !== 'comida');
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};

export const randomFoodId = () => async () => {
  const returnFetch = await fetchFoodRandom();
  return returnFetch;
};