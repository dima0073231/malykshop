import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cars, setCars] = useState([
    {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: '$25,000',
      image: 'https://via.placeholder.com/300x200',
      description: 'Надежный седан с хорошей экономией топлива.'
    },
    {
      id: '2',
      brand: 'BMW',
      model: 'X5',
      year: 2021,
      price: '$45,000',
      image: 'https://via.placeholder.com/300x200',
      description: 'Премиальный кроссовер с мощным двигателем.'
    }
  ]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home cars={cars} />} />
            <Route path="/car/:id" element={<CarDetails cars={cars} />} />
            <Route path="/admin" element={<Admin cars={cars} setCars={setCars} isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
