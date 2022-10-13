const initialState = {
  isPopupError: false,
  contentError: "",
  tips: {},
  isBottomTabbar: false,
  isPayComplete: false,
};

function dataLocalReducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_POPUP_ERROR":
      return {
        ...state,
        isPopupError: true,
        contentError: action.content,
      };

    case "HIDE_POPUP_ERROR":
      return initialState;

    case "SET_TIPS":
      return {
        ...state,
        tips: action.payload,
      };

    case "TOGGLE_BOTTOM_TABBAR":
      return {
        ...state,
        isBottomTabbar: action.payload,
      };
    case "SET_IS_PAY_COMPLETE":
      return {
        ...state,
        isPayComplete
      }
    default:
      return state;
  }
}
export default dataLocalReducer;
