import React from "react";
import "../../../node_modules/bootstrap-social";

class GoogleSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      disabled: true
    };
  }

  componentDidMount = () => {
    const {
      clientId,
      cookiePolicy,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      onFailure,
      uxMode,
      scope,
      accessType,
      jsSrc
    } = this.props;

    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = jsSrc;
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      } else {
        d.head.appendChild(js);
      }
      js.onload = cb;
    })(document, "script", "google-login", () => {
      const params = {
        client_id: clientId,
        cookie_policy: cookiePolicy,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
        access_type: accessType
      };
      window.gapi.load("auth2", () => {
        this.enableButton();
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init().then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get());
              }
            },
            err => onFailure(err)
          );
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
  };

  enableButton() {
    this.setState({
      disabled: false
    });
  }

  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const {
        onSuccess,
        onRequest,
        onFailure,
        prompt,
        responseType
      } = this.props;
      const options = {
        prompt
      };
      onRequest();
      if (responseType === "code") {
        auth2
          .grantOfflineAccess(options)
          .then(res => onSuccess(res), err => onFailure(err));
      } else {
        auth2
          .signIn(options)
          .then(res => this.handleSigninSuccess(res), err => onFailure(err));
      }
    }
  }
  handleSigninSuccess(res) {
    /*
          offer renamed response keys to names that match use
        */
    console.log("Google Resp:", res);
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();
    let googleUser = {};
    googleUser.AccountId = basicProfile.getId();
    //googleUser.tokenObj = authResponse;
    //googleUser.id_token = authResponse.id_token;
    //googleUser.accessToken = authResponse.access_token;
    googleUser.Password = basicProfile.getId();
    googleUser.location = basicProfile.getImageUrl();
    googleUser.email = basicProfile.getEmail();
    //googleUser.name = basicProfile.getName();
    googleUser.FirstName = basicProfile.getGivenName();
    googleUser.LastName = basicProfile.getFamilyName();
    //console.log("GoogleUser: ", googleUser)
    googleUser.ThirdPartyTypeId = 2;
    this.props.onSuccess(googleUser);
  }

  render() {
    const { className, render } = this.props;
    if (render) {
      return render({ onClick: this.signIn });
    }

    return (
      <div id="google-root">
        <button type="button" className={className} onClick={this.signIn}>
          <span className="fa fa-google" /> Sign in with Google
        </button>
      </div>
    );
  }
}

GoogleSignIn.defaultProps = {
  className: "btn btn-block btn-social btn-google",
  scope: "profile email",
  accessType: "offline",
  prompt: "select_account consent",
  cookiePolicy: "single_host_origin",
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: "popup",
  disabledStyle: {
    opacity: 0.6
  },
  onRequest: () => {},
  jsSrc: "https://apis.google.com/js/client:platform.js"
};
export default GoogleSignIn;
