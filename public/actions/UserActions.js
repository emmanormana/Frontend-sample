import Axios from 'axios';
import WebApiUrl from '../api/WebApiUrl';

const BaseUrl = WebApiUrl + 'Users/';

export function loginUser(data) {
    return {
        type: "SET_LOGIN_STATE",
        payload: Axios.post(BaseUrl + "login", data, { withCredentials: true })
            .then(resp => resp.data)
            .catch(error => {
                console.log("Error Logging In")
            })
    };
}

export function logoutUser() {
    return {
        type: "SET_LOGOUT_STATE",
        payload: Axios.get(BaseUrl + "logout", { withCredentials: true })
            .then(success => !success.data.isSuccessful)
            .catch(error => {
                console.log("Error Logging Out")
            })
    };
}

export function loginStatus() {
    return {
        type: "CHECK_LOGIN_STATE",
        payload: Axios.get(BaseUrl + "current", { withCredentials: true })
            .then(resp => resp.data)
            .catch(error => {
                console.log("Error Checking Login State")
            })
    };
}

export function personInfo() {
    return {
        type: "CHECK_PERSON_STATE",
        payload: Axios.get(BaseUrl + "person", { withCredentials: true })
            .then(resp => resp.data)
            .catch(error => {
                console.log("Error Checking Login State")
            })
    };
}

export function thirdpartylogin(data) {
    const BaseUrl = WebApiUrl + 'thirdpartylogin/';
    return {
        type: "SET_LOGIN_STATE",
        payload: Axios.post(BaseUrl + "login", data, { withCredentials: true })
            .then(resp => resp.data)
            .catch(error => {
                console.log("Error Logging In")
            })
    };
}

