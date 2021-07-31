import React from 'react';
// import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <footer
      style={ {
        display: 'flex',
        justifyContent: 'space-around',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        backgroundColor: 'grey',
      } }
      data-testid="footer"
    >
      <a href="/comidas">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food icon" />
      </a>
      <a href="/explorar">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
      </a>
      <a href="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </a>
    </footer>
  );
}

export default Footer;
