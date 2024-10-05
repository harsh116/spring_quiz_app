import { useDispatch, useSelector } from "react-redux";
import "./QuizAddMain.scss";
import { SET_QUESTIONS } from "../../store";
import { BACKEND_HOST } from "../../constants";

function QuizAddMain(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;
  const sessionToken = useSelector((state) => state.sessionToken);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const submitData = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_HOST}/addQuestion`, {
        method: "POST",
        mode: "cors",
        headers: {
          sessionToken: sessionToken,
        },
        body: formData,
      });

      if (res.status === 500) {
        throw new Error("cant add question due to some error");
      }
      const data = await res.json();

      console.log("addedQuestionData: ", data);
      return data;
    } catch (err) {
      console.log("addquestion err: ", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    if (formDataObj["correctOption"].length === 0) {
      alert("Please set the correct option too");
      return;
    }

    console.log(formData);

    try {
      const questionObj = await submitData(formData);
      // if there is no error and the object is non empty then update questions store
      if (questionObj.id > 0) {
        dispatch({ type: SET_QUESTIONS, payload: [...questions, questionObj] });
        setSuccesseMessage("Question added");
        setSuccessMessageVisibility(true);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setErrorVisibility(true);
    }
  };

  return (
    <div className="QuizAddMain">
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
          ></textarea>
          <br />
          <br />
          <label htmlFor="">Options:</label>
          <br />

          <input type="text" placeholder="Option 1" name="option1" required />
          <br />
          <input type="text" placeholder="Option 2" name="option2" required />
          <br />
          <input type="text" placeholder="Option 3" name="option3" />
          <br />
          <input type="text" placeholder="Option 4" name="option4" />
          <br />
          <label htmlFor="">Correct Solution:</label>
          <br />
          <select name="correctOption" id="">
            <option value="" defaultValue>
              Select correct solution
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <br />
          <label htmlFor="">Technology</label>
          <input type="text" name="technology" id="" required />
          <br />
          <button>Add Question</button>
        </form>
      </div>
    </div>
  );
}

export default QuizAddMain;
