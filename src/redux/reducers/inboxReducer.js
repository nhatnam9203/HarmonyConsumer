const initialState = {
  notify: [],
  notify_today: [],
  notify_history: [],
  count: 0,
  count_today: 0,
  count_history: 0,
};

function dataLocalReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_NOTIFY_TODAY":
      return {
        ...state,
        notify_today: action.notify_today,
      };

    case "SET_NOTIFY_HISTORY":
      if (parseInt(action.page) !== 1) {
        return {
          ...state,
          notify_history: [...state.notify_history, ...action.notify_history],
        };
      } else {
        return {
          ...state,
          notify_history: action.notify_history,
        };
      }

    case "SET_COUNT_UNREAD":
      return {
        ...state,
        count: action.count,
      };

    case "UPDATE_NOTIFY": {
      return {
        ...state,
        notify_today: updateNotify(state.notify_today, action.payload),
        notify_history: updateNotify(state.notify_history, action.payload),
      };
    }

    default:
      return state;
  }
}

const updateNotify = (notify = [], ids) => {
  let arrTemp = notify;
  for (let i = 0; i < notify.length; i++) {
    if (arrTemp[i].notificationId === ids) {
      arrTemp[i].isView = 1;
    }
  }
  return arrTemp;
};
export default dataLocalReducer;
