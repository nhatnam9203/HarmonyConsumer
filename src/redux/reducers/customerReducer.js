const get_INITIAL_STATE = () => {
  return {
    rewardProfile: null,
    points_customer: [],
    points_customer_used: [],
    memberBenefits: [],
  };
};

function customerReducer(state = get_INITIAL_STATE(), action) {
  switch (action.type) {
    case "SET_REWARD_PROFILE":
      return {
        ...state,
        rewardProfile: action.payload,
      };

    case "SET_POINTS":
      if (parseInt(action.page) !== 1) {
        return {
          ...state,
          points_customer: [...state.points_customer, ...action.payload],
        };
      } else {
        return {
          ...state,
          points_customer: action.payload,
        };
      }

    case "SET_POINTS_USED":
      if (parseInt(action.page) !== 1) {
        return {
          ...state,
          points_customer_used: [...state.points_customer_used, ...action.payload],
        };
      } else {
        return {
          ...state,
          points_customer_used: action.payload,
        };
      }

    case "SET_MEMBER_BENEFIT":
      return {
        ...state,
        memberBenefits: action.payload,
      };

    default:
      return state;
  }
}
export default customerReducer;
