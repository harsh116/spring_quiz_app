import { useState } from "react";
import "./QuizPageMain.scss";
// import { technologies } from "./questions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BACKEND_HOST } from "../../constants";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function SelectElementOption(props) {
  const { value, display } = props;
  return (
    <>
      <option value={value}>{display ? display : value}</option>;
    </>
  );
}

function Option(props) {
  const {
    option,
    optionName,
    optionNumber,
    questionNumber,
    selectedOptionNumbers,
    setSelectedOptionNumbers,
  } = props;

  const handleOptionChange = (e) => {
    if (e.target.checked) {
      setSelectedOptionNumbers({
        ...selectedOptionNumbers,
        [questionNumber]: optionNumber,
      });
    }
  };

  return (
    <div className="option">
      <div className="col1">
        {" "}
        <input
          type="radio"
          checked={selectedOptionNumbers[questionNumber] === optionNumber}
          name={optionName}
          id=""
          onChange={handleOptionChange}
        />{" "}
      </div>
      <div className="col2">
        {" "}
        <div className="optionText">{option}</div>{" "}
      </div>
    </div>
  );
}

function QuestionBox(props) {
  const {
    question,
    questionNumber,
    setSelectedOptionNumbers,
    selectedOptionNumbers,
  } = props;

  const optionName = generateRandomString(4);

  return (
    <div className="questionBox">
      <div className="question">{question.question}</div>
      <div className="options">
        {question.options.map((option, i) => (
          <Option
            option={option}
            optionName={optionName}
            optionNumber={i + 1}
            questionNumber={questionNumber}
            selectedOptionNumbers={selectedOptionNumbers}
            setSelectedOptionNumbers={setSelectedOptionNumbers}
          />
        ))}
      </div>
    </div>
  );
}

function QuizPageMain(props) {
  const { setErrorVisibility, setErrorMessage } = props;
  const navigate = useNavigate();

  const technologies = useSelector((state) => state.technologies);
  const sessionToken = useSelector((state) => state.sessionToken);

  console.log("technologies: ", technologies);

  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(0);

  //   {[questionNumber]: optionNumber}
  const [selectedOptionNumbers, setSelectedOptionNumbers] = useState({});

  const handleTechnologyChange = (e) => {
    setSelectedTechnology(e.target.value);
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const submitAnswers = async () => {
    const selectedOptionNumbersArray = [];

    for (let qnumber of Object.keys(selectedOptionNumbers)) {
      selectedOptionNumbersArray[qnumber - 1] = selectedOptionNumbers[qnumber];
    }

    // selectedOptionNumbers
    // const selectedOptionNumbersArray = Object.keys(selectedOptionNumbers).map((index)=>)

    const quizRequestBody = {
      quizID: selectedQuiz,
      selectedOptionNumbersArray,
    };

    const res = await fetch(`${BACKEND_HOST}/addAnswers`, {
      method: "POST",
      mode: "cors",
      headers: {
        sessionToken: sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizRequestBody),
    });

    if (res.status === 500) {
      throw new Error("Answers not submitted due to some error");
    }

    const data = res.json();
    return data;
  };

  const handleSubmit = async () => {
    console.log("selectedOptionNumbers: ", selectedOptionNumbers);

    // only navigate to new link when all the options are selected
    // selected options length must be equal to number of questions
    if (
      technologies?.[selectedTechnology]?.[selectedQuiz] &&
      Object.keys(selectedOptionNumbers).length ===
        technologies[selectedTechnology][selectedQuiz].questions.length
    ) {
      try {
        const submitAnswerResult = await submitAnswers();
        console.log("submitAnswerResult: ", submitAnswerResult);
        // passing the result of quiz to review route
        navigate("/user/review", { state: submitAnswerResult });
      } catch (err) {
        console.log("err: ", err);
        setErrorMessage(err.message);
        setErrorVisibility(true);
      }
    } else {
      alert("Cant submit with incomplete answers");
    }
  };

  console.log(
    "questions: ",
    technologies[selectedTechnology]?.[selectedQuiz]?.questions,
  );

  return (
    <div className="QuizPageMain">
      <div className="QuizPageMain_Section">
        <div className="technologyname">
          <label htmlFor="">Select Technology</label>
          <br />
          <select name="" id="" onChange={handleTechnologyChange}>
            <option value="" defaultValue={true}>
              --Select--
            </option>
            {Object.keys(technologies).map((technology) => {
              return (
                <SelectElementOption key={technology} value={technology}>
                  {technology}
                </SelectElementOption>
              );
            })}
          </select>
        </div>

        <div className="technologyname">
          <label htmlFor="">Select Quiz</label>
          <br />
          <select name="" id="" onChange={handleQuizChange}>
            <option value="" defaultValue={true}>
              --Select--
            </option>
            {selectedTechnology.length > 0
              ? Object.keys(technologies[selectedTechnology]).map((quiz) => {
                  return (
                    // <SelectElementOption key={quiz} value={quiz}>
                    <SelectElementOption
                      key={quiz}
                      display={technologies[selectedTechnology][quiz].quizName}
                      value={quiz}
                    >
                      {quiz}
                    </SelectElementOption>
                  );
                })
              : ""}
          </select>
        </div>
        <div className="questionList">
          {technologies?.[selectedTechnology]?.[selectedQuiz]
            ? technologies[selectedTechnology][selectedQuiz].questions.map(
                (question, i) => (
                  <QuestionBox
                    key={generateRandomString(5)}
                    question={question}
                    questionNumber={i + 1}
                    selectedOptionNumbers={selectedOptionNumbers}
                    setSelectedOptionNumbers={setSelectedOptionNumbers}
                  />
                ),
              )
            : ""}
        </div>
        <div className="SubmitSection">
          {technologies?.[selectedTechnology]?.[selectedQuiz] ? (
            <div className="Submit">
              <button onClick={handleSubmit} className="SubmitBtn">
                Submit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPageMain;
