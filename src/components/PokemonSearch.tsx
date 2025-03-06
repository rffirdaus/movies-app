/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, PokemonResponse } from "../api/pokemon";

const Pokemon: React.FC = () => {
  const [query, setQuery] = useState("");
  // const navigate = useNavigate()
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<PokemonResponse>({
    queryKey: ["pokemon", query],
    queryFn: () => fetchPokemon(query),
    placeholderData: (previousData) => previousData,
  });

  const detailPokemon = (value:string) => {
    // navigate('<route here>')
    console.log(value, 'detail')
  }

  const pokemon = data?.pokemon ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4 text-gray-300 text-sm">
          <span>Showing {pokemon.length} results</span>
        </div>

        {isLoading && <p className="text-center text-gray-400">Loading...</p>}
        {error && (
          <p className="text-center text-red-400">Error fetching data.</p>
        )}

        <ul className="mt-4 divide-y divide-gray-500">
          {pokemon.map((item, i) => (
            <li
              key={i}
              className="p-4 hover:bg-blue-500 hover:bg-opacity-30 transition cursor-pointer rounded-lg flex justify-between items-center"
              onClick={() => detailPokemon(item.name)}
            >
              <div className="flex items-center">
                <p>{item.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pokemon;
