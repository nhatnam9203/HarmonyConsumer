const initialState = {
  loading_card: false,
  banks: [],
  credits: [],
  detail_card: {},
  first_card: false,
};
function creditAndBankReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CREDITS":
      return {
        ...state,
        credits: action.payload,
      };

    case "SET_BANKS":
      return {
        ...state,
        banks: action.payload,
      };

    case "SET_DETAIL_CARD":
      return {
        ...state,
        detail_card: action.payload,
      };

    case "IS_FIRST_CARD":
      return {
        ...state,
        first_card: action.payload,
      };

    case "START_LOADING_CARD":
      return {
        ...state,
        loading_card: true,
      };
    case "STOP_LOADING_CARD":
      return {
        ...state,
        loading_card: false,
      };
    default:
      return state;
  }
}
export default creditAndBankReducer;
