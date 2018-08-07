import React from "react";
import isEmpty from "./is-empty";

const ValidateLogin = data => {
  let errors = {};
  errors.email = "";
  errors.password = "";
  errors.cPassword = "";
  console.log(errors);

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.cPassword = !isEmpty(data.cPassword) ? data.cPassword : "";

  if (data.email === "") {
    errors.email = "Email field is required";
  }

  if (
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      data.email
    ) === false
  ) {
    errors.email = "Email is invalid";
  }

  if (data.password === "") {
    errors.password = "password field is required";
  }

  if (/(?=.{8,})(?=.*[0-9])/.test(data.password) === false) {
    errors.password = "Password not correct format";
  }

  if (data.cPassword === "") {
    errors.cPassword = "password field is required";
  }

  if (data.cPassword !== data.password) {
    errors.cPassword = "passwords don't match";
  }
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default ValidateLogin;
