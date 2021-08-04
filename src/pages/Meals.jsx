import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../css/meals.css';

export default function Meals() {
  const { meals } = useContext(UserContext);
  if (!meals) {
    return <div>loading</div>;
  }

  return (
    <>
      <h1>COMIDAS</h1>
      {meals.map((meal) => (
        <div className="meal" key={ meal.idMeal }>
          <img src={ meal.strMealThumb } alt="imagem da refeição" />
          <p>{ meal.strMeal }</p>
        </div>
      ))}
    </>
  );
}
