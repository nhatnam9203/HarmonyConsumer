const get_INITIAL_STATE = () => {
  return {
    isInbox: false,
    isBiometric: false,
    userHash: "",
    userInfoLogin: "",
  };
};

function authReducer(state = get_INITIAL_STATE(), action) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        userHash: action.userInfo.userHash,
        userInfoLogin: action.userInfo,
      };

    case "ON_CHANGE_INBOX":
      return {
        ...state,
        isInbox: action.payload,
      };

    case "SET_BIOMETRIC":
      return {
        ...state,
        isBiometric: action.status,
      };

    default:
      return state;
  }
}
export default authReducer;
