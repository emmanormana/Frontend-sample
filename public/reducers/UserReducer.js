const UserReducer = (
    state = {
        isLoggedIn: false,
        loggedUser: "",
        loginSuccess: true,
        PersonID: ""
    }, action) => {
    switch (action.type) {
        case 'SET_LOGIN_STATE_FULFILLED':
            state = {
                ...state,
                loginSuccess: action.payload.isSuccessful,
                loggedUser: action.payload.item,
                isLoggedIn: action.payload.isSuccessful,
                PersonID: action.payload.personID
            };
            break;
        case 'SET_LOGOUT_STATE_FULFILLED':
            state = {
                loggedUser: "",
                isLoggedIn: false,
            };
            break;
        case 'CHECK_LOGIN_STATE_FULFILLED':
            if (action.payload !== undefined) {
                state = {
                    ...state,
                    loggedUser: action.payload,
                    isLoggedIn: true
                };
            }
            else {
                state = {
                    isLoggedIn: false,
                }
            }
            break;
        case 'CHECK_PERSON_STATE_FULFILLED':
            if (action.payload !== undefined) {
                state = {
                    ...state,
                    PersonID: action.payload.items
                };
            }
            break;
        default:
            state = {
                ...state,
                loginSuccess: true
            };

            break;
    }
    return state;
};
export default UserReducer;