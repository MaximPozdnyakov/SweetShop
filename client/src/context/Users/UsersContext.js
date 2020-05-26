import React, { createContext, useEffect, useReducer, useContext } from "react";
import UsersReducer from "./UsersReducer";
import axios from "axios";
import { CartContext } from "../Cart/CartContext";

export const UsersContext = createContext();

export function UsersProvider(props) {
  const [usersState, dispatch] = useReducer(UsersReducer, {
    users: [],
    isAuthenticated: isAuth(),
  });

  const { getCartItems } = useContext(CartContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isAuth() {
    return localStorage.getItem("token") !== null;
  }

  function authorizeAction(token) {
    localStorage.setItem("token", token);
    getCartItems();
    dispatch({
      type: "AUTHORIZE",
      payload: token,
    });
  }

  function logout() {
    axios.post("/api/users/logout");
    localStorage.removeItem("token");
    getCartItems();
    dispatch({
      type: "LOGOUT",
    });
  }

  function getUsers() {
    axios
      .get("/api/users")
      .then((res) => {
        dispatch({
          type: "GET_USERS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addUser(user) {
    axios
      .post("/api/users", user)
      .then((res) => {
        dispatch({
          type: "ADD_USER",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UsersContext.Provider
      value={{
        users: usersState.users,
        addUser,
        authorizeAction,
        isAuthenticated: usersState.isAuthenticated,
        logout,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
