import { useState } from "react";
import "./Nav.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { CHANGE_ACTIVE_TAB, RESET_ALL } from "../../store";

function NavButton(props) {
  const dispatch = useDispatch();
  const { btnName, isActive, path, activeTabID, id } = props;

  return (
    <div className="NavBtn">
      <Link to={path}>
        <button
          onClick={() => {
            dispatch({ type: CHANGE_ACTIVE_TAB, payload: id });
          }}
          className={`${activeTabID === id ? "active" : ""}`}
        >
          {btnName}
        </button>
      </Link>
    </div>
  );
}

function Nav(props) {
  const dispatch = useDispatch();
  //   const [userType, setUserType] = useState("User");

  let { isMessageVisible, userType } = props;

  if (isMessageVisible === undefined) {
    isMessageVisible = true;
  }

  //   const userType = useSelector((state) => state.userType);
  const activeTabID = useSelector((state) => state.activeTabID);
  // const [userType, setUserType] = useState("Admin");
  // const [userType, setUserType] = useState("User");
  //   const [isMessageVisible, setIsMessageVisible] = useState(true);
  //   const [isMessageVisible, setIsMessageVisible] = useState(false);

  const AdminButtonNames = [
    { name: "Add Question", isActive: true, path: "/admin", id: "addquestion" },
    {
      name: "Show Question",
      isActive: false,
      path: "/admin/show-question",
      id: "showquestions",
    },
    {
      name: "Generate Quiz",
      isActive: false,
      path: "/admin/generate-quiz",
      id: "generatequiz",
    },
    {
      name: "Show User Response Quiz",
      isActive: false,
      path: "/admin/validate-answer",
      id: "showuserreesponse",
    },
  ];

  // in case of logging out clearing all the global states
  const loggingOut = () => {
    dispatch({ type: RESET_ALL });
  };

  return (
    <div className={`${userType ? userType : "User"} NavBar`}>
      <div className="col1">
        {userType === "Admin" ? (
          AdminButtonNames.map((btnObj) => (
            <NavButton
              btnName={btnObj.name}
              isActive={btnObj.isActive}
              path={btnObj.path}
              activeTabID={activeTabID}
              id={btnObj.id}
            />
          ))
        ) : (
          <h3 className="heading">Quiz App</h3>
        )}
        {isMessageVisible ? (
          <div className="message">Welcome testuser!</div>
        ) : (
          ""
        )}
      </div>
      <div className="col2">
        <div className="NavBtn special">
          <Link to="/">
            <button onClick={loggingOut}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
