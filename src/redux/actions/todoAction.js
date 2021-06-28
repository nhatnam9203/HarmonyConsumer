export function increment() {
  return {
    type: "INCREMENT",
  };
}
export function fetch_film_list() {
  return {
    type: "FETCHING_FILM_LIST",
    route: "movies.json",
    method: "GET",
  };
}
