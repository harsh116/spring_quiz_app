import Overlay from "../components/Overlay/Overlay";

function DeleteOverlay(props) {
  const { isOverlayVisible, setIsOverlayVisible, okEventDelete } = props;

  return (
    <Overlay
      message="This will delete your question. Are you sure?"
      isOverlayVisible={isOverlayVisible}
      setIsOverlayVisible={setIsOverlayVisible}
      okEvent={okEventDelete}
    />
  );
}

export default DeleteOverlay;
