import Axios from "axios";
import WebApiUrl from "./WebApiUrl";

const BaseUrl = WebApiUrl + "Users/";

class UserApi {
  static Register(data, history) {
    Axios.post(BaseUrl + "register", data, { withCredentials: true })
      .then(res => history.push("/confirmemail"))
      .catch(err => console.log(err));
  }

  static UpdatePassword(data, success, error) {
    Axios.put(BaseUrl + "updatepassword", data, { withCredentials: true })
      .then(success)
      .catch(error);
  }

  static validate(data, success, error) {
    Axios.post(BaseUrl + "validate", data, { withCredentials: true })
      .then(success)
      .catch(error);
  }

  static Update(data, success, error) {
    Axios.put(BaseUrl + "resetpassword?id=" + data.id, data, {
      withCredentials: true
    })
      .then(success)
      .catch(error);
  }

  static SelectByEmail(data, success, error) {
    Axios.get(BaseUrl + "/forgotpassword/" + data.email + "/", {
      withCredentials: true
    })
      .then(success)
      .catch(error);
  }

  static SelectByAuthToken(data, success, error) {
    Axios.get(BaseUrl + "/token/" + data, { withCredentials: true })
      .then(success)
      .catch(error);
  }
  static Delete(id, success, error) {
    Axios.delete(BaseUrl + id, { withCredentials: true })
      .then(success)
      .catch(error);
  }
}
export default UserApi;
