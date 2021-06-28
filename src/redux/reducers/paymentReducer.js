const initialState = {
  userRewardPointsSummary: {},
  loading_reward_point: false,
  isReCalculteTotal: false,
  reCalculteTotal: 0,
  invoice: {},
  transaction: [],
  filterType: "all",
};
function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_REWARD_POINT_SUMMARY_SUCCESS":
      return {
        ...state,
        userRewardPointsSummary: action.payload,
      };
    case "RE_CALULATE_TOTAL_SUCCESS":
      return {
        ...state,
        isReCalculteTotal: true,
        reCalculteTotal: action.payload,
      };
    case "RE_CALULATE_TOTAL_FAIL":
      return {
        ...state,
        isReCalculteTotal: false,
        reCalculteTotal: 0,
      };
    case "RESET_STATE_RE_CALCULTE_TOTAL":
      return {
        ...state,
        isReCalculteTotal: false,
        reCalculteTotal: 0,
      };

    case "SET_INVOICE":
      return {
        ...state,
        invoice: action.payload,
      };

    case "START_LOADING_REWARD_POINT":
      return {
        ...state,
        loading_reward_point: true,
      };

    case "STOP_LOADING_REWARD_POINT":
      return {
        ...state,
        loading_reward_point: false,
      };

    case "SET_TRANSACTION":
      if (action.page !== 1) {
        return {
          ...state,
          transaction: [...state.transaction, ...action.payload],
        };
      } else {
        return {
          ...state,
          transaction: action.payload,
        };
      }

    case "ON_CHANGE_FILTER_TYPE":
      return {
        ...state,
        filterType: action.filterType,
      };
    default:
      return state;
  }
}
export default paymentReducer;
