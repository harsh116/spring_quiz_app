import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";

const ToastEle = (props) => {
  const toast = useRef(null);

  const {
    errorMessage,
    errorVisibility,
    setErrorVisibility,
    successMessage,
    successMessageVisibility,
    setSuccessMessageVisibility,
  } = props;

  const showError = () => {
    toast.current.show({ severity: "error", detail: errorMessage, life: 3000 });
  };

  const showSuccessMessage = () => {
    toast.current.show({
      severity: "success",
      detail: successMessage,
      life: 3000,
    });
  };

  useEffect(() => {
    if (errorVisibility === true) {
      showError();
      setErrorVisibility(false);
    }

    if (successMessageVisibility === true) {
      showSuccessMessage();
      setSuccessMessageVisibility(false);
    }
  }, [errorVisibility, successMessageVisibility]);

  return <Toast ref={toast} position="top-center" />;
};

export default ToastEle;
