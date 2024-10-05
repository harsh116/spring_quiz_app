import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_QUESTIONS,
  SET_SESSION_TOKEN,
  SET_TECHNOLOGIES,
  SET_USER_TYPE,
  SET_USERS,
} from "../../store";
// import { getCookie, setCookie } from "../helpers";
import { BACKEND_HOST } from "../../constants";
import { useState } from "react";
import Spinner from "../components/Overlay/Spinner";

function LoginPage(props) {
  const dispatch = useDispatch();

  const { setErrorVisibility, setErrorMessage } = props;

  const [isLoading, setIsLoading] = useState(false);

  // const sessionToken = useSelector((state) => state.sessionToken);

  // here session token is passed directly instead of using from redux bcz it wont update till now
  // and only after we use this hook after using dispatch
  const fetchQuestions = async (sessionToken) => {
    const res = await fetch(`${BACKEND_HOST}/getAllQuestions`, {
      headers: {
        sessionToken: sessionToken,
      },
      mode: "cors",
    });

    if (res.status === 500) {
      throw new Error("Couldnt get questions due to some error");
    }

    const data = await res.json();

    return data;
  };

  const fetchUserResponse = async (sessionToken) => {
    const res = await fetch(`${BACKEND_HOST}/getAllUsersQuizzes`, {
      mode: "cors",
      headers: {
        sessionToken: sessionToken,
      },
    });

    if (res.status === 500) {
      throw new Error("Couldnt get user responses due to some error");
    }

    const data = await res.json();

    return data;
  };

  const fetchQuizforUsers = async (sessionToken) => {
    const res = await fetch(`${BACKEND_HOST}/getQuizzes`, {
      headers: {
        sessionToken: sessionToken,
      },
      mode: "cors",
    });

    if (res.status === 500) {
      throw new Error("Couldnt get questions due to some error");
    }

    const data = await res.json();

    return data;
  };

  const getSessionKey = async (formData) => {
    const res = await fetch(`${BACKEND_HOST}/authenticate`, {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    const data = await res.json();

    // console.log(" session data: ", data);

    return data;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // navigate()

    const formData = new FormData(e.currentTarget);
    console.log(formData);

    // Convert FormData to a plain object for logging
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    console.log(formDataObj); // This will log a plain object with form data

    try {
      setIsLoading(true);
      const { sessionToken, userType, message } = await getSessionKey(formData);
      setIsLoading(false);
      // setCookie(SESSION_COOKIE_NAME, sessionToken);
      dispatch({ type: SET_SESSION_TOKEN, payload: sessionToken });

      console.log("sessiontoken got: ", sessionToken);

      console.log("fetch message after login :", message);
      // debugger;
      // userType is either 'Admin' or 'User'
      if (userType === "Admin") {
        navigate("/admin");
        dispatch({ type: SET_USER_TYPE, payload: userType });
        const qs = await fetchQuestions(sessionToken);
        // console.log("qs: ", qs);
        dispatch({ type: SET_QUESTIONS, payload: qs });

        const users = await fetchUserResponse(sessionToken);
        dispatch({ type: SET_USERS, payload: users });
      } else if (userType === "User") {
        navigate("/user");
        dispatch({ type: SET_USER_TYPE, payload: userType });
        const technologies = await fetchQuizforUsers(sessionToken);
        dispatch({ type: SET_TECHNOLOGIES, payload: technologies });
      } else {
        // throw new Error("userType recieved is empty");
        throw new Error(message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("login fetch err: ", err);
      setErrorMessage(err.message);
      setErrorVisibility(true);
    }
  };

  return (
    <div className="LoginPage">
      <div className="container">
        <h1>Please Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              id="username"
              name="username"
              required
              autoFocus={true}
            />
            <label for="username">
              <span>Username</span>
            </label>
          </div>
          <div className="form-control">
            <input type="password" id="password" name="password" required />
            <label for="password">
              <span>Password</span>
            </label>
          </div>

          <button className="btn">Login</button>
        </form>
        <Spinner
          classes={"center margin"}
          visible={isLoading}
          type={"Oval"}
          // text={"Loading"}/
          color={"black"}
        />
      </div>
    </div>
  );
}

export default LoginPage;
