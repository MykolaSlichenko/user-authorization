export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateSignupForm = (userData) => {
  const err = {};

  if (!userData.firstName.trim().length) {
    err.firstName = true;
  }

  if (!userData.lastName.trim().length) {
    err.lastName = true;
  }

  if (!userData.email.toLowerCase().match(EMAIL_REGEX)) {
    err.email = true;
  }

  if (!userData.password.length) {
    err.password = true;
  }

  if (!userData.confirmPassword.trim().length || userData.password !== userData.confirmPassword) {
    err.confirmPassword = true;
  }

  return err;
};

export const validateLoginForm = (userData) => {
  const err = {};

  if (!userData.email.toLowerCase().match(EMAIL_REGEX)) {
    err.email = true;
  }

  if (!userData.password.length) {
    err.password = true;
  }

  return err;
};