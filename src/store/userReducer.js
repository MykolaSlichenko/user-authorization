const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  id: '',
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {...state, firstName: action.payload};
    default:
      return state
  }
};