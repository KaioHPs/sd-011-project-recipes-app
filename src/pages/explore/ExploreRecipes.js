import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';

export default function ExploreRecipes() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Area
          </button>
        </Link>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Por Area
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}