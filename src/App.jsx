import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailPage from './pages/PokemonDetailPage';

function App() {
  const baseurl = '/WEB2_Pok-dex';

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <nav className="mb-4 bg-white p-4 rounded-lg shadow-md w-full flex justify-between items-center">
          <div className="text-4xl font-bold text-gray-800">Pokédex</div>
        </nav>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <Routes>
            <Route path="/" element={<Navigate to={baseurl} replace />} />
            <Route path={baseurl} element={<PokemonListPage />} />
            <Route path={`${baseurl}/pokemon/:id`} element={<PokemonDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;