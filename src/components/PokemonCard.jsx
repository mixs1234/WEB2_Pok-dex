import React from 'react';
import { Link } from 'react-router-dom';
import { getPokemonTypeColor } from '../constants/typing_colors';

export function PokemonCard({ pokemon, isLoading = false, className = '' }) {
    // Fallback for loading or missing data
    if (isLoading || !pokemon) {
        return (
            <div className={`p-4 ${className} bg-gray-200 animate-pulse rounded-lg shadow-md`}>
                {/* Loading ID */}
                <span className="text-sm font-medium text-gray-500">
                    #---
                </span>
                {/* Loading Name */}
                <div className="h-6 w-3/4 bg-gray-300 rounded mt-2"></div>
                {/* Loading Sprite Placeholder */}
                <div className="flex justify-end mt-2">
                    <div className="w-16 h-16 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const { id, name, sprite, type } = pokemon;

    return (
        <Link to={`/pokemon/${id}`} className={`block ${className}`}>
            <div
                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${getPokemonTypeColor(type)}`}
            >
                {/* Pokémon ID */}
                <span className="text-sm font-medium text-gray-700">
                    #{id}
                </span>

                {/* Pokémon Name */}
                <h3 className="text-lg font-semibold text-gray-900 mt-2">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </h3>

                {/* Pokémon Sprite */}
                <div className="flex justify-end mt-2">
                    {sprite ? (
                        <img
                            src={sprite}
                            alt={name}
                            className="w-16 h-16 object-contain"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default PokemonCard;