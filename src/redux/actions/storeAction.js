export function get_all_store(token) {
  return {
    type: "GET_ALL_STORE",
    route: `merchant?page=${1}`,
    method: "GET",
    token,
  };
}

export function get_favourite_store(token, cb) {
  return {
    type: "GET_FAVOURITE_STORE",
    route: "merchant/favorite",
    method: "GET",
    token,
    cb,
  };
}

export function search_store_list(key, token, cb) {
  return {
    type: "SEARCH_STORE_LIST",
    method: "GET",
    route: `merchant/search?key=${key}&page=1`,
    token,
    cb,
  };
}

export function sort_store_list(params, token, typeSort) {
  return {
    type: "SORT_STORE_LIST",
    method: "GET",
    route: `merchant/search?${params}`,
    token,
    typeSort,
  };
}

export function reset_search_list() {
  return {
    type: "SET_STORES_SEARCH",
    payload: [],
  };
}

export function pickup_store_special(store) {
  return {
    type: "PICKUP_STORE_SPECIAL",
    payload: store,
  };
}

export function getDetailMerchant(merchantId, token) {
  return {
    type: "GET_DETAIL_MERCHANT",
    method: "GET",
    route: `merchant/${merchantId}`,
    token,
  };
}

export function setDetailMerchant(merchantDetail) {
  return {
    type: "SET_DETAIL_MERCHANT",
    merchantDetail,
  };
}

export function updateFavouriteMerchant(body, token, valueSearch) {
  return {
    type: "UPDATE_FAVOURITE_MERCHANT",
    method: "POST",
    body,
    route: `userFavoriteMerchant/merchant`,
    token,
    valueSearch,
  };
}

export function getRatingMerchant(merchantId, page, token, cb) {
  return {
    type: "GET_RATING_MERCHANT",
    method: "GET",
    route: `rating/merchant/${merchantId}?page=${page}`,
    token,
    merchantId,
    page,
    cb,
  };
}

export function getSummaryMerchant(merchantId, token) {
  return {
    type: "GET_SUMMARY_MERCHANT",
    method: "GET",
    route: `rating/merchant/summary/${merchantId}`,
    token,
    merchantId,
  };
}

export function updateRatingMerchant(token, body, cb) {
  return {
    type: "UPDATE_RATING_MERCHANT",
    method: "POST",
    route: `rating/staff`,
    token,
    body,
    cb,
  };
}

export function contact(body, token, cb) {
  return {
    type: "CONTACT",
    method: "POST",
    route: `user/contactus`,
    token,
    body,
    cb,
  };
}

export function searchStore(
  keyword,
  typeSearch,
  sort,
  latitude,
  longitude,
  page,
  token,
  screen,
  cb,
) {
  return {
    type: "SEARCH_STORE",
    method: "GET",
    route: `merchant/search?key=${keyword}&type=${typeSearch}&sort=${sort}&latitude=${latitude}&longitude=${longitude}&page=${page}&api-version=2.0`,
    token,
    typeSearch,
    sort,
    screen,
    cb,
  };
}

export function searchStoreFavourite(
  keyword,
  typeSearch,
  sort,
  latitude,
  longitude,
  page,
  token,
  screen,
  cb,
) {
  return {
    type: "SEARCH_STORE_FAVOURITE",
    method: "GET",
    route: `merchant/search?key=${keyword}&type=${typeSearch}&sort=${sort}&latitude=${latitude}&longitude=${longitude}&page=${page}&api-version=2.0`,
    token,
    typeSearch,
    sort,
    screen,
    cb,
  };
}

export function searchStoreNear(
  keyword,
  typeSearch,
  sort,
  latitude,
  longitude,
  page,
  token,
  screen,
  cb,
) {
  return {
    type: "SEARCH_STORE_NEAR",
    method: "GET",
    route: `merchant/search?key=${keyword}&type=${typeSearch}&sort=${sort}&latitude=${latitude}&longitude=${longitude}&page=${page}&api-version=2.0`,
    token,
    typeSearch,
    sort,
    screen,
    cb,
  };
}

/* SCREEN MAP STORE */

export function selectStore(payload) {
  return {
    type: "SELECT_STORE",
    payload,
  };
}

export function onChangeStoreName(payload) {
  return {
    type: "ON_CHANGE_STORE_NAME",
    payload,
  };
}

export function setStoreNearSearch(payload) {
  return {
    type: "SET_STORE_NEAR_SEARCH",
    payload,
  };
}

export function setStoreFavouriteSearch(payload) {
  return {
    type: "SET_STORE_FAVOURITE_SEARCH",
    payload,
  };
}

export function onChangeFilterFavourite(payload) {
  return {
    type: "ON_CHANGE_FILTER_FAVOURITE",
    payload,
  };
}

export function onChangeFilterNear(payload) {
  return {
    type: "ON_CHANGE_FILTER_NEAR",
    payload,
  };
}

export function onChangeValueSearchStore(payload) {
  return {
    type: "ON_CHANGE_VALUE_SEARCH_STORE",
    payload,
  };
}

export function setValueSearchLocationTabNear(payload) {
  return {
    type: "SET_VALUE_SEARCH_LOCATION_TAB_NEAR",
    payload,
  };
}

export function getTopMerchant(token, latitude, longitude) {
  return {
    type: "GET_TOP_MERCHANT",
    route: `merchant/top?latitude=${latitude}&longitude=${longitude}`,
    method: "GET",
    token,
  };
}
