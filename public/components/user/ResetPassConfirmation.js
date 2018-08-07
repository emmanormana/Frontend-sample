import React from 'react';

const styles = {
    button: {
      boxShadow: `2px 5px 2px 2px grey`,
    }
};
  
class ResetPassConfirmation extends React.Component {
    render() {
        return (
            <div>
                <div className="g-bg-img-hero g-bg-pos-top-center" >
                    <div className="container g-pt-100 g-pb-100 g-pb-130--lg">
                        <div className="g-pos-rel">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="g-mb-40">
                                        <h2 className="h1 mb-3">Thank you for reseting your Password!</h2>
                                        <h3>Please click the button below to navigate to the Login Page</h3>
                                        <a href="http://futureoflatinos.azurewebsites.net/login" className=" u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-rounded-30 g-px-35 g-py-10" style={styles.button}>Go to Login</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResetPassConfirmation;