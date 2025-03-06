import axios from "axios";
// import { ReactNode } from "react";

// const API_KEY = "83d427c35928f3e8d5a5ae7a7e230ac0";
const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  name: string,
  url: string
}

export interface PokemonResponse {
  pokemon: Pokemon[];
}

export interface PokemonDetailResponse {
  detail: {}
}

export const fetchPokemon = async (
  query: string
): Promise<PokemonResponse> => {
  const url = `${BASE_URL}/pokemon?limit=50`
  const response = await axios.get(url, { params: {query} });

  return {
    pokemon: response.data.results,
  };
};

export const fetchDetail = async (
  query: string,
): Promise<PokemonDetailResponse> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`
  const response = await axios.get(url);

  return {
    detail: response.data.results,
  };
}
