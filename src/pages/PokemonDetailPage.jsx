// pages/PokemonDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetailPage() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon details');
                const data = await response.json();
                setPokemon({
                    id: data.id,
                    name: data.name,
                    sprite: data.sprites.front_default,
                    types: data.types.map((t) => t.type.name),
                    height: data.height,
                    weight: data.weight,
                    stats: data.stats.map((stat) => ({
                        name: stat.stat.name,
                        value: stat.base_stat,
                    })),
                });
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPokemonDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-700">Pokémon not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#{pokemon.id})
                            </h1>
                            <p className="text-sm text-gray-600">Types: {pokemon.types.join(', ')}</p>
                        </div>
                        <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700">Height: {pokemon.height / 10} m</p>
                        <p className="text-gray-700">Weight: {pokemon.weight / 10} kg</p>
                        <h2 className="text-lg font-semibold mt-4">Base Stats:</h2>
                        <ul className="mt-2 space-y-2">
                            {pokemon.stats.map((stat, index) => (
                                <li key={index} className="text-gray-700">
                                    {stat.name}: {stat.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailPage;