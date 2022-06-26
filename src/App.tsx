import React from 'react';
import logo from './logo.svg';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';  
import './App.css';
import SwipePage from './pages/SwipePage';
import HomePage from './pages/HomePage';
import { AccountContext } from './context/AccountContext';

function App() {
  const { authentication, user } = React.useContext(AccountContext);
  return (
    
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/swipe" element={<SwipePage />} />
      {/* <Route path="/" element={<HomePage />} /> */}
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
