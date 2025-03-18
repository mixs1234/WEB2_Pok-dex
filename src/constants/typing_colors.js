const pokemonTypeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-teal-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-700',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-800',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-300',
    fairy: 'bg-pink-300',
};

export const getPokemonTypeColor = (type) => {

    const normalizedType = type?.toLowerCase() || 'normal';
    return pokemonTypeColors[normalizedType] || pokemonTypeColors.normal;
};

export default pokemonTypeColors;