import { useEffect, useState } from "react";
import "./ShowQuizMain.scss";
import { questions } from "./questions";
import Overlay from "../components/Overlay/Overlay";
import DeleteOverlay from "./DeleteOverlay";
import EditOverlay from "./EditOverlay/EditOverlay";
import { useDispatch, useSelector } from "react-redux";
import { SET_QUESTIONS } from "../../store";
import { BACKEND_HOST } from "../../constants";

const getQuestionIndexById = (questions, qid) => {
  //   console.log("in getquestionindexbyid: ", questions, qid,": ",questions.size);
  for (let i = 0; i < questions.length; i++) {
    // console.log("🚀 ~ getQuestionIndexById ~ i:", i);

    if (questions[i].id === qid) {
      return i;
    }
  }

  return -1;
};

const deleteQuestionById = (questions, qid) => {
  const questionsNew = [...questions];

  // console.log("questionsID: ", qid);

  const questionIndex = getQuestionIndexById(questions, qid);

  questionsNew.splice(questionIndex, 1);

  return questionsNew;
};

function Option(props) {
  const { option, optionNumber, correctOptionNumber } = props;

  const optionLetter = "abcdefgh"[optionNumber - 1];

  return (
    <div
      className={`QuestionBox_Options_Option ${
        optionNumber === correctOptionNumber ? "correct" : ""
      }`}
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
    setIsDeleteOverlayVisible,
    setQuestionSelectedID,
    setIsEditOverlayVisible,
    setQuestionSelected,
    questionObj,
  } = props;

  // console.log("question in questionBox: ", question);

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
      <div className="headerSection">
        <div className="col1">
          <h4 className="technologyText"> {`Technology : ${technology}`}</h4>
        </div>
        <div className="col2">
          <div className="update">
            <button
              title="edit"
              onClick={() => {
                setQuestionSelected(questionObj);
                setIsEditOverlayVisible(true);
              }}
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>

          <div className="delete">
            <button
              title="delete"
              onClick={() => {
                //opening deleteoverlay and storing question id as current selected question
                // console.log("question.id: ", question.id);
                setQuestionSelectedID(questionObj.id);
                setIsDeleteOverlayVisible(true);
              }}
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowQuizMain(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;
  const dispatch = useDispatch();
  const [expandOrCollapse, setExpandOrCollapse] = useState("");
  const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false);
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false);

  const questionsReduxStore = useSelector((state) => state.questions);
  const sessionToken = useSelector((state) => state.sessionToken);

  // array of questions [question]
  const [questionsStore, setQuestionsStore] = useState(questionsReduxStore);

  // question.id
  const [questionSelectedID, setQuestionSelectedID] = useState("");

  // question
  const [questionSelected, setQuestionSelected] = useState({});

  // if isDeleteOverlayVisible change detected and if overlay is closed then it means no question is selected for edit or delete
  useEffect(() => {
    if (isDeleteOverlayVisible === false) {
      setQuestionSelectedID("");
      setQuestionSelected({});
    }
  }, [isDeleteOverlayVisible]);

  useEffect(() => {
    console.log("questinStore: ", questionsStore);
    dispatch({ type: SET_QUESTIONS, payload: questionsStore });
  }, [questionsStore]);

  const okEventDelete = async () => {
    // console.log("🚀 ~ okEventDelete ~ questionSelectedID:", questionSelectedID);

    const questionsStoreNew = deleteQuestionById(
      questionsStore,
      questionSelectedID,
    );
    // console.log("questionStore: ", questionsStore);
    //
    //
    try {
      const res = await fetch(
        `${BACKEND_HOST}/deleteQuestion/${questionSelectedID}`,
        {
          method: "delete",
          headers: {
            sessionToken: sessionToken,
          },
          mode: "cors",
        },
      );

      if (res.status === 401) {
        throw new Error("Unauthrorized");
      } else if (res.status === 500) {
        throw new Error("Something went wrong");
      } else if (res.status === 404) {
        throw new Error("Not found");
      }

      const deletedQuestion = await res.json();

      console.log("deletedQuestion: ", deletedQuestion);
      setQuestionsStore(questionsStoreNew);
      setSuccesseMessage("Question deleted successfully");
      setSuccessMessageVisibility(true);
    } catch (err) {
      console.log("err: ", err);
      setErrorMessage(err.message);
      setErrorVisibility(true);
    }
  };

  return (
    <div className="ShowQuizMain">
      {isDeleteOverlayVisible ? (
        <DeleteOverlay
          isOverlayVisible={isDeleteOverlayVisible}
          setIsOverlayVisible={setIsDeleteOverlayVisible}
          okEventDelete={okEventDelete}
        />
      ) : (
        ""
      )}
      {isEditOverlayVisible ? (
        <EditOverlay
          isOverlayVisible={isEditOverlayVisible}
          setIsOverlayVisible={setIsEditOverlayVisible}
          questionSelected={questionSelected}
          setQuestionsStore={setQuestionsStore}
          questionsStore={questionsStore}
          setErrorMessage={setErrorMessage}
          setErrorVisibility={setErrorVisibility}
          setSuccesseMessage={setSuccesseMessage}
          setSuccessMessageVisibility={setSuccessMessageVisibility}
        />
      ) : (
        ""
      )}
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
        {questionsStore.map((question, i) => (
          <QuestionBox
            key={question.id}
            technology={question.technology}
            questionNumber={i + 1}
            question={question.question}
            options={question.options}
            correctOptionNumber={question.correctOptionNumber}
            expandOrCollapse={expandOrCollapse}
            setIsDeleteOverlayVisible={setIsDeleteOverlayVisible}
            setQuestionSelectedID={setQuestionSelectedID}
            setIsEditOverlayVisible={setIsEditOverlayVisible}
            setQuestionSelected={setQuestionSelected}
            questionObj={question}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowQuizMain;
