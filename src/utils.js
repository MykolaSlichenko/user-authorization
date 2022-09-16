export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateForm = (formData) => {
  const err = {};

  if (!formData.firstName.trim().length) {
    err.firstName = true;
  }

  if (!formData.lastName.trim().length) {
    err.lastName = true;
  }

  if (!formData.email.toLowerCase().match(EMAIL_REGEX)) {
    err.email = true;
  }

  if (!formData.password.length) {
    err.password = true;
  }

  if (!formData.confirmPassword.trim().length || formData.password !== formData.confirmPassword) {
    err.confirmPassword = true;
  }

  return err;
};