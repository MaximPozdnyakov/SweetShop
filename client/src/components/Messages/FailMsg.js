import React from "react";

function FailMsg(props) {
  const { msg } = props;

  return <div className="alert alert-dismissible alert-primary">{msg}</div>;
}

export default FailMsg;
