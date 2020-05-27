import React, { createContext, useReducer, useContext } from "react";
import UsersReducer from "./UsersReducer";
import axios from "axios";
import { CartContext } from "../Cart/CartContext";

export const UsersContext = createContext();

export function UsersProvider(props) {
  const [usersState, dispatch] = useReducer(UsersReducer, {
    isAuthenticated: isAuth(),
  });

  const { getCartItems } = useContext(CartContext);

  function isAuth() {
    return localStorage.getItem("token") !== null;
  }

  function authorizeAction(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    getCartItems();
    dispatch({
      type: "AUTHORIZE",
    });
  }

  function logout() {
    axios.post("/api/users/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    getCartItems();
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <UsersContext.Provider
      value={{
        authorizeAction,
        isAuthenticated: usersState.isAuthenticated,
        logout,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
