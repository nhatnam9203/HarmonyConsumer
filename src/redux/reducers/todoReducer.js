const initialState = {
  count: 0,
  films: [],
  error: "",
};
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "FETCHING_FILMS_SUCCESS":
      return {
        ...state,
        films: [...action.payload],
      };
    case "FETCHING_FILMS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default todoReducer;
