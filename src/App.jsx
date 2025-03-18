import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailPage from './pages/PokemonDetailPage';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <nav className="mb-4 bg-white p-4 rounded-lg shadow-md w-full flex justify-between items-center">
          <div className="text-4xl font-bold text-gray-800">Pokédex</div>
        </nav>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;