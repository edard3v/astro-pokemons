export const ROUTER = {
  pokemons: {
    href: (id: number) => (id == 1 ? "/" : `/${id}`),
    display: "Pokemons",
  },

  pokemon: {
    href: (name: string) => `/${name}`,
    display: "Pokemon",
  },

  favoritos: {
    href: "/favoritos/",
    display: "Favoritos",
  },
};
