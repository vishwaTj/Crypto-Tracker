import React from 'react';
import "./App.css";
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Home from './Pages/Home';
import 'react-alice-carousel/lib/alice-carousel.css';
import  Alert  from './components/Alert';


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
      <Alert />
    </BrowserRouter>
  )
}

export default App;