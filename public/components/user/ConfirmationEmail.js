import React from "react";
import EmailConfirmationApi from "../../api/EmailConfirmationApi";
import ValidateLogin from "../../common/ValidationLogin";

class ConfirmationEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      emailValid: false,
      regThanks: true,
      confThanks: true,
      expiredToken: true,
      overlayEffect: true,
      backImg: true,
      resendButton: true,
      showConfirmedMsg: true,
      showLoginBtn: true,
      showEmailSent: true
    };
    this.confirmEmail = this.confirmEmail.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.confirmEmail_Success = this.confirmEmail_Success.bind(this);
    this.updateUser_Success = this.updateUser_Success.bind(this);
    this.confirmEmail_Error = this.confirmEmail_Error.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitResendLink = this.onSubmitResendLink.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmit_Success = this.onSubmit_Success.bind(this);
  }

  componentDidMount() {
    var checkId = window.location.search;
    checkId = checkId.replace("?id=", "");
    if (checkId) {
      //if GUID, then invoke confirmEmail passing GUID as argument
      this.confirmEmail(checkId);
    } else {
      //if direct path...
      this.setState({
        ...this.state,
        regThanks: false,
        overlayEffect: false,
        backImg: true
      });
    }
  }

  handleChange(evt) {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      ...this.state,
      [key]: val
    });
  }

  confirmEmail(checkId) {
    EmailConfirmationApi.SelectByAuthToken(
      checkId,
      this.confirmEmail_Success,
      this.confirmEmail_Error
    );
  }

  confirmEmail_Success(resp) {
    console.log(resp.data.item.userId);
    //change component
    this.setState({
      ...this.state,
      id: resp.data.item.userId,
      regThanks: true,
      confThanks: false,
      overlayEffect: false,
      backImg: false
    });
    // invoke updateUser axios call
    this.updateUser();
  }

  confirmEmail_Error(err) {
    console.log("Token Expired");
    if (performance.navigation.type === 1) {
      this.setState({
        ...this.state,
        expiredToken: false,
        overlayEffect: false,
        resendButton: true,
        backImg: false
      });
      this.props.history.push("/login");
    } else {
      this.setState({
        ...this.state,
        expiredToken: false,
        regThanks: true,
        overlayEffect: false,
        backImg: false,
        resendButton: false
      });
    }
  }

  updateUser() {
    EmailConfirmationApi.Update(
      {
        ...this.state
      },
      this.updateUser_Success
    );
  }

  updateUser_Success(resp) {
    console.log("Update isConfirmed successful");
    EmailConfirmationApi.Delete(this.state.id, this.deleteToken_Success);
  }

  deleteToken_Success(resp) {
    console.log("Delete Successful");
    console.log(this.state.id);
  }

  onSubmitLogin() {
    this.props.history.push("/login");
  }

  onSubmitResendLink() {
    const { email } = this.state;

    // validate email
    let result = ValidateLogin(email);

    if (result.errors.email !== "Email is invalid") {
      EmailConfirmationApi.SelectByEmail(
        {
          email: email
        },
        this.onSubmit_Success
      );
      this.setState({
        ...this.state,
        resendButton: true,
        overlayEffect: true
      });
    }
  }

  onSubmit_Success(resp) {
    this.setState({
      ...this.state,
      id: resp.data.item.id,
      email: resp.data.item.email,
      overlayEffect: false,
      showEmailSent: false
    });
    if (resp.data.item.isConfirmed === true) {
      // if user is already confirmed..
      this.setState({
        ...this.state,
        resendButton: true,
        showConfirmedMsg: false,
        showLoginBtn: false,
        showEmailSent: true,
        overlayEffect: false
      });
    }
  }

  render() {
    const styles = {
      divStyle: {
        backgroundImage: "url(assets/include/svg/svg-bg2.svg)",
        height: "550px",
        marginBottom: "0px",
        zIndex: "-1"
      },

      imgStyle: {
        float: "right",
        width: "10%",
        borderRadius: "4px"
      },

      loaderStyle: {
        position: "fixed",
        Zindex: "999",
        overflow: "show",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        margin: "auto",
        border: "16px solid #f3f3f3",
        borderTop: "16px solid #800000",
        borderRadius: "50%",
        width: "120px",
        height: "120px",
        animation: "spin .7s linear infinite"
      },

      overlayStyle: {
        background: "black",
        opacity: ".5",
        position: "fixed",
        zIndex: "10",
        top: "0px",
        left: "0",
        width: "100%",
        height: "100%"
      },

      container: {
        paddingTop: "10px",
        marginBottom: "10px",
        height: "200px"
      },

      button: {
        boxShadow: `2px 3px 2px 2px #9E9E9E`
      },

      mainText: {
        fontSize: "40px",
        fontWeight: "500",
        letterSpacing: "1px",
        paddingTop: "25px",
        paddingBottom: "10px",
        marginBottom: "10px",
        display: "block",
        background: "white",
        position: "relative",
        animation: "emailText 3s 1",
        zIndex: "1",
        textShadow: `2px 3px 2px #9E9E9E`
      },

      subText: {
        display: "block",
        fontSize: "18px",
        align: "center",
        fontWeight: "500"
      },

      emailMsgText: {
        fontSize: "40px",
        fontWeight: "500",
        letterSpacing: "1px",
        paddingTop: "25px",
        paddingBottom: "10px",
        marginBottom: "10px",
        display: "block",
        background: "white",
        position: "relative",
        zIndex: "1",
        textShadow: `1px 2px 1px #9E9E9E`
      },

      input: {
        position: "relative",
        display: "inline-block",
        fontSize: "20px",
        boxSizing: "border-box"
      },

      inputText: {
        background: "#A9A9A9",
        color: "white",
        width: "340px",
        height: "50px",
        border: "none",
        outline: "none",
        padding: "0 25px",
        borderRadius: "25px 0 0 25px"
      },

      inputBTN: {
        position: "relattive",
        borderRadius: "0 25px 25px 0",
        width: "150px",
        height: "50px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        background: "red",
        color: "#fff"
      }
    };

    const checkmark = {
      circle: {
        strokeDasharray: 166,
        strokeDashoffset: 166,
        strokeWidth: 2,
        strokeMiterlimit: 10,
        stroke: "#7ac142",
        fill: "none",
        animation: "stroke 0.6s cubic-bezier(1, 0, 1, 1) forwards"
      },

      checkmark: {
        width: "156px",
        height: "156px",
        borderRadius: "50%",
        display: "block",
        strokeWidth: 2,
        stroke: "#000",
        strokeMiterlimit: 10,
        margin: "10% auto",
        marginBottom: "2%",
        boxShadow: "inset 0px 0px 0px #7ac142",
        animation:
          "fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both",
        marginTop: "0px"
      },

      check: {
        transformOrigin: "50% 50%",
        strokeDasharray: 48,
        strokeDashoffset: 48,
        animation: "stroke 0.3s cubic-bezier(1, 0, 1, 1) 0.8s forwards"
      }
    };

    return (
      <div>
        {this.state.overlayEffect ? (
          <div style={styles.overlayStyle}>
            <div className="loader" style={styles.loaderStyle} />
          </div>
        ) : null}
        <div className="container g-pt-20 g-pb-20">
          {/* <!-- Thanks for Registering --> */}
          {!this.state.regThanks && (
            <div
              className="g-max-width-5000 text-center mx-auto g-mb-40"
              style={styles.container}
            >
              <span className="mb-4" style={styles.mainText}>
                Thanks for Registering!
              </span>
              <span style={styles.subText}>
                An email has been sent to you.
                <br />
                Please confirm your email.
              </span>
            </div>
          )}
          {/* <!-- Thanks for Confirming Email --> */}
          {!this.state.confThanks && (
            <div
              className="g-max-width-5000 text-center mx-auto g-mb-40"
              style={styles.container}
            >
              <svg style={checkmark.checkmark} viewBox="0 0 52 52">
                <circle
                  style={checkmark.circle}
                  fill="none"
                  cx="26"
                  cy="26"
                  r="25"
                />
                <path
                  style={checkmark.check}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
              <span className="mb-4" style={styles.mainText}>
                <span
                  style={{
                    color: "#a61d37"
                  }}
                >
                  Thanks
                </span>
                for Confirming Email!
              </span>
              <button
                type="button"
                className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-rounded-30 g-px-35 g-py-10"
                data-toggle="modal"
                data-target=".logIn"
                style={styles.button}
              >
                Click here for login
              </button>
            </div>
          )}
          {/* <!-- Heading --> */}
          {!this.state.expiredToken && (
            <div
              className="g-max-width-5000 text-center mx-auto g-mb-40"
              style={styles.container}
            >
              {!this.state.resendButton && (
                <div>
                  <span className="mb-4" style={styles.mainText}>
                    <span
                      style={{
                        color: "#a61d37"
                      }}
                    >
                      Sorry
                    </span>. Link has Expired!
                  </span>
                  <div style={styles.input}>
                    <input
                      style={styles.inputText}
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Insert Email"
                    />
                    <button
                      type="button"
                      onClick={this.onSubmitResendLink}
                      style={styles.inputBTN}
                    >
                      Resend
                    </button>
                  </div>
                </div>
              )}
              {!this.state.showEmailSent && (
                <span className="mb-4" style={styles.emailMsgText}>
                  {" "}
                  <span
                    style={{
                      color: "#a61d37"
                    }}
                  >
                    Email
                  </span>
                  Confirmation has Sent!
                </span>
              )}
              {!this.state.showConfirmedMsg && (
                <span className="mb-4" style={styles.emailMsgText}>
                  {" "}
                  You are already confirmed! Click to{" "}
                  <span
                    style={{
                      color: "#a61d37"
                    }}
                  >
                    Login
                  </span>.
                </span>
              )}
              {!this.state.showLoginBtn && (
                <button
                  type="button"
                  className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-rounded-30 g-px-35 g-py-10"
                  data-toggle="modal"
                  data-target=".logIn"
                  style={styles.button}
                >
                  Click here for login
                </button>
              )}
              <small className="form-control-feedback">
                {" "}
                {this.state.emailError
                  ? "Email address entered is invalid."
                  : ""}{" "}
              </small>
            </div>
          )}
          {/* <!-- End Heading --> */}
        </div>
        {!this.state.backImg && (
          <div
            className="g-bg-img-hero g-bg-pos-bottom-center"
            style={styles.divStyle}
          />
        )}

        {/* Modal */}
        <div
          className="modal fade logIn"
          role="dialog"
          data-backdrop="false"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)"
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body alert alert-danger alert-dismissible fade show">
                <div role="alert">
                  <h3>
                    <strong>Attention!</strong>
                    You will have limited access until you complete profile
                    creation.
                  </h3>
                </div>
              </div>
              <div
                style={{
                  height: "55px"
                }}
              >
                <button
                  type="button"
                  className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-px-35 g-py-10"
                  onClick={this.onSubmitLogin}
                  style={styles.button}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConfirmationEmail;
