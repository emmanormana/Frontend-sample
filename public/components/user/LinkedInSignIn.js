import React from "react";
import { connect } from 'react-redux';
import { thirdpartylogin } from "../../actions/UserActions";
import UserApi from "../../api/UserApi";
import '../../../node_modules/bootstrap-social'

class LinkedInSignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emailError: false,
            passwordError: false,
            buttonClicked: false,
        }
        this.liLogin = this.liLogin.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.onLinkedInSuccess = this.onLinkedInSuccess.bind(this);
    }

    liLogin() {
        window.IN.User.refresh();
        window.IN.User.authorize(this.callbackFunction);
    }

    callbackFunction() {
        window.IN.API.Profile("me")
        .fields("id","first-name", "last-name", "email-address", "picture-urls::(original)")
        .result(this.onLinkedInSuccess).error(function (data) {
            console.log(data);
        });
    }

    onLinkedInSuccess(resp) {
        console.log(resp);
        let data = {
            accountId: resp.values[0].id,
            password: resp.values[0].id,
            thirdPartyTypeId: 3,
            email: resp.values[0].emailAddress,
            firstName: resp.values[0].firstName,
            lastName: resp.values[0].lastName,
            location: resp.values[0].pictureUrls.values[0]
        };
        this.props.login(data);
    }

    onError(resp){
        console.log(resp);
    }

    render() {
        return (
            <div>
                <button className="btn btn-block btn-social btn-linkedin" onClick={this.liLogin}><span className="fa fa-linkedin"></span>Sign in with LinkedIn</button>
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
        login: (data) => {
            dispatch(thirdpartylogin(data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkedInSignIn); 