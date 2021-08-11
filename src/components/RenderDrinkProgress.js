import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeInProgress.css';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RenderDrinkProgress({ strDrinkThumb, strDrink, strCategory,
  strInstructions, id, finalListIngredients,
  classNameIngredients, statusIngredients, statusEndRecipeButton,
  favoriteIcon, setFavoriteIcon, setHasChecked,
  setStatusIngredients, setClassNameIngredients,
  setCountCheckIngredList, countCheckIngredList,
  numberIngredients, setStatusEndRecipeButton, hasChecked, strAlcoholic }) {
  const [click, setClick] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(statusIngredients));
    }
  }, [statusIngredients]);

  useEffect(() => {
    if ((countCheckIngredList === numberIngredients)) {
      return setStatusEndRecipeButton(false);
    }
    return setStatusEndRecipeButton(true);
  }, [countCheckIngredList, numberIngredients]);

  function checkList(index) {
    setHasChecked(true);
    if (statusIngredients[index] === true) {
      setStatusIngredients((prev) => ({ ...prev, [index]: false }));
      setClassNameIngredients((prev) => ({ ...prev, [index]: 'notChecked' }));
      const newCount = countCheckIngredList - 1;
      return setCountCheckIngredList(newCount);
    }
    setStatusIngredients((prev) => ({ ...prev, [index]: true }));
    setClassNameIngredients((prev) => ({ ...prev, [index]: 'yesChecked' }));
    const newCount = countCheckIngredList + 1;
    return setCountCheckIngredList(newCount);
  }

  function copyLink(index) {
    copy(`http://localhost:3000/bebidas/${index}`);
    setClick(true);
  }

  function changeStatusIcon() {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
      let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!favoriteRecipes) favoriteRecipes = [];
      const newFavoriteRecipes = [
        ...favoriteRecipes,
        {
          id,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    if (favoriteIcon === blackHeartIcon) {
      setFavoriteIcon(whiteHeartIcon);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    }
  }

  function createIngredArray() {
    const finalList = finalListIngredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ classNameIngredients[index] }
      >
        {ingredient}
        <input
          type="checkbox"
          id={ index }
          checked={ statusIngredients[index] }
          onClick={ (event) => checkList(event.target.id) }
        />
      </li>
    ));
    return (
      <ul>{ finalList }</ul>
    );
  }

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        width="360px"
        height="300px"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ strDrink }</h3>
      {' '}
      <span>
        {' '}
        { click ? <p>Link copiado!</p> : null }
        {' '}
      </span>
      <br />
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        alt="compartilhar"
        onClick={ () => copyLink(id) }
      />
      {' '}
      <br />
      <input
        type="image"
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="botão favoritar"
        onClick={ () => changeStatusIcon() }
      />
      {' '}
      <br />
      <p data-testid="recipe-category">{ strCategory }</p>
      <span>
        { createIngredArray() }
      </span>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ statusEndRecipeButton }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RenderDrinkProgress.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  finalListIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  classNameIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusEndRecipeButton: PropTypes.bool.isRequired,
  favoriteIcon: PropTypes.string.isRequired,
  setFavoriteIcon: PropTypes.func.isRequired,
  setHasChecked: PropTypes.func.isRequired,
  setStatusIngredients: PropTypes.func.isRequired,
  setClassNameIngredients: PropTypes.func.isRequired,
  setCountCheckIngredList: PropTypes.func.isRequired,
  countCheckIngredList: PropTypes.number.isRequired,
  numberIngredients: PropTypes.number.isRequired,
  setStatusEndRecipeButton: PropTypes.func.isRequired,
  hasChecked: PropTypes.bool.isRequired,
};

export default RenderDrinkProgress;