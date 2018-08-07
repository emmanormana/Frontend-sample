import React from 'react';

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const styles = {
            
            divStyle: {
                backgroundImage: "url(assets/include/svg/svg-bg2.svg)",
                height: "550px",
                marginBottom: '0px',
                zIndex: '-1',
            },

            imgStyle : {
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
            },

            mainText: {
                fontSize: "100px",
                fontWeight: '500',
                letterSpacing: '1px',
                display: 'block',
                background: 'white',
                position: 'relative',
                zIndex: '1',
                textShadow: `2px 3px 2px #9E9E9E`,
            },

            subText: {
                display: 'block',
                fontSize: "18px",
                align: 'center',
                fontWeight: '500'
            },
        }
        
        return (
            <div>
                {this.state.overlayEffect ?
                        <div style={styles.overlayStyle}>
                            <div className="loader" style={styles.loaderStyle}></div>
                        </div>
                        : null
                }
                <div className="container g-pt-20 g-pb-20">
                    {/* <!-- Thanks for Registering --> */}
                    {!this.state.regThanks && <div className="g-max-width-5000 text-center mx-auto g-mb-40" style={styles.container}>
                        <span className="mb-4" style={styles.mainText}>4<span style={{color: '#a61d37'}}>0</span>1</span>
                        <span style={styles.subText}>Page not found <br/><span style={{fontSize: '15px'}}>The page you are looking for doesn't exist or an error occured.</span></span>
                    </div>}
                    {/* <!-- End --> */}
                </div>

                {/* Modal */}
                <div className="modal fade logIn" role="dialog" data-backdrop='false' style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-body alert alert-danger alert-dismissible fade show">
                        <div role="alert">
                            <h3><strong>Attention!</strong> You will have limited access until you complete profile creation.</h3>
                        </div>
                        </div>
                        <div style={{height: '55px'}}>
                        <button type="button" className="btn u-shadow-v33 g-color-white g-bg-primary g-bg-main--hover g-px-35 g-py-10" onClick={this.onSubmitLogin} style={styles.button}>Login</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFoundPage;