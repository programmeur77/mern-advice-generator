import { useState } from 'react';
import { FaDiceFive } from 'react-icons/fa6';

import dividerMobileImg from './../assets/pattern-divider-mobile.svg';
import dividerDesktopImg from './../assets/pattern-divider-desktop.svg';

const Generator = () => {
  const [currentAdvice, setCurrentAdvice] = useState([
    {
      id: 117,
      content: "I'm sorry, but I don't know what to do with that.",
      generatedAt: new Date().toLocaleString(),
    },
  ]);

  return (
    <div className="advice">
      {currentAdvice.map((advice) => {
        return (
          <>
            <p className="advice__number">Advice # {advice.id}</p>
            <p className="advice__content">&ldquo;{advice.content}&rdquo;</p>
            <picture class="advice__separator">
              <source
                media="(max-width: 900px)"
                srcset={dividerMobileImg}
                alt="Divider image for mobile version"
              />
              <img
                src={dividerDesktopImg}
                alt="Divider image for desktop version"
                className="advice__separator-desktop-img"
              />
            </picture>
            <button className="advice__generate-advice-btn">
              <FaDiceFive className="advice__generate-advice-btn-icon" />
            </button>
          </>
        );
      })}
    </div>
  );
};

export default Generator;
