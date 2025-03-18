// pages/PokemonDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonTypeColor } from '../constants/typing_colors';
import { PokeButton } from '../components';

function PokemonDetailPage() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [species, setSpecies] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon details');
                const data = await response.json();

                // Fetch species data for flavor text and evolution info
                const speciesResponse = await fetch(data.species.url);
                if (!speciesResponse.ok) throw new Error('Failed to fetch species details');
                const speciesData = await speciesResponse.json();

                setPokemon({
                    id: data.id,
                    name: data.name,
                    sprite: data.sprites.front_default,
                    sprite_back: data.sprites.back_default,
                    shiny_sprite: data.sprites.front_shiny,
                    shiny_sprite_back: data.sprites.back_shiny,
                    types: data.types.map((t) => t.type.name),
                    height: data.height / 10,
                    weight: data.weight / 10,
                    abilities: data.abilities.map((a) => a.ability.name),
                    moves: data.moves.map((m) => m.move.name),
                    stats: data.stats.map((stat) => ({
                        name: stat.stat.name,
                        value: stat.base_stat,
                    })),
                    baseExperience: data.base_experience,
                });

                setSpecies({
                    flavorText: speciesData.flavor_text_entries.find(
                        (entry) => entry.language.name === 'en'
                    )?.flavor_text.replace(/\f/g, ' ') || 'No description available',
                    genus: speciesData.genera.find((g) => g.language.name === 'en')?.genus || 'Unknown',
                    evolutionChainUrl: speciesData.evolution_chain.url,
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
                    <div className="w-32 h-32 bg-gray-300 rounded-full animate-pulse mx-auto mb-4"></div>
                    <p className="text-xl font-bold text-gray-700">Loading PokéData...</p>
                </div>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <p className="text-xl font-bold text-gray-700">Pokémon not found</p>
                <Link to="/" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Back to Pokédex
                </Link>
            </div>
        );
    }

    // Get the primary type for background color
    const primaryType = pokemon.types[0];
    const backgroundClass = getPokemonTypeColor(primaryType);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Poké Ball Header */}
                <div className="relative w-full h-16 bg-red-600 rounded-t-full overflow-hidden mb-4">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-800"></div>
                    <div className="absolute inset-0 bg-white opacity-10"></div>
                </div>

                <div className={`bg-white p-6 rounded-lg shadow-lg ${backgroundClass} border-2 border-gray-800`}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#{pokemon.id})
                            </h1>
                            <p className="text-md text-gray-700">Types: {pokemon.types.join(' / ')}</p>
                        </div>
                        <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            className="w-40 h-40 object-contain transform hover:scale-110 transition-transform duration-300"
                        />
                        <img
                            src={pokemon.sprite_back}
                            alt={pokemon.name}
                            className="w-40 h-40 object-contain transform hover:scale-110 transition-transform duration-300"
                        />
                        <img
                            src={pokemon.shiny_sprite}
                            alt={pokemon.name}
                            className="w-40 h-40 object-contain transform hover:scale-110 transition-transform duration-300"
                        />
                        <img
                            src={pokemon.shiny_sprite_back}
                            alt={pokemon.name}
                            className="w-40 h-40 object-contain transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    {/* Stats and Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Vital Stats</h2>
                            <p className="text-gray-700">Height: {pokemon.height} m</p>
                            <p className="text-gray-700">Weight: {pokemon.weight} kg</p>
                            <p className="text-gray-700">Base EXP: {pokemon.baseExperience}</p>
                            <h3 className="text-lg font-semibold text-gray-800 mt-4">Abilities</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {pokemon.abilities.map((ability, index) => (
                                    <li key={index}>{ability}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Base Stats</h2>
                            <ul className="space-y-2">
                                {pokemon.stats.map((stat, index) => (
                                    <li key={index} className="text-gray-700">
                                        <span className="font-medium">{stat.name.replace('-', ' ').toUpperCase()}:</span> {stat.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Moves */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Moves </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            {pokemon.moves.map((move, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full hover:bg-gray-300 transition-colors"
                                >
                                    {move}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Flavor Text and Species */}
                    {species && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Pokédex Entry</h2>
                            <p className="text-gray-700 italic border-l-4 border-gray-800 pl-4">
                                {species.flavorText}
                            </p>
                            <p className="text-gray-700 mt-2">Genus: {species.genus}</p>
                            {/* Placeholder for evolution chain (requires separate fetch) */}
                            <p className="text-gray-700 mt-2">Evolution Chain: Coming Soon!</p>
                        </div>
                    )}

                    {/* Navigation */}
                    <Link to="/">
                        <div className="mt-8 flex justify-center">
                            <PokeButton bgColor="#ff7373" onClick={() => { }}>
                                <p className="text-white font-extrabold text-sm tracking-widest uppercase drop-shadow-lg 
                                                rounded-full border-4 bg-black p-1">
                                    Back
                                </p>
                            </PokeButton>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailPage;