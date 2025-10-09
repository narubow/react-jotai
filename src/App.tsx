import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FormPrivate } from './components/form/formPrivate/formPrivate';
import { RUrl } from './lib/url';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={RUrl} element={<FormPrivate />} />
          <Route path={`${RUrl}/form/private`} element={<FormPrivate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;