import type { GetPokemonByIdFetch } from "./types";

export const get_pokemon_by_id_fetch = async (id: number): Promise<GetPokemonByIdFetch> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) throw TypeError("Algo fue mal con get_pokemons_by_id_fetch");

  return await res.json();
};
