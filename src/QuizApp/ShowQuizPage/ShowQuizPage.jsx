// {{REWRITTEN_CODE}}
import Nav from "../Nav/Nav"; // Import the navigation component
import ShowQuizMain from "../showQuizMain/ShowQuizMain"; // Import the main quiz display component
import "./ShowQuizPage.scss"; // Import the stylesheet for this component

/**
 * ShowQuizPage component renders the main quiz page.
 * @param {object} props - The props passed to the component.
 * @returns {JSX.Element} - The JSX element representing the quiz page.
 */
function ShowQuizPage(props) {
  const {
    setErrorVisibility,
    setErrorMessage,
    setSuccesseMessage,
    setSuccessMessageVisibility,
  } = props;
  return (
    <div className="ShowQuizPage">
      <Nav isMessageVisible={false} userType={"Admin"} />{" "}
      {/* Render the navigation bar with admin user type */}
      <ShowQuizMain
        setErrorMessage={setErrorMessage}
        setErrorVisibility={setErrorVisibility}
        setSuccesseMessage={setSuccesseMessage}
        setSuccessMessageVisibility={setSuccessMessageVisibility}
      />{" "}
      {/* Render the main quiz display component */}
    </div>
  );
}

export default ShowQuizPage;
