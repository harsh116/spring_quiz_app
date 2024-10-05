import Nav from "../Nav/Nav";

import "./ShowUserResponsePage.scss";
import ShowUserResponseMain from "../ShowUserResponseMain/ShowUserResponseMain";

function ShowUserResponsePage(props) {
  return (
    <div className="ShowUserResponsePage">
      <Nav isMessageVisible={false} userType={"Admin"} />
      <ShowUserResponseMain />
    </div>
  );
}

export default ShowUserResponsePage;
