import React from 'react';
import RegisterInput from '../../common/RegisterInput';
import UserApi from "../../api/UserApi";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",           
            password: "",
            cPassword: "",
            idError: false,
            passwordError: false,
            cPasswordError: false,
            expiredtoken: true,
            resetpassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getByAuthToken = this.getByAuthToken.bind(this);
        this.getId_Success = this.getId_Success.bind(this);
        this.onSubmit_Success = this.onSubmit_Success.bind(this);
        this.getId_Error = this.getId_Error.bind(this);
        this.newEmail = this.newEmail.bind(this);
    }

    componentDidMount(){
       var checkId = window.location.search;
       checkId = checkId.replace("?id=", '');
       this.getByAuthToken(checkId);
    }

    getByAuthToken(checkId){
        UserApi.SelectByAuthToken(checkId, this.getId_Success, this.getId_Error);
    }

    getId_Success(resp) {
         let UserId = resp.data.item.userId;
        console.log(UserId);
        this.setState({
            ...this.state,
             id: UserId
          });
    }

    getId_Error() {
        this.setState({
            ...this.state,
           expiredtoken: false,
           resetpassword: true,
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.validate(this.state.password, this.state.cPassword);
    }

    validate(password, cPassword) { 
        this.setState({
        ...this.state,
        passwordError: !/(?=.{8,})(?=.*[0-9])/.test(password),
        cPasswordError: !(password === cPassword)
        }, 
        () => { this.callApi(); });
    }
    
    callApi() {
        if (this.state.passwordError === false && this.state.cPasswordError === false) {
            UserApi.Update({...this.state}, this.onSubmit_Success, this.onSubmit_Error);
        }
    }

    onSubmit_Success(resp) {
        console.log("change password Success");
        UserApi.Delete(this.state.id, this.deleteToken_Success, this.deleteToken_Error);
        this.props.history.push("/resetpasswordconfirmation");
    }

    deleteToken_Success(resp) {
        console.log("Delete Successful");
    }

    deleteToken_Error(err) {
        console.log(err);
    }

    onSubmit_Error(err) {
        console.log(err, "change password failed");
    }

    newEmail() {
        this.props.history.push("/forgotpassword");
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
        return (
           <div>
                {!this.state.resetpassword &&  <div className="g-bg-img-hero g-bg-pos-top-center" >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">Please Reset your Password</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-md-6 col-lg-5 order-md-2 g-pos-abs--md g-top-0 g-right-0">
                                    <form>
                                        <div id="newPassword" styles="display: none;">
                                            <div className="g-mb-20">
                                                <label className="g-color-text-light-v1 g-font-weight-500">New Password</label>
                                                <RegisterInput type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                                <small className="form-control-feedback"> {this.state.passwordError ? "Password must be at least 8 characters and contain at least one number." : ""} </small>
                                            </div>
                                            <div className="g-mb-20">
                                                <label className="g-color-text-light-v1 g-font-weight-500">Confirm New Password</label>
                                                <RegisterInput type="password" id="cPassword" name="cPassword" value={this.state.cPassword} onChange={this.handleChange} />
                                                <small className="form-control-feedback"> {this.state.cPasswordError ? "Passwords must match." : ""} </small>
                                            </div>
                                            <div className="d-flex">
                                                <button type="submit" className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-font-size-default rounded g-px-25 g-py-7 ml-auto" onClick={this.onSubmit}>Change Password</button>
                                            </div>
                                            <div className="text-center g-pt-30">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {!this.state.expiredtoken && <div className="g-bg-img-hero g-bg-pos-top-center" >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">Sorry! Your confirmation link has expired.</h2>
                                        <h3>Please click the button below to send a new Email</h3>
                                        <button type="submit" className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-rounded-30 g-px-35 g-py-10" onClick={this.newEmail}>Resend New Confirmation Link</button>
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
export default ResetPassword;