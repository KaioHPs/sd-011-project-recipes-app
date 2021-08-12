import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import * as actions from '../../actions';

const TWELVE = 12;
const FIVE = 5;
class Bebidas extends Component {
  componentDidMount() {
    const { generalRecipesDrink, categoriesDrink } = this.props;
    generalRecipesDrink();
    categoriesDrink();
  }

  handleOnClickFilter(element) {
    const { filteredDrinks, generalRecipesDrink } = this.props;
    if (element.target.checked === true) {
      filteredDrinks(element.target.value);
    } else {
      generalRecipesDrink();
    }
  }

  renderFilters() {
    let { allCategories } = this.props;
    const { generalRecipesDrink } = this.props;
    allCategories = allCategories.slice(0, FIVE);

    return [
      <button
        key="All-btn"
        data-testid="All-category-filter"
        className="filter-btn"
        type="button"
        value="All"
        onClick={ generalRecipesDrink }
      >
        All
      </button>,

      ...allCategories.map((item, index) => (
        <label
          className="switch"
          key={ index }
          htmlFor="id"
        >
          <input
            id="id"
            className="filter-toggle"
            type="checkbox"
            value={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
            onChange={ (target) => this.handleOnClickFilter(target) }
          />
          {item.strCategory}
          <span className="slider round" />
        </label>
      )),
    ];
  }

  renderDrinks() {
    const { allRecipes, isFiltered,
      isDrinkFilter, drinkRecipeByIngredient } = this.props;
    const allRecipesSlice = allRecipes.slice(0, TWELVE);
    const drinkRecipeByIngredientSlice = drinkRecipeByIngredient.slice(0, TWELVE);
    if (allRecipesSlice.length === 1 && !isFiltered) {
      return (
        <Redirect to={ `/bebidas/${allRecipesSlice[0].idDrink}` } />
      );
    }
    const recipes = !isDrinkFilter ? allRecipesSlice : drinkRecipeByIngredientSlice;
    return recipes.map((item, index) => (
      <Link to={ `/bebidas/${item.idDrink}` } key={ index }>
        <div
          className="card-item"
          data-testid={ `${index}-recipe-card` }
          key={ item.idDrink }
        >
          <img
            className="img-card"
            alt="drinks"
            src={ item.strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
          <div>
            <span
              data-testid={ `${index}-card-name` }
            >
              {item.strDrink}
            </span>
          </div>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <>
        <Header title="Bebidas" mode="bebidas" hasSearchBar />
        <div className="container-main">
          <div className="filter-list">
            {this.renderFilters()}
          </div>
          <div className="card-list">
            {this.renderDrinks()}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allRecipes: state.recipes.allRecipes,
  allCategories: state.recipes.allCategories,
  isFiltered: state.recipes.isFiltered,
  drinkRecipeByIngredient: state.recipes.drinkRecipeByIngredient,
  isDrinkFilter: state.recipes.isDrinkFilter,
});

const mapDispatchToProps = (dispatch) => ({
  generalRecipesDrink: () => dispatch(actions.generalRecipesDrink()),
  categoriesDrink: () => dispatch(actions.categoriesDrink()),
  filteredDrinks: (filter) => dispatch(actions.filteredDrinks(filter)),
});

Bebidas.propTypes = {
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  generalRecipesDrink: PropTypes.func.isRequired,
  categoriesDrink: PropTypes.func.isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredDrinks: PropTypes.func.isRequired,
  isFiltered: PropTypes.arrayOf(PropTypes.bool).isRequired,
  drinkRecipeByIngredient: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDrinkFilter: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);