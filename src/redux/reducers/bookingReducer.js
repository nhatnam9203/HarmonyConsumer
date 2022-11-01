import moment from 'moment';

const get_INITIAL_STATE = () => {
  return {
    services: [],
    products: [],
    extras: [],
    fromTime: moment(),
    notes: [],
    staffId: '',
    staffId_service: '',
    day: moment(),
    timePicker: '',
    isReschedule: false,
    isEditAppointment: false,
    isCheckEdit: false,
    status: 'unconfirm',
    isReview: false,
    isAddmore: false,
    noteValue: '',
    isCheckout: false,
    appointment: null,
  };
};

function dataLocalReducer(state = get_INITIAL_STATE(), action) {
  switch (action.type) {
    case 'ADD_SERVICE':
      return {
        ...state,
        services: action.payload,
      };

    case 'ADD_NOTE_VALUE':
      return {
        ...state,
        noteValue: action.payload,
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: action.payload,
      };

    case 'ADD_EXTRA':
      return {
        ...state,
        extras: action.payload,
      };

    case 'SELECT_TIME':
      return {
        ...state,
        timePicker: action.payload,
      };

    case 'SELECT_DAY':
      return {
        ...state,
        day: action.payload,
      };

    case 'SELECT_DATE':
      // if (state.services.length > 0) {
      //   let firstService = state.services[0];
      //   if (firstService) {
      //     firstService = Object.assign({}, firstService, {
      //       fromTime: action.payload,
      //     });
      //   }
      // }
      return {
        ...state,
        services: [...(state.services ?? [])]?.map((x, idx) =>
          idx === 0 ? Object.assign({}, x, { fromTime: action.payload }) : x,
        ),
        fromTime: action.payload,
      };

    case 'SELECT_STAFF':
      return {
        ...state,
        staffId: action.payload,
      };

    case 'SELECT_STAFF_SERVICE':
      return {
        ...state,
        staffId_service: action.payload,
      };

    case 'SELECT_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(
          obj => obj.serviceId !== action.service.serviceId,
        ),
        extras: !state.isEditAppointment
          ? state.extras.filter(
              obj => obj.serviceId !== action.service.serviceId,
            )
          : state.extras.filter(
              obj => obj.bookingServiceId !== action.service.bookingServiceId,
            ),
      };

    case 'DELETE_SERVICE_SUCCESS':
      return {
        ...state,
        services: state.services.filter(
          obj => obj.bookingServiceId !== action.service.bookingServiceId,
        ),
        extras: state.extras.filter(
          obj => obj.bookingServiceId !== action.service.bookingServiceId,
        ),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products.filter(
            obj => obj.productId != action.product.productId,
          ),
        ],
      };

    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: [
          ...state.products.filter(
            obj => obj.bookingProductId != action.product.bookingProductId,
          ),
        ],
      };

    case 'DELETE_EXTRA':
      return {
        ...state,
        extras: state.extras.filter(
          obj => obj.serviceId !== action.extra.serviceId,
        ),
      };

    case 'ADD_NOTE':
      return {
        ...state,
        notes: action.payload,
      };

    case 'UPDATE_QUANTITY_IN_CART':
      const cloneArr = [...(state.products ?? [])];
      const index = cloneArr.findIndex(
        pro => pro.productId === action.payload.productId,
      );
      if (index > -1) {
        cloneArr[index] = action.payload;
      }

      return {
        ...state,
        products: cloneArr,
      };

    case 'UPDATE_SERVICE':
      let arrServices = [...(state.services ?? [])];

      const svIndex = arrServices?.findIndex(
        obj => obj.serviceId === action.payload.serviceId,
      );

      if (svIndex > -1) {
        let temp = arrServices[svIndex];
        if (temp) {
          temp = Object.assign({}, temp, { staffId: action.payload?.staffId });
        }
        arrServices[svIndex] = temp;
      }

      return {
        ...state,
        services: arrServices,
      };

    case 'SET_RE_SCHEDULE':
      return {
        ...state,
        isReschedule: action.isReschedule,
      };

    case 'SET_REVIEW':
      return {
        ...state,
        isReview: action.isReview,
      };

    case 'SET_ADDMORE':
      return {
        ...state,
        isAddmore: action.isAddMore,
      };

    case 'SET_EDIT_APPOINTMENT':
      return {
        ...state,
        isEditAppointment: action.idEditAppointment,
      };

    case 'SET_CHANGE_BASKET':
      return {
        ...state,
        isChangeBasket: action.isChangeBasket,
      };

    case 'CHECK_EDIT':
      return {
        ...state,
        isCheckEdit: action.isCheckEdit,
      };
    case 'SET_CHECKOUT':
      return {
        ...state,
        isCheckout: action.payload,
      };

    case 'RESET_BOOKING':
      return get_INITIAL_STATE();

    case 'UPDATE_BOOKING_APPOINTMENT':
      return {
        ...state,
        appointment: action.payload,
      };

    default:
      return state;
  }
}
export default dataLocalReducer;
