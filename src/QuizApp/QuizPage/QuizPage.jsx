import Nav from "../Nav/Nav";
import QuizPageMain from "../QuizPageMain/QuizPageMain";
import "./QuizPage.scss";

function QuizPage(props) {
  const { setErrorVisibility, setErrorMessage } = props;
  return (
    <div className="QuizPage">
      <Nav userType={"User"} />
      <QuizPageMain
        setErrorMessage={setErrorMessage}
        setErrorVisibility={setErrorVisibility}
      />
    </div>
  );
}

export default QuizPage;
