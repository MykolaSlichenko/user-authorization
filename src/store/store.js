import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;

// import { createStore } from 'redux';
//
// const initialState = {
//   userData: {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     id: '',
//   },
// };
//
// function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'SET_USER_DATA':
//       return { ...state, userData: action.payload };
//     default:
//       return state;
//   }
// }
//
// const store = createStore(rootReducer);
//
// export default store;


// import { createStore } from 'redux';
// import { userReducer } from './userReducer';
//
// export const store = createStore(userReducer);
