import React from 'react';
import LoginInput from "../../common/LoginInput";
import UserApi from "../../api/UserApi";

const styles = {
    button: {
      boxShadow: `2px 5px 2px 2px grey`,
    }
}

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: false,
            forgotPassword: false,
            emailSent: true,
            overlayEffect: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit_Success = this.onSubmit_Success.bind(this);
        this.onSubmit_Error = this.onSubmit_Error.bind(this);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.validate(this.state.email);
    }

    validate(email, password, cPassword) {
        this.setState({
            ...this.state,
            emailError: !/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email),
        }, () => { this.callApi(); });
    }

    callApi() {
        this.setState({
            forgotPassword: false,
            emailSent: true,
            overlayEffect: false
        })
        if (this.state.emailError === false) {
            UserApi.SelectByEmail({ email: this.state.email }, this.onSubmit_Success, this.onSubmit_Error);
            console.log("post success");
        }
    }
    
    onSubmit_Success() {
        this.setState({
            forgotPassword: true,
            emailSent: false,
            overlayEffect: true
        })
    }

    onSubmit_Error(){
        this.setState({
            forgotPassword: true,
            emailSent: false,
            overlayEffect: true
        })
    }

    handleChange(evt) {
        const key = evt.target.name;
        const val = evt.target.value;
        this.setState({
            ...this.state,
            [key]: val
        });
    }

    render() {
        const styles = {
            
            divStyle: {
                backgroundImage: "url(assets/include/svg/svg-bg2.svg)",
                height: "550px",
                marginBottom: '0px',
                zIndex: '-1',
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
        };
        return (
            <div style={styles.divstyle}>
                {!this.state.overlayEffect ?
                        <div style={styles.overlayStyle}>
                            <div className="loader" style={styles.loaderStyle}></div>
                        </div>
                        : null
                }
                {!this.state.forgotPassword && <div className="g-bg-img-hero g-bg-pos-top-center" >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">Forgot Password?</h2>
                                        <p>Click "Send Email" to recieve a link to create a new password</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-lg-5 order-md-2 g-pos-abs--md g-top-0 g-right-0">
                                    <form>
                                        <small className="form-control-feedback"> {this.state.loginError ? "Invalid Login" : ""} </small>
                                        <div id="signin">
                                            <div className="g-mb-20">
                                                <label className="g-color-text-light-v1 g-font-weight-500">Email</label>
                                                <LoginInput type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                                <small className="form-control-feedback" > {this.state.emailError ? "Email address entered is invalid." : ""} </small>
                                            </div>                                           
                                            <div className="text-center g-pt-30">
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button type="submit" className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7" onClick={this.onSubmit}>Send Email</button>
                                            </div>                                           
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {!this.state.emailSent && <div className="g-bg-img-hero g-bg-pos-top-center" >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">An Email has been Sent!</h2>
                                        <h3>Please click the link in your email to reset your Password. If you need another email to be sent, click the button below.</h3>
                                        <a href="http://localhost:3000/forgotpassword" className=" u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-rounded-30 g-px-35 g-py-10" style={styles.button}>Resend Email</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}
export default ForgotPassword;