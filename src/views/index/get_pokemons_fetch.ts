export const get_pokemons_fetch = async (): Promise<GetPokemonsFetch> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");

  if (!res.ok) throw TypeError("Algo fue mal con get_pokemons_fetch");

  return await res.json();
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
}
