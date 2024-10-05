import { useEffect, useState } from "react";
import "./ReviewAnswersMain.scss";
// import { quiz } from "./questions";
import { useLocation } from "react-router-dom";

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

function ReviewAnswersMain(props) {
  const [expandOrCollapse, setExpandOrCollapse] = useState("");

  const { state } = useLocation();
  const quiz = state;

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

  const questions = addingSelectedOptionToQuestions(quiz, quiz.questions);

  return (
    <div className="ReviewAnswersMain">
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
        <h3 style={{ textAlign: "center" }}>{`Score: ${quiz.score}`}</h3>
      </div>
    </div>
  );
}

export default ReviewAnswersMain;
