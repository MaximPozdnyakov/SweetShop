import React, { createContext, useEffect, useReducer } from 'react';
import UsersReducer from './UsersReducer';
import axios from 'axios';

export const UsersContext = createContext();

export function UsersProvider(props) {
  const [usersState, dispatch] = useReducer(UsersReducer, []);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUsers() {
    axios
      .get('/api/users')
      .then((res) => {
        dispatch({
          type: 'GET_USERS',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addUser(user) {
    axios
      .post('/api/users', user)
      .then((res) => {
        dispatch({
          type: 'ADD_USER',
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
        users: usersState,
        addUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
