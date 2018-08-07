import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginStatus, personInfo } from './actions/UserActions'
import './App.css';
import Routes from './Routes';

class App extends Component {

  componentDidMount() {
    this.props.setLoginStatus();
    this.props.setPersonInfo();
  }

  render() {
    return (
      <div className="App">
        <Routes isLoggedIn={this.props.user.isLoggedIn} loggedUser={this.props.user.loggedUser} />
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
    setLoginStatus: () => {
      dispatch(loginStatus());
    },
    setPersonInfo: () => {
      dispatch(personInfo());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);