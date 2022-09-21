const initialState = {
  isPopupError: false,
  contentError: '',
  tips: {},
  isBottomTabbar: false,
  showReviewForm: null,
};

function dataLocalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_POPUP_ERROR':
      return {
        ...state,
        isPopupError: true,
        contentError: action.content,
      };

    case 'HIDE_POPUP_ERROR':
      return initialState;

    case 'SET_TIPS':
      return {
        ...state,
        tips: action.payload,
      };

    case 'TOGGLE_BOTTOM_TABBAR':
      return {
        ...state,
        isBottomTabbar: action.payload,
      };

    case 'VISIBLE_REVIEW_FORM':
      return {
        ...state,
        showReviewForm: action.payload,
      };
    default:
      return state;
  }
}
export default dataLocalReducer;
