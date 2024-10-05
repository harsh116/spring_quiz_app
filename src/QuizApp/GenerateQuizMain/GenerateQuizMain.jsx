import { useEffect, useState } from "react";
import "./GenerateQuizMain.scss";
// import { questions } from "./questions";
import { BACKEND_HOST } from "../../constants";
import { useSelector } from "react-redux";

// return questions containing given technology
const getQuestionsByTechnology = (questions, technology) => {
  return questions.filter((question) => question.technology === technology);
};

const getTechnologiesFromQuestions = (questions) => {
  const technologies = new Set();
  for (let question of questions) {
    technologies.add(question.technology);
  }

  return Array.from(technologies);
};

const isQuestionUnique = (questions, qid) => {
  return !questions.some((question) => question.id === qid);
};

const isQuestionFound = (questions, qid) => {
  return !isQuestionUnique(questions, qid);
};

const getQuestionIndexById = (questions, qid) => {
  return questions.findIndex((question) => question.id === qid);
};

// Question component
function Question(props) {
  // question : {id,question,technology}
  // selectedQuestions : question[]
  const { question, selectedQuestions, setSelectedQuestions } = props;

  const handleSelection = (e) => {
    // console.log("🚀 ~ Question ~ question:", question);
    // console.log("🚀 ~ Question ~ selectedQuestions:", selectedQuestions);

    // if current checkbox is checked
    if (e.target.checked) {
      // if current question is unique ie not found already in selectedQuestions
      if (isQuestionUnique(selectedQuestions, question.id)) {
        // adding this question in selectedQuestions and updating state
        setSelectedQuestions([...selectedQuestions, question]);
      }
    }
    // if current checkbox is not checked
    else {
      // question index where given id is found
      const questionIndex = getQuestionIndexById(
        selectedQuestions,
        question.id,
      );

      //   console.log("🚀 ~ handleSelection ~ questionIndex:", questionIndex);

      if (questionIndex != -1) {
        const questions = [...selectedQuestions];
        questions.splice(questionIndex, 1);
        setSelectedQuestions(questions);
      }
    }

    // console.log("selected: ", selectedQuestions);
  };

  // if selectedQuestions contain the current question then making sure the checkbox is checked using checked attribute
  return (
    <>
      <div className="Question">
        <div className="col1">
          <input
            type="checkbox"
            name=""
            id=""
            checked={isQuestionFound(selectedQuestions, question.id)}
            // checked={true}
            onChange={handleSelection}
          />
        </div>
        <div className="col2">
          <span>{question.question}</span>
        </div>
      </div>
      <hr />
    </>
  );
}

function GenerateQuizMain(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;

  const questions = useSelector((state) => state.questions);
  console.log("questions:", questions);
  const technologies = getTechnologiesFromQuestions(questions);

  const sessionToken = useSelector((state) => state.sessionToken);

  // eg : Java, Python  , or any custom
  const [technology, setTechnology] = useState("");
  // selectall, selectnone
  const [selectorDeselectAll, setSelectorDeselectAll] = useState("selectnone");

  // array of strings( ie questions )
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizName, setQuizName] = useState("");

  // detecting selectorDeselectAll state change for selectall, selectnone events
  useEffect(() => {
    if (selectorDeselectAll === "selectnone") {
      setSelectedQuestions([]);
    } else if (selectorDeselectAll === "selectall") {
      setSelectedQuestions(getQuestionsByTechnology(questions, technology));
    }
  }, [selectorDeselectAll]);

  // clearing selectedQuestions state when technology is changed in order to
  // select questions from one technology
  useEffect(() => {
    setSelectedQuestions([]);
  }, [technology]);

  const handleTechnologyChange = (e) => {
    console.log("target: ", e.target.value);
    setTechnology(e.target.value);
  };

  const handleGenerateQuiz = () => {
    const reqBody = {
      quizName,
      technology,
      questions: selectedQuestions,
    };

    fetch(`${BACKEND_HOST}/addQuiz`, {
      method: "POST",
      mode: "cors",
      headers: {
        sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res === 500) {
          throw new Error("Quiz isnt generated due to some error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("quiz generated data: ", data);
        setSuccesseMessage("quiz generated successfully");
        setSuccessMessageVisibility(true);
      })
      .catch((err) => {
        console.log("quiz generated err: ", err);
        setErrorMessage(err.message);
        setErrorVisibility(true);
      });
  };

  return (
    <div className="GenerateQuizMain">
      <div className="GenerateQuizMain_Section">
        <div className="quizname">
          <label htmlFor="">Enter Quiz Name</label>
          <br />
          <input
            onChange={(e) => {
              setQuizName(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="technologyname">
          <label htmlFor="">Select Technology</label>
          <br />
          <select name="" id="" onChange={handleTechnologyChange}>
            <option value="null" defaultValue={true}>
              --Select--
            </option>
            {technologies.map((technology) => {
              return (
                <>
                  <option value={technology}> {technology} </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="generateQuiz">
          <button onClick={handleGenerateQuiz} className="generateQuizBtn">
            Generate Quiz
          </button>
        </div>
        <div className="selectDeselectOptions">
          <button
            className="selectall"
            onClick={() => {
              setSelectorDeselectAll("selectall");
            }}
          >
            Select All
          </button>
          <button
            className="selectnone"
            onClick={() => {
              setSelectorDeselectAll("selectnone");
            }}
          >
            Select None
          </button>
        </div>
        <div className="questionsList">
          {questions.map((question, i) => {
            if (question.technology === technology) {
              return (
                <Question
                  key={`${technology.replace(/\s/)}_${i}`}
                  question={question}
                  selectedQuestions={selectedQuestions}
                  setSelectedQuestions={setSelectedQuestions}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default GenerateQuizMain;
