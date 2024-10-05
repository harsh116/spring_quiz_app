// export const USER = "User";
// export const ADMIN = "Admin";
export const CHANGE_ACTIVE_TAB = "change-active-tab";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_USERS = "SET_USERS";
export const SET_TECHNOLOGIES = "SET_TECHNOLOGIES";
export const SET_SESSION_TOKEN = "SET_SESSION_TOKEN";
export const RESET_ALL = "RESET_ALL";

import { createStore } from "redux";

// const initialState = { userType: "Admin", isMessageVisible: true };
const initialState = {
  activeTabID: "addquestion",
  //userType will be updated with fetch result after login
  userType: "",
  // questions will be fetched too depending upon userType. if usertype admin then no correctOption field will be there
  questions: [],
  // users will be fetched only when userType is 'Admin' and will contain quiz and quiz contains questions
  // instead of array, it is of object type as instead of indexed being key, username and its nested quiz name will be the key
  // format : { "user1" : {"quiz1": {question : <question>, id : <id> .....}}, "user2": .... }
  users: {},
  // just like users but instead contains technology name and thus quiz inside it so it is object too and is fetched only when userType is 'User'
  technologies: {},
  // session token for user to determine privileges
  sessionToken: "",
};

// function Reducer(state = initialState, action) {
//   switch (action.type) {
//     case USER:
//       return { ...state, userType: USER };
//     case ADMIN:
//       return { ...state, userType: ADMIN };
//     default:
//       return state;
//   }
// }

function Reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ALL:
      return initialState;
    case CHANGE_ACTIVE_TAB:
      return { ...state, activeTabID: action.payload };
    case SET_USER_TYPE:
      return { ...state, userType: action.payload };
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_TECHNOLOGIES:
      return { ...state, technologies: action.payload };
    case SET_SESSION_TOKEN:
      return { ...state, sessionToken: action.payload };

    default:
      return state;
  }
}

export const store = createStore(Reducer);
