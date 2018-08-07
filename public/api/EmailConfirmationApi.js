import Axios from "axios";
import WebApiUrl from "../api/WebApiUrl";

const BaseUrl = WebApiUrl + "/Users";

//Class to be removed once API is live
class EmailConfirmationApi {
  //POST
  static Insert(data, success, error) {
    Axios.post(BaseUrl, data, { withCredentials: true })
      .then(success)
      .catch(error);
  }

  //GET by AuthToken
  static SelectByAuthToken(data, success, error) {
    Axios.get(BaseUrl + "/token/" + data, { withCredentials: true })
      .then(success)
      .catch(error);
  }

  //PUT
  static Update(data, success) {
    const id = data.id;
    Axios.put(BaseUrl + "/" + id, data, { withCredentials: true })
      .then(success)
      .catch(err => console.log(err));
  }

  //Delete by Id
  static Delete(data, success, error) {
    const id = data;
    Axios.delete(BaseUrl + "/" + id, { withCredentials: true })
      .then(success)
      .catch(err => console.log(err));
  }

  // GET Email
  static SelectByEmail(data, success, error) {
    Axios.get(BaseUrl + "/email/" + data.email + "/", { withCredentials: true })
      .then(success)
      .catch(err => console.log("Get By Email Failed"));
  }
}
export default EmailConfirmationApi;
