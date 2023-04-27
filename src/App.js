import React from 'react';
import "./App.css";
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Home from './Pages/Home';

function App() {
  

  return (
    <BrowserRouter>
     <div className="MainPage">
        <Header />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/coins/:id' element={<CoinPage />}/>        
        </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App;