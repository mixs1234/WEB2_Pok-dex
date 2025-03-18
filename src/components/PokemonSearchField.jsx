import React from "react";

export function PokemonSearchField({ className }) {
    return (
        <div className={`p-4 ${className}`}>
            <p className="text-lg font-bold text-gray-800">
                Search for Pokémon by id or name
            </p>
            <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter Pokémon id or name"
            />
        </div>
    );
}