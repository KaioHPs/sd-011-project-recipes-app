import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../globalComponents/Header';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButton from './FavoriteComponents/FavoriteButton';
import DoneButton from './FavoriteComponents/DoneButton';

function FavoriteRecipes({ match }) {
  const [copied, setCopied] = React.useState(false);

  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const alterURL = {
    comida: 'comidas',
    bebida: 'bebidas',
  };

  function shareButtonHandle(id, type) {
    setCopied(true);
    const mSeconds = 2000;
    if (type === 'comida') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }
    setTimeout(() => {
      setCopied(false);
    }, mSeconds);
  }

  function renderAllFavorite() {
    return favoriteStorage;
  }

  function renderAllDoneRecipes() {
    return doneRecipesStorage;
  }

  function renderFavoriteFoods() {
    const favoriteFoods = favoriteStorage && favoriteStorage
      .filter((item) => item.type === 'comida');
    return favoriteFoods;
  }

  function renderFavoriteDrinks() {
    const favoriteDrinks = favoriteStorage && favoriteStorage
      .filter((item) => item.type === 'bebida');
    return favoriteDrinks;
  }

  function renderDoneFoods() {
    const doneFoods = doneRecipesStorage && doneRecipesStorage
      .filter((item) => item.type === 'comida');
    return doneFoods;
  }

  function renderDoneDrinks() {
    const doneDrinks = doneRecipesStorage && doneRecipesStorage
      .filter((item) => item.type === 'bebida');
    return doneDrinks;
  }

  const [favoriteStr, setFavoriteStr] = React.useState(renderAllFavorite());
  const [doneRecipes, setDoneRecipes] = React.useState(renderAllDoneRecipes());

  return (
    <>
      <Header title="Receitas Favoritas" match={ match } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setFavoriteStr(renderAllFavorite());
          setDoneRecipes(renderAllDoneRecipes());
        } }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => {
          setFavoriteStr(renderFavoriteFoods());
          setDoneRecipes(renderDoneFoods());
        } }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFavoriteStr(renderFavoriteDrinks());
          setDoneRecipes(renderDoneDrinks());
        } }
      >
        Drinks
      </button>
      <div>
        {favoriteStr && favoriteStr.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '200px' } }
                src={ recipe.image }
                alt="imagem da receita"
                data-testid={ `${index}-horizontal-image` }
              />
              {recipe.type === 'comida'
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.area ? `${recipe.area} - ${recipe.category}`
                      : `${recipe.category}`}
                  </p>)
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.alcoholicOrNot}`}
                  </p>
                )}
              <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            </Link>
            <button
              type="button"
              onClick={ () => shareButtonHandle(recipe.id, recipe.type) }
            >
              <img
                src={ shareIcon }
                alt="shareIcon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <FavoriteButton
              index={ index }
              id={ recipe.id }
              setFavoriteStr={ setFavoriteStr }
            />

            {copied ? <p>Link copiado!</p> : null}
          </div>
        ))}
        {doneRecipes && doneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <div>
              <Link
                to={ `/${alterURL[recipe.type]}/${recipe.id}` }
              >
                <img
                  width="300px"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              {recipe.type === 'comida'
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.area ? `${recipe.area} - ${recipe.category}`
                      : `${recipe.category}`}
                  </p>)
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.alcoholicOrNot}`}
                  </p>)}
              <button
                type="button"
                onClick={ () => shareButtonHandle(recipe.id, recipe.type) }
              >
                <img
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>

              <DoneButton
                index={ index }
                id={ recipe.id }
                setDoneRecipes={ setDoneRecipes }
              />

              <p>{copied ? 'Link copiado!' : null}</p>

              <Link
                to={ `/${alterURL[recipe.type]}/${recipe.id}` }
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <p>
                {recipe.tags && recipe.tags.map((tag, indexIn) => (
                  <div
                    key={ indexIn }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </div>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

FavoriteRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FavoriteRecipes;
