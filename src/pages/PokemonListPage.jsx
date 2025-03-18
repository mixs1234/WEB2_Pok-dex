import { PokemonSearchField, PokeButton, PokemonCard } from '../components';
import React, { useState, useEffect } from 'react';

function PokemonCardPage({ }) {
    const jump = 25;
    const [range, setRange] = useState({ from: 1, to: jump });
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchPokemon = async () => {
            const data = [];
            for (let id = range.from; id <= range.to; id++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemon = await response.json();
                data.push({
                    id: pokemon.id,
                    name: pokemon.name,
                    sprite: pokemon.sprites.front_default,
                    type: pokemon.types[0].type.name,
                });
            }
            setPokemonData(data);
            setIsLoading(false);
        };
        fetchPokemon();
    }, [range]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Container for better width control */}
            <div className="max-w-7xl mx-auto">
                {/* Search Field Section */}
                <div className="mb-8">
                    <PokemonSearchField
                        className="w-full mx-auto bg-slate-600 rounded-md shadow-md"
                    />
                </div>

                {/* Pokemon Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {isLoading
                        ? Array.from({ length: jump }, (_, index) => (
                            <PokemonCard key={index} isLoading={true} className="relative" />
                        ))
                        : pokemonData.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                className="relative"
                            />
                        ))}
                </div>

                {/* Pagination Section */}
                <div className="mt-8 flex justify-center space-x-8">
                    <PokeButton
                        onClick={() => setRange({ from: range.from - jump, to: range.to - jump })}
                        disabled={range.from === 1}
                        bgColor="#ff7373"
                    >
                        <p className='text-black font-semibold text-lg'>
                            Prévious
                        </p>
                    </PokeButton>
                    <PokeButton
                        onClick={() => setRange({ from: range.from + jump, to: range.to + jump })}
                        bgColor="#ff7373"
                    >
                        <p className='text-black font-semibold text-lg'>
                            Néxt
                        </p>
                    </PokeButton>
                </div>
            </div>
        </div>
    );
}

export default PokemonCardPage;