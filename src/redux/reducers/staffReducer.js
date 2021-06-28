const initialState = {
  staff_by_merchant: [],
  staff_available_time: [],
  staff_favourites: [],
  staff_appointment: [],
};

function staffReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_STAFF_BY_MERCHANT":
      return {
        ...state,
        staff_by_merchant: action.staff_by_merchant,
      };
    case "SET_STAFF_AVAIABLE_TIME":
      return {
        ...state,
        staff_available_time: action.staff_available_time,
      };

    case "SET_STAFF_FAVOURITE":
      return {
        ...state,
        staff_favourites: action.payload,
      };

    case "SET_STAFF_APPOINTMENT":
      return {
        ...state,
        staff_appointment: action.payload,
      };
    default:
      return state;
  }
}
export default staffReducer;
