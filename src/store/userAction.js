export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData,
});

export const updateUserField = (field, value) => ({
  type: 'UPDATE_USER_FIELD',
  payload: { field, value },
});