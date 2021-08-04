import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function VerifyStart({ id }) {
  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipeDone.length === 0 || recipeDone.find((recipe) => id !== recipe.id)) {
    return (
      <Link
        to={ `${window.location.pathname}/in-progress` }
      >
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    );
  }

  if (recipeInProgress
    && ((Object
      .keys(recipeInProgress.cocktails)).includes(id) || (Object
      .keys(recipeInProgress.meals)).includes(id))) {
    return (
      <Link
        to={ `${window.location.pathname}/in-progress` }
      >
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
        >
          Continuar Receita
        </button>
      </Link>
    );
  }

  return null;
}

VerifyStart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default VerifyStart;
