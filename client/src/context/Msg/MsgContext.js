import React, { createContext, useReducer } from "react";
import MsgReducer from "./MsgReducer";

export const MsgContext = createContext();

export function MsgProvider(props) {
    const [msgState, dispatch] = useReducer(MsgReducer, {
        msg: "",
    });

    const { msg } = msgState;

    function setMsg(msg) {
        dispatch({
            type: "SET_MSG",
            payload: msg,
        });
    }

    return (
        <MsgContext.Provider
            value={{
                setMsg,
                msg,
            }}
        >
            {props.children}
        </MsgContext.Provider>
    );
}
