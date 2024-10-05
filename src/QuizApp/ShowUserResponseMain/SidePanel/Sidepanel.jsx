import "./Sidepanel.scss";

function Quiz(props) {
  const { quiz, setActiveQuiz, activeQuiz, userID, setActiveUser, activeUser } =
    props;

  console.log("activeuser: ", activeUser, "-", userID);
  console.log("activequiz: ", activeQuiz, "-", quiz.id);

  // debugger;
  return (
    <li
      // key={quiz.id}
      id={quiz.id}
      className={
        Number(activeUser) === userID && Number(activeQuiz) === quiz.id
          ? "active"
          : ""
      }
      onClick={() => {
        setActiveUser(userID);
        setActiveQuiz(quiz.id);
      }}
    >
      {quiz.name}
    </li>
  );
}

function UserItem(props) {
  const { user, setActiveUser, setActiveQuiz, activeUser, activeQuiz } = props;

  return (
    <>
      <div
        // key={user.id}
        className={`userItem ${activeUser === user.id ? "active" : ""}`}
        // onClick={() => {
        //   setActiveUser(user.id);
        // }}
      >
        {user.name}
      </div>
      <div className="userQuizzes">
        <ul>
          {Object.values(user.quizzes).map((quiz) => (
            <Quiz
              // key={`${activeUser}_${activeQuiz}`}
              key={`${user.id}_${quiz.id}`}
              quiz={quiz}
              activeQuiz={activeQuiz}
              setActiveQuiz={setActiveQuiz}
              userID={user.id}
              setActiveUser={setActiveUser}
              activeUser={activeUser}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function SidePanel(props) {
  const {
    users,
    setActiveUser,
    setActiveQuiz,
    activeUser,
    activeQuiz,
    isSidePanelActive,
  } = props;

  return (
    <div className={`sidePanel ${isSidePanelActive ? "active" : ""}`}>
      <div className="userList">
        {Object.values(users).map((user) => (
          <UserItem
            key={user.id}
            user={user}
            setActiveUser={setActiveUser}
            setActiveQuiz={setActiveQuiz}
            activeUser={activeUser}
            activeQuiz={activeQuiz}
          />
        ))}
      </div>
    </div>
  );
}

export default SidePanel;
