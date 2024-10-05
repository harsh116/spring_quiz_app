import Nav from "../Nav/Nav";

import "./ReviewAnswerPage.scss";
import ReviewAnswersMain from "../ReviewAnswersMain/ReviewAnswersMain";

function ReviewAnswerPage(props) {
  return (
    <div className="ReviewAnswerPage">
      <Nav isMessageVisible={false} userType={"User"} />
      <ReviewAnswersMain />
    </div>
  );
}

export default ReviewAnswerPage;
