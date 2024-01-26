import { useState } from 'react';

import './app.scss';

import Generator from './components/Generator';
const App = () => {
  const [currentAdvice, setCurrentAdvice] = useState([
    {
      id: 117,
      content: "I'm sorry, but I don't know what to do with that.",
      generatedAt: new Date().toLocaleString(),
    },
  ]);

  return (
    <div className="generator-container">
      {currentAdvice.map((advice) => {
        return <Generator advice={advice} key={advice.id} />;
      })}
    </div>
  );
};

export default App;
