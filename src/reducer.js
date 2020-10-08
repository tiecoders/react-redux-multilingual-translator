export default function (
  state = {
    locale: null
  },
  action
) {
  switch (action.type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.locale
      };
    default:
      return state;
  }
}
