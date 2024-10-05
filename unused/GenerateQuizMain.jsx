import "./GenerateQuizMain.scss";

function GenerateQuizMain(props) {
  return (
    <div className="GenerateQuizMain">
      <div className="GenerateQuizMain_Section">
        <div className="quizname">
          <label htmlFor="">Enter Quiz Name</label>
          <br />
          <input type="text" />
        </div>
        <div className="technologyname">
          <label htmlFor="">Select Technology</label>
          <br />
          <select name="" id="">
            <option value="null" defaultValue={true}>
              --Select--
            </option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="generateQuiz">
          <button className="generateQuizBtn">Generate Quiz</button>
        </div>
        <div className="selectDeselectOptions">
          <button className="selectall">Select All</button>
          <button className="selectnone">Select None</button>
        </div>
        <div className="questionsList">
          <div className="Question">
            <div className="col1">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="col2">
              <span>
                What is Java? What is Java? What is Java? What is Java? What is
                Java? What is Java? What is Java? What is Java? What is Java?
                What is Java? What is Java? What is Java? What is Java?
              </span>
            </div>
          </div>
          <hr />
          <div className="Question">
            <div className="col1">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="col2">
              <span>
                What is Java? What is Java? What is Java? What is Java? What is
                Java? What is Java? What is Java? What is Java? What is Java?
                What is Java? What is Java? What is Java? What is Java?
              </span>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default GenerateQuizMain;
