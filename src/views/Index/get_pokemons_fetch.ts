import { get_pokemon_by_id_fetch, type GetPokemonByIdFetchRes } from "./get_pokemon_by_id_fetch";

export const get_pokemons_fetch = async ({
  limit,
}: { limit?: number } = {}): Promise<GetPokemonsFetchRes> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

  if (!res.ok) throw TypeError("Algo fue mal con get_pokemons_fetch");

  const pokemons = (await res.json()) as GetPokemonsFetchRes;

  const pokemon_details = await Promise.all(
    pokemons.results.map((result) => get_pokemon_by_id_fetch(Number(result.url.split("/").at(-2))))
  );

  const new_pokemons_results = pokemons.results.map((result) => {
    const result_detail = pokemon_details.find((pokemon) => pokemon.name === result.name);

    return { ...result, ...result_detail };
  });

  return { ...pokemons, results: new_pokemons_results };
};

export interface GetPokemonsFetchRes {
  count: number;
  next: string;
  previous: null;
  results: GetPokemonsResult[];
}

export interface GetPokemonsResult extends GetPokemonByIdFetchRes {
  url: string;
}
