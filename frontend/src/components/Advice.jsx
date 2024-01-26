import React from 'react';

import dividerDesktop from './../assets/pattern-divider-desktop.svg';
import dividerMobile from './../assets/pattern-divider-mobile.svg';
import iconDice from './../assets/icon-dice.svg';

const Advice = ({ advice, handleOnClick }) => {
  return (
    <>
      <p className="advice__number">Advice #{advice.id}</p>
      <p className="advice__content" key={advice.id}>
        &ldquo;
        {advice.advice}
        &rdquo;
      </p>
      <picture className="advice__separator">
        <source
          media="(max-width: 900px)"
          srcSet={dividerMobile}
          alt="Divider image for mobile"
        />
        <img src={dividerDesktop} alt="Divider image for desktop" />
      </picture>
      <button className="advice__generate-advice-btn" onClick={handleOnClick}>
        <img
          src={iconDice}
          alt="Dice icon"
          className="advice__generate-advice-icon"
        />
      </button>
    </>
  );
};

export default Advice;
