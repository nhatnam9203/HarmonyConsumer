const initialState = {
  stores_search: [],
  loading_search: false,
  loading_store: true,
  maxPage: 1,
  store_special: {},
  store_tab_home: [],
  store_tab_near: [],
  store_top: [],
  favourite_stores: [],
  favourite_store_setting: [],
  storeSearch: [],

  filter_favourite_store: "rated",
  filter_near_store: "rated",
  valueSearchStore: "",

  all_stores: [],
  merchant_detail: "",
  rating_merchant_detail: [],
  summary_merchant_detail: "",
  mapStore: {
    storeName: "",
    storeSelected: "",
  },
  valueSearchLocationTabNear: "",
};
function storeReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_STORES_SEARCH":
      return {
        ...state,
        stores_search: action.payload,
      };

    case "SET_STORES_FAVOURITE":
      return {
        ...state,
        favourite_stores: action.payload,
      };

    case "SET_FAVOURITE_STORE_LIST":
      return {
        ...state,
        favourite_store_setting: action.payload,
      };

    case "SET_ALL_STORE":
      return {
        ...state,
        all_stores: action.payload,
      };

    case "PICKUP_STORE_SPECIAL":
      return {
        ...state,
        store_special: action.payload,
      };

    case "START_LOADING_SEARCH":
      return {
        ...state,
        loading_search: true,
      };

    case "STOP_LOADING_SEARCH":
      return {
        ...state,
        loading_search: false,
      };

    case "START_LOADING_STORE":
      return {
        ...state,
        loading_store: true,
      };

    case "STOP_LOADING_STORE":
      return {
        ...state,
        loading_store: false,
      };

    case "SET_VALUE_SEARCH_LOCATION_TAB_NEAR":
      return {
        ...state,
        valueSearchLocationTabNear: action.payload,
      };

    case "SET_DETAIL_MERCHANT":
      return {
        ...state,
        merchant_detail: action.merchantDetail,
      };

    case "SET_RATING":
      if (parseInt(action.page) !== 1) {
        return {
          ...state,
          rating_merchant_detail: [...state.rating_merchant_detail, ...action.payload],
        };
      } else {
        return {
          ...state,
          rating_merchant_detail: action.payload,
          maxPage: action.maxPage,
        };
      }

    case "SET_SUMMARY":
      return {
        ...state,
        summary_merchant_detail: action.payload,
      };

    case "SET_STORES_NEAR":
      return {
        ...state,
        store_tab_near: action.payload,
      };

    case "SET_STORES_TAB_HOME":
      return {
        ...state,
        store_tab_home: action.payload,
      };

    case "SELECT_STORE":
      return {
        ...state,
        storeSelected: action.payload,
        storeName: action.payload.businessName,
      };

    case "ON_CHANGE_STORE_NAME":
      return {
        ...state,
        storeName: action.payload,
      };

    case "UPDATE_FAVOURITE_MERCHANT_SUCCESS":
      const merchantId = action.payload;
      return {
        ...state,
        store_tab_near: updateStoreFavourite(state.store_tab_near, action.payload),
        storeSearch: updateStoreFavourite(state.storeSearch, merchantId),
        favourite_stores: updateStoreFavourite(state.favourite_stores, merchantId),
      };

    case "SET_STORE_SEARCH":
      return {
        ...state,
        storeSearch: action.payload,
      };

    case "ON_CHANGE_FILTER_FAVOURITE":
      return {
        ...state,
        filter_favourite_store: action.payload,
      };

    case "ON_CHANGE_FILTER_NEAR":
      return {
        ...state,
        filter_near_store: action.payload,
      };

    case "ON_CHANGE_VALUE_SEARCH_STORE":
      return {
        ...state,
        valueSearchStore: action.payload,
      };

    case "SET_TOP_MERCHANT":
      return {
        ...state,
        store_top: action.payload,
      };

    default:
      return state;
  }
}

const updateStoreFavourite = (stores = [], merchantId) => {
  let arrTemp = stores;
  for (let i = 0; i < stores.length; i++) {
    if (arrTemp[i].merchantId === merchantId) {
      arrTemp[i].isFavorited = arrTemp[i].isFavorited === 0 ? 1 : 0;
    }
  }
  return arrTemp;
};

export default storeReducer;
