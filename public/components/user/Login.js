import React from "react";
import { Link, withRouter } from "react-router-dom";
import { loginUser, thirdpartylogin } from "../../actions/UserActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserApi from "../../api/UserApi";
import LoginInput from "../../common/LoginInput";
import GoogleSignIn from "./GoogleSignIn";
import ReCAPTCHA from "react-google-recaptcha";
import LinkedInSignIn from "./LinkedInSignIn";
import FacebookLogin from "./FacebookLogin";
import ValidateLogin from "../../common/ValidationLogin";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cPassword: "",
      emailError: "",
      passwordError: "",
      cPasswordError: "",
      loginError: false,
      buttonClicked: false,
      recaptchaResponse: "",
      loginForm: true,
      captchaShow: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.isLoggedIn) {
      this.navigate();
    } else if (
      prevProps.user.loginSuccess !== false &&
      this.props.user.loginSuccess === false
    ) {
      this.setState((prevState, props) => ({
        ...this.state,
        loginError: true,
        buttonClicked: false
      }));
    }
  }

  navigate() {
    if (this.props.user.PersonID.length !== 0) {
      this.props.history.push("/profile");
    } else {
      this.props.history.push("/userinformation");
    }
  }

  handleChange(evt, response) {
    const name = evt.target.name;
    const val = evt.target.value;
    this.setState((prevState, props) => ({
      ...this.state,
      [name]: val,
      captchaShow: false
    }));
  }

  onChange(value) {
    this.setState((prevState, props) => ({
      ...this.state,
      recaptchaResponse: value
    }));
  }

  onSubmitLogin(evt) {
    evt.preventDefault();

    let result = ValidateLogin(this.state);

    this.setState((prevState, props) => ({
      ...this.state,
      emailError: result.errors.email,
      passwordError: result.errors.password
    }));
  }

  onSubmitRegister(evt) {
    evt.preventDefault();

    let result = ValidateLogin(this.state);

    this.setState((prevState, props) => ({
      ...this.state,
      emailError: result.errors.email,
      passwordError: result.errors.password,
      cPasswordError: result.errors.cPassword
    }));
  }

  callApi() {
    const {
      email,
      emailError,
      password,
      passwordError,
      recaptchaResponse,
      cPasswordError,
      loginForm
    } = this.state;

    // Login
    if (loginForm === true) {
      if (
        emailError === false &&
        passwordError === false &&
        recaptchaResponse !== ""
      ) {
        this.props.login({
          email: email,
          password: password,
          recaptchaResponse: recaptchaResponse
        });
      }
      // Register
    } else if (loginForm == false) {
      if (
        emailError === false &&
        passwordError === false &&
        cPasswordError === false &&
        recaptchaResponse !== ""
      ) {
        UserApi.Register(
          {
            email: email,
            password: password,
            recaptchaResponse: recaptchaResponse
          },
          this.props.history
        );
      }
    }
  }

  //   showLoginForm() {
  //     this.setState((prevState, props) => ({
  //       ...this.state,
  //       loginForm: true
  //     }));
  //     this.refreshForm();
  //   }

  //   showRegisterForm() {
  //     console.log("hi");
  //     this.setState((prevState, props) => ({
  //       ...this.state,
  //       loginForm: false
  //     }));
  //     this.refreshForm();
  //   }

  refreshForm() {
    this.setState({
      ...this.state,
      email: "",
      password: "",
      cPassword: "",
      emailError: false,
      passwordError: false,
      cPasswordError: false,
      loginError: false,
      captchaShow: true
    });
  }

  onGoogleSignIn(googleUser) {
    this.props.thirdparty(googleUser);
  }

  onFacebookSignin(fbUser) {
    this.props.thirdparty(fbUser);
  }

  render() {
    const {
      email,
      password,
      cPassword,
      emailError,
      passwordError,
      cPasswordError,
      loginError,
      loginForm,
      captchaShow
    } = this.state;

    const divStyle = {
      backgroundImage:
        "url(https://flpabf2.files.wordpress.com/2016/03/istock-538889218.jpg?w=2360&h=870&crop=1assets/include/svg/svg-bg2.svg)" // upload to AWS
    };

    return (
      <div className="g-bg-img-hero g-bg-pos-top-center" style={divStyle}>
        <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
          <div className="g-pos-rel">
            <div
              className="col-md-6 offset-3"
              style={{
                background: "rgba(0,0,0,0.5)",
                paddingTop: "15px",
                paddingBottom: "15px"
              }}
            >
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={() =>
                      this.setState(
                        (prevState, props) => ({
                          ...this.state,
                          loginForm: true
                        }),
                        this.refreshForm
                      )
                    }
                    style={{ color: "white" }}
                  >
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    onClick={() =>
                      this.setState(
                        (prevState, props) => ({
                          ...this.state,
                          loginForm: false
                        }),
                        this.refreshForm
                      )
                    }
                    style={{ color: "white" }}
                  >
                    Create Account
                  </a>
                </li>
              </ul>
              <form className=" rounded g-px-0 g-py-0">
                <p
                  style={{ background: "red", color: "white" }}
                  className="form-control-feedback"
                >
                  {loginError ? "Invalid Login" : ""}{" "}
                </p>
                <div id="signin">
                  <div className="g-mb-20">
                    <LoginInput
                      type="text"
                      id="email"
                      name="email"
                      icon="fa fa-user"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
                      error={emailError}
                    />
                    <br />
                  </div>
                  <div className="g-mb-20">
                    <LoginInput
                      type="password"
                      id="password"
                      name="password"
                      icon="fa fa-lock"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange}
                      error={passwordError}
                    />
                    <br />
                  </div>
                  {!loginForm ? (
                    <div className="g-mb-10">
                      <LoginInput
                        type="password"
                        id="cPassword"
                        name="cPassword"
                        icon="fa fa-lock"
                        placeholder="Confirm Password"
                        value={cPassword}
                        onChange={this.handleChange}
                        error={cPasswordError}
                      />
                    </div>
                  ) : null}
                  <div>
                    {!captchaShow && (
                      <ReCAPTCHA
                        ref="recaptcha"
                        sitekey="6Ld5VFsUAAAAAPqG-lnAhfOqf5pTSYl0PKEKJcPo"
                        onChange={this.onChange.bind(this)}
                      />
                    )}
                    <Link
                      style={{
                        fontWeight: "300",
                        fontSize: "15px",
                        color: "white"
                      }}
                      className=""
                      id="forgot-password-link"
                      to="/forgotpassword"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div style={{ paddingBottom: "10px" }}>
                    {loginForm ? (
                      <button
                        type="button"
                        className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7"
                        style={{ width: "100%" }}
                        onClick={this.onSubmitLogin}
                      >
                        Sign in
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7"
                        style={{ width: "100%" }}
                        onClick={this.onSubmitRegister}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </form>

              <div style={{ color: "white" }} className="hr-sect color">
                OR
              </div>

              <div style={{ paddingBottom: "10px" }}>
                {/* Third Party Login */}
                <div style={{ paddingBottom: "10px" }}>
                  <LinkedInSignIn />
                </div>
                <div style={{ paddingBottom: "10px" }}>
                  <GoogleSignIn
                    style={{ display: "inline-block" }}
                    clientId="450768390969-rc5n2m9miqvd9s4m7rlgcp8jepoefvpp"
                    onSuccess={this.onGoogleSignIn}
                    width="510"
                  />
                </div>
                <div style={{ paddingBottom: "10px" }}>
                  <FacebookLogin onSuccess={this.onFacebookSignin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  thirdparty: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      dispatch(loginUser(data));
    },
    thirdparty: data => {
      dispatch(thirdpartylogin(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
