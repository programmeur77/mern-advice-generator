import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Generator from './components/Generator';
import FormContainer from './components/FormContainer';

import './App.scss';
function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentAdvice, setCurrentAdvice] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          exact
          path="/advice"
          element={
            <Generator
              user={user}
              setUser={setUser}
              userId={userId}
              currentAdvice={currentAdvice}
              setCurrentAdvice={setCurrentAdvice}
            />
          }
        />
        <Route
          path="/login"
          element={
            <FormContainer
              user={user}
              setUser={setUser}
              setUserId={setUserId}
              setCurrentAdvice={setCurrentAdvice}
            />
          }
        />
        <Route path="/register" element={<FormContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
