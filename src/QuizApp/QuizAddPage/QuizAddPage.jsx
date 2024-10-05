import { useDispatch } from "react-redux";
import Nav from "../Nav/Nav";

// import { USER, ADMIN } from "../../store";
import QuizAddMain from "../QuizAddMain/QuizAddMain";

function QuizAddPage(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;
  // const dispatch = useDispatch();

  // const switchToUser = () => {
  //   dispatch({ type: USER });
  // };

  // const switchToAdmin = () => {
  //   dispatch({ type: ADMIN });
  // };

  return (
    <div className="QuizAddPage">
      <Nav userType={"Admin"} />
      <QuizAddMain
        setErrorMessage={setErrorMessage}
        setErrorVisibility={setErrorVisibility}
        setSuccesseMessage={setSuccesseMessage}
        setSuccessMessageVisibility={setSuccessMessageVisibility}
      />
      {/* <h1>Quiz</h1>
      <button onClick={switchToUser}>User </button>
      <button onClick={switchToAdmin}>Admin </button> */}
    </div>
  );
}

export default QuizAddPage;
