import { useEffect, useState } from "react";
import "./ShowUserResponseMain.scss";
// import { users } from "./questions";
// import questionsDatabase from "./questions";
import SidePanel from "./SidePanel/Sidepanel";
import { useDispatch, useSelector } from "react-redux";
import { SET_USERS } from "../../store";

function Option(props) {
  const { option, optionNumber, correctOptionNumber, selectedOptionNumber } =
    props;

  const optionLetter = "abcdefgh"[optionNumber - 1];

  return (
    <div
      className={`QuestionBox_Options_Option ${
        optionNumber === correctOptionNumber ? "correct" : ""
      } ${selectedOptionNumber === optionNumber ? "selected" : ""}`}
    >{`${optionLetter}. ${option}`}</div>
  );
}

function QuestionBox(props) {
  const {
    technology,
    question,
    options,
    questionNumber,
    correctOptionNumber,
    expandOrCollapse,
    selectedOptionNumber,
  } = props;

  const [areOptionsVisible, setAreOptionsVisible] = useState(true);
  // const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  useEffect(() => {
    if (expandOrCollapse === "expand") {
      setAreOptionsVisible(true);
    } else if (expandOrCollapse === "collapse") {
      setAreOptionsVisible(false);
    }
  }, [expandOrCollapse]);

  return (
    <div className="QuestionBox">
      <div className="QuestionBox_Question">
        <div className="QuestionBox_Question_Text">
          {`${questionNumber}. ${question}`}
        </div>
        <button
          className="toggleAnsBtn"
          onClick={() => {
            setAreOptionsVisible(!areOptionsVisible);
          }}
        >
          <i className={`arrow ${areOptionsVisible ? "down" : "up"}`}></i>
        </button>
      </div>
      <div className="QuestionBox_Options_Container">
        <div
          className={`QuestionBox_Options ${
            areOptionsVisible ? "visible" : ""
          }`}
        >
          {options.map((option, i) => (
            <Option
              option={option}
              optionNumber={i + 1}
              correctOptionNumber={correctOptionNumber}
              selectedOptionNumber={selectedOptionNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowUserResponseMain(props) {
  const dispatch = useDispatch();
  const [expandOrCollapse, setExpandOrCollapse] = useState("");

  // dispatch({ type: SET_USERS, payload: dusers });

  const users = useSelector((state) => state.users);

  // const firstUserID = Object.keys(users)[0];
  // const firstQuizIDOfFirstUser = Object.keys(users[firstUserID].quizzes)[0];

  //user id
  const [activeUser, setActiveUser] = useState(null);

  // const [activeUser, setActiveUser] = useState(firstUserID);

  // quiz id
  const [activeQuiz, setActiveQuiz] = useState(null);

  // const [activeQuiz, setActiveQuiz] = useState(firstQuizIDOfFirstUser);

  const [isSidePanelActive, setIsSidePanelActive] = useState(false);

  // useEffect(() => {
  //   const firstUserID = Object.keys(users)[0];
  //   const firstQuizIDOfFirstUser = Object.keys(users[firstUserID].quizzes)[0];
  //   setActiveUser(firstUserID);
  //   setActiveQuiz(firstQuizIDOfFirstUser);
  // }, []);

  useEffect(() => {
    console.log(users); // Check the structure of users
    const firstUserID = Object.keys(users)[0];
    const firstQuizIDOfFirstUser = Object.keys(
      users[firstUserID]?.quizzes || {},
    )[0];

    if (firstUserID && firstQuizIDOfFirstUser) {
      setActiveUser(firstUserID);
      setActiveQuiz(firstQuizIDOfFirstUser);
    }
  }, [users]);

  const addingSelectedOptionToQuestions = (quiz = {}, questions = []) => {
    const selectedOptions = quiz.selectedOptions;
    const questionsNew = questions.map((question, i) => {
      const questionNew = {
        ...question,
        selectedOptionNumber: selectedOptions[i],
      };
      return questionNew;
    });

    return questionsNew;
  };

  const questions = users?.[activeUser]?.quizzes?.[activeQuiz]?.questions
    ? // true
      addingSelectedOptionToQuestions(
        users[activeUser].quizzes[activeQuiz],
        users[activeUser].quizzes[activeQuiz].questions,
      )
    : {};

  return users?.[activeUser]?.quizzes?.[activeQuiz]?.questions ? (
    <div className="ShowUserResponseMain">
      <div className="toggleSidePanel">
        <button
          onClick={() => {
            setIsSidePanelActive(!isSidePanelActive);
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <SidePanel
        users={users}
        isSidePanelActive={isSidePanelActive}
        setActiveUser={setActiveUser}
        setActiveQuiz={setActiveQuiz}
        activeUser={activeUser}
        activeQuiz={activeQuiz}
      />
      <div className="ShowQuizSection">
        <div className="extraButtonsSection">
          <div className="expandAll">
            <button
              onClick={() => {
                setExpandOrCollapse("expand");
              }}
            >
              Expand All
            </button>
          </div>
          <div className="collapseAll">
            <button
              onClick={() => {
                setExpandOrCollapse("collapse");
              }}
            >
              Collapse All
            </button>
          </div>
        </div>
        {questions.map((question, i) => (
          <QuestionBox
            technology={question.technology}
            questionNumber={i + 1}
            question={question.question}
            options={question.options}
            correctOptionNumber={question.correctOptionNumber}
            selectedOptionNumber={question.selectedOptionNumber}
            expandOrCollapse={expandOrCollapse}
          />
        ))}
        <h3
          style={{ textAlign: "center" }}
        >{`Score: ${users[activeUser].quizzes[activeQuiz].score}`}</h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ShowUserResponseMain;
