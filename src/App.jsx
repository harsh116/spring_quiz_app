import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import QuizApp from "./QuizApp/QuizApp";
import Overlay from "./QuizApp/components/Overlay/Overlay";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QuizApp />
      {/* <Overlay /> */}
    </>
  );
}

export default App;
