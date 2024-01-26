import { FaDiceFive } from 'react-icons/fa6';

import dividerMobileImg from './../assets/pattern-divider-mobile.svg';
import dividerDesktopImg from './../assets/pattern-divider-desktop.svg';

import './generator.scss';

const Generator = ({ advice }) => {
  return (
    <>
      <p className="advice__number">Advice #{advice.id}</p>
      <p className="advice__content">&ldquo;{advice.content}&rdquo;</p>
      <picture className="advice__separator">
        <source
          srcSet={dividerMobileImg}
          media="(max-width: 900px)"
          alt="Divider image for mobiles"
        />
        <img src={dividerDesktopImg} alt="Divider image for desktop" />
      </picture>
      <button className="advice__generate-btn">
        <FaDiceFive className="advice__generate-icon" />
      </button>
    </>
  );
};

export default Generator;
