import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const URL = useLocation().pathname;
  const [click, setClick] = useState(false);

  function copyURL() {
    copy(`http://localhost:3000${URL}`);
    setClick(true);
  }

  return (
    <>
      <input
        type="image"
        src={ shareIcon }
        alt="Icone share"
        data-testid="share-btn"
        onClick={ () => copyURL() }
        // height="200px"
        // width="200px"
      />
      <span>{click ? <p>Link copiado!</p> : null}</span>
    </>
  );
  // button.addEventListener('click', function () {
  //   copy('This is some cool text')
  // })
}

export default ShareButton;