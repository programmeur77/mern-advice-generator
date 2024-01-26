import { useState, useEffect } from 'react';

import dividerDesktop from './assets/pattern-divider-desktop.svg';
import dividerMobile from './assets/pattern-divider-mobile.svg';
import iconDice from './assets/icon-dice.svg';
import loader from './assets/loader.svg';

import './App.scss';
function App() {
  const [currentAdvice, setCurrentAdvice] = useState(null);

  const fetchAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdviceAndSave(data.slip);
  };

  const setAdviceAndSave = (advice) => {
    setCurrentAdvice([advice]);
    localStorage.setItem('advice', JSON.stringify(advice));
  };

  useEffect(() => {
    if (!localStorage.getItem('advice')) {
      if (fetchAdvice()) {
        throw new Error();
      }
    }

    setCurrentAdvice([JSON.parse(localStorage.getItem('advice'))]);
  }, []);

  return (
    <div className="generator-container">
      {currentAdvice &&
        currentAdvice.map((advice) => {
          return (
            <>
              <p className="advice__number">Advice #{advice.id}</p>
              <p className="advice__content">&ldquo;{advice.advice}&rdquo;</p>
              <picture className="advice__separator">
                <source
                  media="(max-width: 900px)"
                  srcSet={dividerMobile}
                  alt="Divider image for mobile"
                />
                <img src={dividerDesktop} alt="Divider image for desktop" />
              </picture>
              <button className="advice__generate-advice-btn">
                <img
                  src={iconDice}
                  alt="Dice icon"
                  className="advice__generate-advice-icon"
                />
              </button>
            </>
          );
        })}
    </div>
  );
}

export default App;
