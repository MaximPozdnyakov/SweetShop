import React from "react";

function SuccessMsg(props) {
  const { msg } = props;
  if (msg === null) {
    return <></>;
  } else {
    setTimeout(() => localStorage.removeItem("successMsg"), 5000);
    return <div className="alert alert-dismissible alert-success">{msg}</div>;
  }
}

export default SuccessMsg;
