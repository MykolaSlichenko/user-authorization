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
  const id = 'test'; // fix
  const userObject = { id, ...user };

  dbData.users.push(userObject);
  dbData.token = id;
  saveDbData(dbData);
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

export const loginUser = (email, password, userData) => {
  const dbData = getDbData();
  const dbUsers = dbData.users;
  const isPresent = dbUsers.find(user => user.email === email && user.password === password);

  if (isPresent) {
    dbUsers.token = isPresent.id;
    saveUserToDb(userData);
    return { success: true };
  }

  return { success: false, message: 'Wrong email/password combination.' };
};

export const logoutUser = () => {
  // remove token from local storage
  const dbData = getDbData();
  const dbUsers = dbData.users;
  dbUsers.token = null;
  return {success: true}
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