import React from "react";
import classnames from "classnames";
import ValidateLogin from "./ValidationLogin";

const LoginInput = ({
  type,
  id,
  name,
  value,
  onChange,
  icon,
  placeholder,
  error
}) => {
  return (
    <div className="input-group">
      <span className="input-group-prepend g-width-50 g-brd-secondary-light-v2 g-bg-secondary g-rounded-right-0">
        <div className="input-group-text justify-content-center w-100 g-bg-secondary g-brd-secondary-light-v2">
          <i className={icon} />
        </div>
      </span>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error !== "" && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default LoginInput;
