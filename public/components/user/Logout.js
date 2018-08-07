import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/UserActions';

class Logout extends React.Component {

    componentDidMount() {
        this.props.logout();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.user.isLoggedIn) {
            console.log(this.props.user.isLoggedIn)
            const auth2 = window.gapi.auth2.getAuthInstance();
            document.addEventListener('FBObjectLogout',window.FB.XFBML.parse(window.FB.logout(function(response) {console.log("signed out of facebook")})));
            console.log("Google Auth Token: ", auth2);
            if (auth2 != null) {
                auth2.signOut().then(console.log("Logged out of Google Account."));
               
            }
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                {/* reroutes before render */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.UserReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutUser());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);