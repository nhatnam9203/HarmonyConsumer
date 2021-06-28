const initialState = {
  cards: [],
  card_more: [],
  card_primary: {},
  card_reload: {},
  card_detail: {},
  loading_card_detail: false,
};
function cardReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CARDS":
      const card_primary = action.payload.find((item) => item.primaryCard == 1);
      const card_more = action.payload.filter((item) => item.primaryCard == 0);
      return {
        ...state,
        cards: action.payload,
        card_primary: card_primary ? card_primary : null,
        card_more: card_more,
      };

    case "SET_CARD_RELOAD":
      return {
        ...state,
        card_reload: action.payload,
      };

    case "SET_CARD_DETAIL":
      return {
        ...state,
        card_detail: action.payload,
      };

    case "START_LOADING_CARD_DETAIL":
      return {
        ...state,
        loading_card_detail: true,
      };

    case "STOP_LOADING_CARD_DETAIL":
      return {
        ...state,
        loading_card_detail: false,
      };
    default:
      return state;
  }
}
export default cardReducer;
