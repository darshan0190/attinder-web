import React from 'react';
import logo from './logo.svg';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';  
import './App.css';
import SwipePage from './pages/SwipePage';
import HomePage from './pages/HomePage';
import { AccountContext } from './context/AccountContext';
import LoginPage from './pages/LoginPage';
import { useEffect } from 'react';

function App() {
  const { authentication } = React.useContext(AccountContext);

  useEffect(()=>{
  },
  [])
  return (<>
    
   {authentication? <div className="App">
   <BrowserRouter>
   <Routes>
   <Route path="/swipe" element={<SwipePage />} />
   {authentication?<Route path="/home" element={<HomePage />} />:<Route path="/login" element={<LoginPage />} />}
     <Route path="/" element={<HomePage />} />
   </Routes>
 </BrowserRouter>
 </div>:<LoginPage/>}
 </>
  );
}

export default App;
