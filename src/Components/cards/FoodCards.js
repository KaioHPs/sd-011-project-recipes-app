import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../Context/MainContext';
import { getFoodsInitial } from '../../Services/ApiFood';

function FoodCards() {
  const [initialFoods, setInitialFoods] = useState([]);
  const { dataFoods, limit, inputSearch } = useContext(MainContext);

  async function fetchFoodsInitial() {
    const foodsInitialAPI = await getFoodsInitial();
    setInitialFoods(foodsInitialAPI.meals);
  }

  useEffect(() => {
    fetchFoodsInitial();
  }, []);

  if (inputSearch) {
    return (
      <div className="card-foods">
        { dataFoods.map((item, index) => index < limit && (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ `Food ${item.strMeal}` }
              width="80"
            />
            <p data-testid={ `${index}-card-name` }>
              { item.strMeal }
            </p>
          </div>
        )) }
      </div>
    );
  }

  return (
    <div className="card-foods">
      {initialFoods.map((item, index) => index < limit && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ `Food ${item.strMeal}` }
            width="80"
          />
          <p data-testid={ `${index}-card-name` }>
            { item.strMeal }
          </p>
        </div>
      )) }
    </div>
  );
}

export default FoodCards;
