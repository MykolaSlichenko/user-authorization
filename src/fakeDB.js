import React from 'react';

const LOCAL_STORAGE_KEY = 'FAKE_DB';

const getDbData = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch (e) {
    return null;
  }
};

const saveDbData = (data) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

const saveUserToDb = (user) => {
  const dbData = getDbData();
  const id = Date.now();
  const userObject = { id, ...user };
  dbData.users.push(userObject);
  dbData.token = id;
  saveDbData(dbData);
};

export const deleteUserFromDb = (user) => {
  const dbData = getDbData();
  const userId = user.id;
  // Find the index of the user in the users array
  const userIndex = dbData.users.findIndex(u => u.id === userId);
  console.log('userIndex', userIndex);

  if (userIndex >= 0) {
    // Remove the user from the users array
    dbData.users.splice(userIndex, 1);
    dbData.token = null;
    // Save the updated dbData object to local storage
    saveDbData(dbData);
    return { success: true };
  }
  return { success: false, message: 'User not found' };
};

export const registerUser = (userData) => {
  const userEmail = userData.email;
  const dbData = getDbData();
  const dbUsers = dbData.users;
  const isPresent = dbUsers.find(user => user.email === userEmail);

  if (isPresent) {
    return { success: false, message: 'user with such name already exists' };
  }

  saveUserToDb(userData);
  return { success: true };
};

export const loginUser = (userData) => {
  const userEmail = userData.email;
  const userPassword = userData.password;
  const dbData = getDbData();
  const dbUsers = dbData.users;
  const isPresent = dbUsers.find(user => user.email === userEmail && user.password === userPassword);

  if (isPresent) {
    dbData.token = isPresent.id;
    saveDbData(dbData);
    return { success: true };
  }

  return { success: false, message: 'Wrong email/password combination.' };
};

export const getUser = () => {
  const dbData = getDbData();
  const token = dbData.token;
  const users = dbData.users;
  const user = users.find(user => user.id === token);
  return user;
};

export const saveUserUpdateToDb = (userId, userData) => {
  // console.log(userId, userData);
  const dbData = getDbData();

  const index = dbData.users.findIndex(user => user.id === userId);

  if (index < 0) {
    throw 'Not find such user';
  }

  dbData.users[index] = userData;

  saveDbData(dbData);
  return { success: true };

  // saveUpdatedUserToDb(userData);
  // return { success: true };
};

export const logoutUser = () => {
  // remove token from local storage
  const dbData = getDbData();
  dbData.token = null;
  saveDbData(dbData);
  return {success: true}
};

export const checkIfUserLogged = () => {
  const dbData = getDbData();
  if (dbData === null) return;
  return !!dbData.token;
};

export const initDatabase = () => {
  const existedLocalStorageData = getDbData();

  if (!existedLocalStorageData) {
    const dataStructure = {
      users: [],
      token: null,
    };
    saveDbData(dataStructure);
  }
};