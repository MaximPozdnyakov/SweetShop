import React from "react";
import FailMsg from "./FailMsg";
import { v4 as uuidv4 } from "uuid";

function FailMessages(props) {
  const { msgs } = props;

  const msgComponents = msgs.map((msg) => <FailMsg key={uuidv4()} msg={msg} />);

  return <div>{msgComponents}</div>;
}

export default FailMessages;
