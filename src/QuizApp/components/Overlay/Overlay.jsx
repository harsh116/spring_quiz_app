import "./Overlay.scss";

function Overlay(props) {
  const {
    isOverlayVisible,
    setIsOverlayVisible,
    message,
    children,
    styleOverlay,
    styleOverlayBox,
    okEvent,
    okButtonVisibility = true,
  } = props;

  console.log("children :", children);
  console.log("message :", message);

  const cancelEvent = () => {
    setIsOverlayVisible(false);
  };

  const okEventOverlay = () => {
    okEvent();
    setIsOverlayVisible(false);
  };

  //   if no children elements then children will be empty object
  return (
    <div className="Overlay" style={styleOverlay}>
      <div className="OverlayBox" style={styleOverlayBox}>
        {message && message.length > 0 ? (
          <div className="message">
            <h3>{message}</h3>
          </div>
        ) : (
          ""
        )}

        {children ? children : <></>}

        <div className="actionSection">
          {okButtonVisibility ? (
            <div className="ok">
              <button className="okbtn" onClick={okEventOverlay}>
                Ok
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="cancel">
            <button className="cancelbtn" onClick={cancelEvent}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
