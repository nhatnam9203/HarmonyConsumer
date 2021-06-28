import * as RootNavigation from "navigations/RootNavigation";

const get_INITIAL_STATE = () => {
  return {
    token: "",
    userInfo: "",
    password: "",
    placeholders: [{}, {}, {}, {}, {}],
    current_location: {
      formatted_address:
        "18/2/7 Đường Hồ Chí Ming, 266 Đường Bùi Minh Trực, Phường 6, Quận 8, Thành phố Hồ Chí Minh, Việt Nam",
      location: {
        lat: "10.7376555",
        lng: "106.6553227",
      },
    },
    location_tab_store: {
      formatted_address:
        "18/2/7 Đường Hồ Chí Ming, 266 Đường Bùi Minh Trực, Phường 6, Quận 8, Thành phố Hồ Chí Minh, Việt Nam",
      location: {
        lat: "10.7376555",
        lng: "106.6553227",
      },
    },
    isSaveTocall: false,
    typeCall: "",
  };
};

function dataLocalReducer(state = get_INITIAL_STATE(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
      };

    case "QUICK_LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token,
        userInfo: {
          ...action.userInfo,
          userHash: state.userInfo.userHash,
        },
      };

    case "SET_BIOMETRIC":
      return {
        ...state,
        isBiometric: action.status,
      };

    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        current_location: action.payload,
      };

    case "SET_LOCATION_TAB_STORE":
      return {
        ...state,
        location_tab_store: action.payload,
      };

    case "UPDATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        userInfo: {
          ...action.payload,
          userHash: state.userInfo.userHash,
        },
      };

    case "SAVE_TO_CALL":
      return {
        ...state,
        isSaveTocall: true,
        typeCall: action.payload.callType,
      };

    case "ON_CHANGE_INBOX":
      return {
        ...state,
        isInbox: action.payload,
      };

    case "LOGOUT":
      RootNavigation.navigate("Auth", { screen: "PhoneVerify", params: { isLogout: true } });
      return get_INITIAL_STATE();
    default:
      return state;
  }
}
export default dataLocalReducer;
