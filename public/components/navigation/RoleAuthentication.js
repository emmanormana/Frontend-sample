import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const RequiredRole = ({
  component: Component,
  auth,
  requiredRole,
  ...rest
}) => {
  // Check to see if isLoggedIn
  // If it is then load component
  // else redirect to login page

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn === true && auth.roles.includes(requiredRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

RequiredRole.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.UserReducer
});

export default connect(mapStateToProps)(RequiredRole);
