const initialState = {
  category: [],
  tempCategory: [],
  services: [],
  products: [],
  extras: [],
  appointment_list_customer: [],
  groupAppointment: [],
  appointment_detail_customer: "",
  count_past: 0,
  count_upcoming: 0,
  loading_group_appt: false,
  isLoadingAppointmentDetail: false,
  appointmentUpcoming: [],
  appointmentPast: [],
};

function dataLocalReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        category: action.category,
        tempCategory: action.category,
      };
    case "GET_SERVICE_SUCCESS":
      return {
        ...state,
        services: action.services,
      };
    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        products: action.products,
      };
    case "GET_EXTRA_SUCCESS":
      return {
        ...state,
        extras: action.extras
          ? action.extras.filter((obj) => obj.isDisabled === 0 && obj.isDeleted === 0)
          : [],
      };
    case "GET_APPOINTMENT_BY_CUSTOMER_SUCCESS":
      return {
        ...state,
        appointment_list_customer: action.appointment_list_customer,
      };
    case "SET_APPOINTMENT_UPCOMING":
      return {
        ...state,
        appointmentUpcoming: action.payload,
        count_upcoming: action.payload.length,
      };

    case "SET_APPOINTMENT_PAST":
      if (parseInt(action.payload.page) !== 1) {
        return {
          ...state,
          appointmentPast: [...state.appointmentPast, ...action.payload.data],
          count_past: action.payload.count,
        };
      } else {
        return {
          ...state,
          appointmentPast: action.payload.data,
          count_past: action.payload.count,
        };
      }

    case "SET_APPOINTMENT_DETAIL":
      return {
        ...state,
        appointment_detail_customer: action.appointment,
      };

    case "SET_GROUP_APPOINTMENT":
      return {
        ...state,
        groupAppointment: action.payload,
      };

    case "SET_COUNT_TYPE":
      if (action._type === "upcoming") {
        return {
          ...state,
          count_upcoming: action.count,
        };
      } else
        return {
          ...state,
          count_past: action.count,
        };

    case "START_LOADING_GROUP_APPT":
      return {
        ...state,
        loading_group_appt: true,
      };

    case "STOP_LOADING_GROUP_APPT":
      return {
        ...state,
        loading_group_appt: false,
      };

    case "CHECK_EDIT":
      return {
        ...state,
        isCheckEdit: action.isCheckEdit,
      };

    default:
      return state;
  }
}
export default dataLocalReducer;
