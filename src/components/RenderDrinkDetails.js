import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/RecipeDetails.css';

function RenderDrinkDetails({ copyLink }) {
  const { drink, shareIcon, bkHeart } = useContext(RecipeAppContext);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt={ drink.strDrink }
        src={ drink.strDrinkThumb }
        height="350px"
      />
      <div className="recipe-details-legend">
        <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="card da receita"
          onClick={ () => copyLink(drink.idDrink) }
        />
        <input
          type="image"
          alt="someText"
          data-testid="favorite-btn"
          src={ bkHeart }
        />
      </div>
      <p
        data-testid="recipe-category"
        className="recipe-details-category"
      >
        { drink.strAlcoholic }
      </p>
    </div>
  );
}

RenderDrinkDetails.propTypes = {
  copyLink: PropTypes.func.isRequired,
};

export default RenderDrinkDetails;