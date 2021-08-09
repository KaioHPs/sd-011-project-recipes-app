import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context';
import { fetchDefaultDrinksFromCocktailsDB,
  fetchDefaultFoodsFromMealsDB, fetchCategoriesFromMealsDB,
  fetchCategoriesFromCocktailsDB, fetchMealsByCategoryFromMealsDB,
  fetchDrinksByCategoryFromCocktailsDB } from '../services';

export default function Provider({ children }) {
  const [defaultFood, setDefaultFood] = useState([]);
  const [foodArray, setFoodArray] = useState([]);
  const [defaultDrink, setDefaultDrink] = useState([]);
  const [drinkArray, setDrinkArray] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinksCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState('');
  const [isIngridientUsed, setIsIngridientUsed] = useState({});

  async function getFetchDataFromService() {
    const meals = await fetchDefaultFoodsFromMealsDB();
    const drinks = await fetchDefaultDrinksFromCocktailsDB();
    const mealsCategories = await fetchCategoriesFromMealsDB();
    const drinksCategories = await fetchCategoriesFromCocktailsDB();
    setDefaultFood(meals);
    setDefaultDrink(drinks);
    setMealCategories(mealsCategories);
    setDrinksCategories(drinksCategories);
  }

  async function filterMealsByCategory(category) {
    if (category === isFiltered || category === 'All') {
      setFoodArray(defaultFood);
      setIsFiltered('');
    } else if (category !== isFiltered) {
      setIsFiltered(category);
      const filteredMeals = await fetchMealsByCategoryFromMealsDB(category);
      setFoodArray(filteredMeals);
    }
  }

  async function filterDrinksByCategory(category) {
    if (category === isFiltered || category === 'All') {
      setDrinkArray(defaultDrink);
      setIsFiltered('');
    } else if (category !== isFiltered) {
      setIsFiltered(category);
      const filteredDrinks = await fetchDrinksByCategoryFromCocktailsDB(category);
      setDrinkArray(filteredDrinks);
    }
  }

  useEffect(() => {
    getFetchDataFromService();
  }, []);

  useEffect(() => {
    const foods = defaultFood;
    const drinks = defaultDrink;
    setFoodArray(foods);
    setDrinkArray(drinks);
  }, [defaultFood, defaultDrink]);

  return (
    <GlobalContext.Provider
      value={ {
        foodArray,
        drinkArray,
        mealCategories,
        drinkCategories,
        isIngridientUsed,
        setIsIngridientUsed,
        filterMealsByCategory,
        filterDrinksByCategory,
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};