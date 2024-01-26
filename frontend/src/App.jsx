import dividerDesktop from './assets/pattern-divider-desktop.svg';
import dividerMobile from './assets/pattern-divider-mobile.svg';
import iconDice from './assets/icon-dice.svg';

import './App.scss';
function App() {
  const [currentAdvice, setCurrentAdvice] = useState([
    {
      id: 1,
      content: "I'm sorry, but I don't know what to do with that.",
      generatedAt: new Date().toLocaleString(),
    },
  ]);

  return (
    <>
      <div className="generator-container">
        {currentAdvice.map((advice) => {
          return (
            <>
              <p className="advice__number">Advice #{advice.id}</p>
              <p className="advice__content">&ldquo;{advice.content}&rdquo;</p>
              <picture className="advice__separator">
                <source
                  media="(max-width: 900px)"
                  srcset={dividerMobile}
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
    </>
  );
}

export default App;
