import React, { createContext, useReducer, useContext } from "react";
import UsersReducer from "./UsersReducer";
import axios from "axios";
import { MsgContext } from "../Msg/MsgContext";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext();

export function UsersProvider(props) {
    const { setMsg } = useContext(MsgContext);

    const [usersState, dispatch] = useReducer(UsersReducer, {
        isUserLoaded: false,
        isAuthenticated: false,
        user: {},
    });

    const { isUserLoaded, isAuthenticated, user } = usersState;

    async function getUser() {
        try {
            if (localStorage.getItem("token")) {
                const user = await axios.get("/api/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                if (!user.data.msg) {
                    dispatch({
                        type: "SET_USER",
                        payload: user.data.user,
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } else {
                const user = await axios.get("/api/google-auth/login");
                if (!user.data.msg) {
                    dispatch({
                        type: "SET_USER",
                        payload: user.data.user,
                    });
                } else {
                    if (!localStorage.getItem("guest")) {
                        localStorage.setItem("guest", uuidv4());
                    }
                }
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        dispatch({
            type: "USER_LOADED",
        });
    }

    async function login(credentials) {
        dispatch({
            type: "USER_NOT_LOADED",
        });
        try {
            const user = await axios.post("/api/users/login", credentials);
            if (!user.data.msg) {
                localStorage.setItem("token", user.data.token);
                dispatch({
                    type: "SET_USER",
                    payload: user.data.user,
                });
            } else {
                setMsg(user.data.msg);
                dispatch({
                    type: "USER_LOADED",
                });
                return user.data;
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        dispatch({
            type: "USER_LOADED",
        });
        return user;
    }

    async function register(credentials) {
        dispatch({
            type: "USER_NOT_LOADED",
        });
        try {
            const newUser = await axios.post("/api/users", credentials);
            if (!newUser.data.msg) {
                localStorage.setItem("token", newUser.data.token);
                dispatch({
                    type: "SET_USER",
                    payload: newUser.data.user,
                });
            } else {
                setMsg(newUser.data.msg);
                dispatch({
                    type: "USER_LOADED",
                });
                return newUser.data;
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        dispatch({
            type: "USER_LOADED",
        });
        return user;
    }

    async function logout() {
        dispatch({
            type: "USER_NOT_LOADED",
        });
        try {
            if (localStorage.getItem("token")) {
                const res = await axios.post(
                    "/api/users/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (res.data.msg == "You are logout") {
                    dispatch({
                        type: "LOGOUT",
                    });
                    localStorage.removeItem("token");
                }
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        dispatch({
            type: "USER_LOADED",
        });
        getUser();
    }

    async function googleLogout() {
        dispatch({
            type: "USER_NOT_LOADED",
        });
        try {
            const res = await axios.get("/api/google-auth/logout");
            if (res.data.msg == "You are logout") {
                dispatch({
                    type: "LOGOUT",
                });
            }
        } catch (err) {
            console.log("err :>> ", err);
        }
        window.location = "http://localhost:3000";
        dispatch({
            type: "USER_LOADED",
        });
        getUser();
    }

    return (
        <UsersContext.Provider
            value={{
                login,
                register,
                getUser,
                isUserLoaded,
                isAuthenticated,
                user,
                logout,
                googleLogout,
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
}
