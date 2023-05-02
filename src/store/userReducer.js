const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  id: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, ...action.payload };
    case 'UPDATE_USER_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};

export default userReducer;

// const defaultState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
//   id: '',
// };
//
// export const userReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "ADD_USER":
//       return {...state, firstName: action.payload};
//     default:
//       return state
//   }
// };