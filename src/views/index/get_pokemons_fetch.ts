import { get_pokemon_by_id_fetch } from "./get_pokemon_by_id_fetch";

export const get_pokemons_fetch = async (): Promise<GetPokemonsFetch> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");

  if (!res.ok) throw TypeError("Algo fue mal con get_pokemons_fetch");

  const pokemons = (await res.json()) as GetPokemonsFetch;

  const pokemon_details = await Promise.all(
    pokemons.results.map((result) => get_pokemon_by_id_fetch(Number(result.url.split("/").at(-2))))
  );

  const new_pokemons_results = pokemons.results.map((result) => {
    const result_detail = pokemon_details.find((pokemon) => pokemon.name === result.name);
    const img = result_detail?.sprites.other?.showdown.front_default;

    return { ...result, img };
  });

  return { ...pokemons, results: new_pokemons_results };
};

export interface GetPokemonsFetch {
  count: number;
  next: string;
  previous: null;
  results: GetPokemonsResult[];
}

export interface GetPokemonsResult {
  name: string;
  url: string;
  img?: string;
}
