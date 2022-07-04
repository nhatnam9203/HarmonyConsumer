import { replaceAll } from 'utils';
const initialState = {
  loading_template: {},
  templates: {},
  gift_send: {},
  contacts: [],
  result_filter: [],
  sender: {},
};
function buygiftReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TEMPLATES':
      const { typeGift, data } = action.payload;
      let _data = [...data];
      if (typeGift == 'User Template') {
        _data.unshift({
          giftCardType: 'Add New Card',
        });
      }
      return {
        ...state,
        templates: Object.assign({}, state.templates, { [typeGift]: _data }),
      };
    case 'START_LOADING_TEMPLATE':
      return {
        ...state,
        loading_template: { ...state.loading_template, [action.payload]: true },
      };
    case 'STOP_LOADING_TEMPLATE':
      return {
        ...state,
        loading_template: {
          ...state.loading_template,
          [action.payload]: false,
        },
      };

    case 'SET_GIFT_SEND':
      return {
        ...state,
        gift_send: action.payload,
      };

    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
        result_filter: action.payload,
      };
    case 'SET_SENDER':
      return {
        ...state,
        sender: action.payload,
      };

    case 'FILTER_CONTACTS':
      const keyWord = action.payload;
      let _contacts = [...state.contacts];

      let query = contact => {
        const { fullName, phone, firstName } = contact;
        if (
          fullName &&
          fullName.toLowerCase().indexOf(keyWord.toLowerCase()) > -1
        ) {
          return fullName.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
        } else if (replaceAll(phone, '-', '').indexOf(keyWord) > -1) {
          return replaceAll(phone, '-', '').indexOf(keyWord) > -1;
        } else {
          return firstName.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
        }
      };

      return {
        ...state,
        result_filter:
          keyWord != ''
            ? _contacts.filter(contact => query(contact))
            : _contacts,
      };

    default:
      return state;
  }
}
export default buygiftReducer;
