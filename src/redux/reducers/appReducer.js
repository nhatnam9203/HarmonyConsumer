const initialState = {
  loading_app: false,
};
function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_FETCH_API":
      return {
        ...state,
        loading_app: true,
      };
    case "STOP_FETCH_API":
      return {
        ...state,
        loading_app: false,
      };
    default:
      return state;
  }
}
export default appReducer;
