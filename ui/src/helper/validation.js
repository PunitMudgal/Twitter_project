import toast from "react-hot-toast";

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

export async function loginVerify(values) {
  const errors = passwordVerify({}, values);
  emailOrUsernameVerify(errors, values);
  return errors;
}

// * _________________________

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("username cannot contain space");
  } else if (values.username.length < 2 || values.username.length > 12) {
    error.username = toast.error("Undefined length!");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password Required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password cannot contain space!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password is too small");
  }
  return error;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  }
  return error;
}

const emailOrUsernameVerify = (error = {}, values) => {
  if (!values.emailOrUsername) {
    error.emailOrUsername = toast.error("Email or Username Required");
  } else if (values.emailOrUsername.includes(" ")) {
    error.emailOrUsername = toast.error("Username Cannot Contain Space");
  }
  return error;
};
