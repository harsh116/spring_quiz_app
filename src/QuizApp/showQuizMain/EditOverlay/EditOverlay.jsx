import { useSelector } from "react-redux";
import Overlay from "../../components/Overlay/Overlay";
import "./EditOverlay.scss";
import { BACKEND_HOST } from "../../../constants";

const styleOverlay = {};
const styleOverlayBox = { width: "400px", aspectRatio: "2/3" };

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

function EditOverlay(props) {
  const sessionToken = useSelector((state) => state.sessionToken);

  const {
    isOverlayVisible,
    setIsOverlayVisible,
    questionSelected,
    setQuestionsStore,
    questionsStore,

    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;

  console.log("questionSelected.options[3]: ", questionSelected.options[3]);

  const submitData = async (formData, questionID) => {
    const res = await fetch(`${BACKEND_HOST}/editQuestion/${questionID}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        sessionToken: sessionToken,
      },
      body: formData,
    });

    if (res.status === 401) {
      throw new Error("Unauthrorized");
    } else if (res.status === 500) {
      throw new Error("Something went wrong");
    } else if (res.status === 404) {
      throw new Error("Not found");
    }

    const data = await res.json();

    console.log("postdataGot: ", data);

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    console.log("formdataobj: ", formDataObj);

    // const questionObj = {};

    // questionObj["username"] = formDataObj["username"];

    const questionsStoreNew = [...questionsStore];

    const qindex = getQuestionIndexById(questionsStoreNew, questionSelected.id);

    questionsStoreNew[qindex]["question"] = formDataObj["question"];
    questionsStoreNew[qindex]["technology"] = formDataObj["technology"];
    questionsStoreNew[qindex]["correctOptionNumber"] = Number(
      formDataObj["correctOption"],
    );
    formDataObj?.["option1"]
      ? (questionsStoreNew[qindex]["options"][0] = formDataObj?.["option1"])
      : "";
    formDataObj?.["option2"]
      ? (questionsStoreNew[qindex]["options"][1] = formDataObj?.["option2"])
      : "";
    formDataObj?.["option3"]
      ? (questionsStoreNew[qindex]["options"][2] = formDataObj?.["option3"])
      : "";
    formDataObj?.["option4"]
      ? (questionsStoreNew[qindex]["options"][3] = formDataObj?.["option4"])
      : "";

    try {
      const question = await submitData(formData, questionSelected.id);
      if (question?.id > 0) {
        setQuestionsStore(questionsStore);
        setSuccesseMessage("Quested edited successfully");
        setSuccessMessageVisibility(true);
      } else {
        console.log("couldn't update question");
        setErrorMessage("couldn't update question due to some error");
        setErrorVisibility(true);
      }
    } catch (err) {
      console.log("postfetch err: ", err);
      setErrorMessage(err.message);
      setErrorVisibility(true);
    }
  };
  return (
    <Overlay
      isOverlayVisible={isOverlayVisible}
      setIsOverlayVisible={setIsOverlayVisible}
      styleOverlay={styleOverlay}
      styleOverlayBox={styleOverlayBox}
      okEvent={() => {}}
      okButtonVisibility={false}
    >
      <div className="EditOverlay">
        <div className="QuizAddSection">
          <h1>Admin Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Question:</label>
            <br />
            <textarea
              placeholder="Enter Question"
              name="question"
              id=""
              required
            >
              {questionSelected.question}
            </textarea>
            <br />
            <br />
            <label htmlFor="">Options:</label>
            <br />

            <input
              type="text"
              placeholder="Option 1"
              name="option1"
              defaultValue={questionSelected.options[0]}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Option 2"
              name="option2"
              //   value={questionSelected.options[1]}
              defaultValue={questionSelected.options[1]}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Option 3"
              name="option3"
              defaultValue={questionSelected.options[2]}
            />
            <br />
            <input
              type="text"
              placeholder="Option 4"
              name="option4"
              defaultValue={questionSelected.options[3]}
            />
            <br />
            <label htmlFor="">Correct Solution:</label>
            <br />
            <select name="correctOption" id="">
              <option
                value=""
                selected={questionSelected.correctOptionNumber ? false : true}
              >
                Select correct solution
              </option>
              <option
                value="1"
                selected={
                  questionSelected.correctOptionNumber === 1 ? true : false
                }
              >
                1
              </option>
              <option
                value="2"
                selected={
                  questionSelected.correctOptionNumber === 2 ? true : false
                }
              >
                2
              </option>
              <option
                value="3"
                selected={
                  questionSelected.correctOptionNumber === 3 ? true : false
                }
              >
                3
              </option>
              <option
                value="4"
                selected={
                  questionSelected.correctOptionNumber === 4 ? true : false
                }
              >
                4
              </option>
            </select>
            <br />
            <label htmlFor="">Technology</label>
            <input
              type="text"
              name="technology"
              id=""
              value={questionSelected.technology}
              required
            />
            <br />
            <button>Edit Question</button>
          </form>
        </div>
      </div>
    </Overlay>
  );
}

export default EditOverlay;
