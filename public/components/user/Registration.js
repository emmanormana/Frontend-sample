import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import RegisterInput from '../../common/RegisterInput';
import UserApi from "../../api/UserApi";
import GoogleSignIn from "./GoogleSignIn";
import ReCAPTCHA from 'react-google-recaptcha';
import { thirdpartylogin } from "../../actions/UserActions";
import FbLoginBtn from '../user/FacebookLogin';

const divStyle = {
    backgroundImage: "url(assets/include/svg/svg-bg2.svg)"
}
class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            cPassword: "",
            emailError: false,
            passwordError: false,
            cPasswordError: false,
            signin: false,
            show: false,
            overlayEffect: true,
            'g-recaptcha-response': "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit_Success = this.onSubmit_Success.bind(this);
        this.onSubmit_Error = this.onSubmit_Error.bind(this);
        this.facebookCallback = this.facebookCallback.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            overlayEffect: false,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user.isLoggedIn) {
            this.props.history.push("/");
        }

        else if (prevProps.user.loginSuccess !== false && this.props.user.loginSuccess === false) {
            this.setState({
                ...this.state,
                loginError: true,
                buttonClicked: false
            })
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onSubmit(evt) {
        evt.preventDefault();

        this.validate(this.state.email, this.state.password, this.state.cPassword);
    }

    validate(email, password, cPassword) {

        this.setState({
            ...this.state,
            emailError: !/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email),
            passwordError: !/(?=.{8,})(?=.*[0-9])/.test(password),
            cPasswordError: !(password === cPassword)
        }, () => { this.callApi(); });
    }

    callApi() {
        if (this.state.emailError === false && this.state.passwordError === false && this.state.cPasswordError === false) {
            UserApi.Register({ email: this.state.email, password: this.state.password }, this.onSubmit_Success, this.onSubmit_Error);
            this.setState({
                ...this.state,
                overlayEffect: true,
            })
        }
    }

    onSubmit_Success(resp) {
        console.log(resp, "Registration Success");
        this.props.history.push("/confirmemail");
    }

    onSubmit_Error(err) {
        console.log(err, "Registration Failed");
        this.setState({ ...this.state, overlayEffect: false, })
    }

    handleChange(evt) {
        const key = evt.target.name;
        const val = evt.target.value;
        this.setState({
            ...this.state,
            [key]: val
        });
    }

    onChange(response) {
        this.setState({
            ...this.state,
            'g-recaptcha-response': response
        });
    }

    facebookCallback(fbObject) {
        console.log(fbObject);
        this.props.thirdparty(fbObject);
        
    }

    render() {
        const styles = {

            divStyle: {
                backgroundImage: "url(assets/include/svg/svg-bg2.svg)",
                height: "550px",
                marginBottom: '0px',
                zIndex: '-1',
            },

            imgStyle: {
                float: "right",
                width: "10%",
                borderRadius: "4px",
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
            }
        }

        return (
            <div styles={divStyle}>
                {this.state.overlayEffect ?
                    <div style={styles.overlayStyle}>
                        <div className="loader" style={styles.loaderStyle}></div>
                    </div>
                    : null
                }
                <div className="g-bg-img-hero g-bg-pos-top-center" style={divStyle}  >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">Register to Network for Justice</h2>
                                        <p>By signing in you will be authorized to access your applications and web sites that use the Sign in Service. Use is subject to but not limited to the policies and guidelines listed below in <a href="#">Policies and guidelines</a>.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-lg-5 order-md-2 g-pos-abs--md g-top-0 g-right-0">
                                    <div className="g-mb-20 d-flex">
                                        <FbLoginBtn id= "fbLogin"
                                            width="250"
                                            dataScope="public_profile,email,"
                                            onSuccess={this.facebookCallback}
                                        />
                                        <GoogleSignIn
                                            className="g-signin2"
                                            clientId="450768390969-iqo3g7ogakhmdluvc7rsknv1ifbqi5m4"
                                            onSuccess={this.onGoogleSignIn}
                                            onFailure={this.onGoogleFailure}
                                        />
                                    </div>
                                    <form className="u-shadow-v35 g-bg-white rounded g-px-40 g-py-50">
                                        {/* Signup*/}
                                        <div id="signup" styles="display: none;">
                                            <div className="g-mb-20">
                                                <label style={{ fontSize: '15px', color: '#26304d' }}>Email</label>
                                                <RegisterInput type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                                <small className="form-control-feedback" > {this.state.emailError ? "Email address entered is invalid." : ""} </small>
                                            </div>
                                            <div className="g-mb-20">
                                                <label style={{ fontSize: '15px', color: '#26304d' }}>Password</label>
                                                <RegisterInput type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                                <small className="form-control-feedback"> {this.state.passwordError ? "Password must be at least 8 characters and contain at least one number." : ""} </small>
                                            </div>
                                            <div className="g-mb-10">
                                                <label style={{ fontSize: '15px', color: '#26304d' }}>Confirm Password</label>
                                                <RegisterInput type="password" id="cPassword" name="cPassword" value={this.state.cPassword} onChange={this.handleChange} />
                                                <small className="form-control-feedback"> {this.state.cPasswordError ? "Passwords must match." : ""} </small>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <ReCAPTCHA
                                                    ref="recaptcha"
                                                    sitekey="6Ld5VFsUAAAAAPqG-lnAhfOqf5pTSYl0PKEKJcPo"
                                                    onChange={this.onChange.bind(this)} />
                                                <button type="submit" className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7" onClick={this.onSubmit}>Sign in</button>
                                            </div>
                                            <div className="d-flex">
                                                <p className="g-color-text-light-v1 g-font-size-default mb-0">Already have an account? <Link className="g-font-size-default" id="signin-link" to="/login">Signin</Link></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        thirdparty: (data) => {
            dispatch(thirdpartylogin(data))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);