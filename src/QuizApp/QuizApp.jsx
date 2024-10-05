import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css"; //

// import GenerateQuizMain from "./GenerateQuizMain/GenerateQuizMain";
import GenerateQuizPage from "./GenerateQuizPage/GenerateQuizPage";
import LoginPage from "./LoginPage/LoginPage";
// import Nav from "./Nav/Nav";

import QuizPage from "./QuizPage/QuizPage";
import ReviewAnswerPage from "./ReviewAnswerPage/ReviewAnswerPage";
import ShowUserResponsePage from "./ShowUserResponsePage/ShowUserResponsePage";
import QuizAddPage from "./QuizAddPage/QuizAddPage";
import ShowQuizPage from "./ShowQuizPage/ShowQuizPage";
import ToastEle from "./Toast/Toast";
import { useState } from "react";

function QuizApp(props) {
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessageVisibility, setSuccessMessageVisibility] =
    useState(false);
  const [successMessage, setSuccesseMessage] = useState("");

  // return <QuizPage />;
  // return <GenerateQuizPage />;
  // return <ReviewAnswerPage />;
  // return <ShowUserResponsePage />;
  // return <LoginPage />;

  return (
    <>
      <PrimeReactProvider>
        <ToastEle
          errorVisibility={errorVisibility}
          errorMessage={errorMessage}
          setErrorVisibility={setErrorVisibility}
          successMessageVisibility={successMessageVisibility}
          setSuccessMessageVisibility={setSuccessMessageVisibility}
          successMessage={successMessage}
        />
      </PrimeReactProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <QuizAddPage
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
                setSuccesseMessage={setSuccesseMessage}
                setSuccessMessageVisibility={setSuccessMessageVisibility}
              />
            }
          />
          <Route
            path="/user"
            element={
              <QuizPage
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
              />
            }
          />
          <Route path="/user/review" element={<ReviewAnswerPage />} />
          <Route
            path="/admin/show-question"
            element={
              <ShowQuizPage
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
                setSuccesseMessage={setSuccesseMessage}
                setSuccessMessageVisibility={setSuccessMessageVisibility}
              />
            }
          />
          <Route
            path="/admin/generate-quiz"
            element={
              <GenerateQuizPage
                setErrorMessage={setErrorMessage}
                setErrorVisibility={setErrorVisibility}
                setSuccesseMessage={setSuccesseMessage}
                setSuccessMessageVisibility={setSuccessMessageVisibility}
              />
            }
          />
          <Route
            path="/admin/validate-answer"
            element={<ShowUserResponsePage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default QuizApp;
