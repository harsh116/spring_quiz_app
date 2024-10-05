import GenerateQuizMain from "../GenerateQuizMain/GenerateQuizMain";
import Nav from "../Nav/Nav";

import "./GenerateQuizPage.scss";

function GenerateQuizPage(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;
  return (
    <div className="GenerateQuizPage">
      <Nav isMessageVisible={false} userType="Admin" />

      <GenerateQuizMain
        setErrorMessage={setErrorMessage}
        setErrorVisibility={setErrorVisibility}
        setSuccesseMessage={setSuccesseMessage}
        setSuccessMessageVisibility={setSuccessMessageVisibility}
      />
    </div>
  );
}

export default GenerateQuizPage;
