import React, { createContext, useReducer, useEffect } from 'react';
import jwt from 'jwt-decode';

import authReducer from './authReducer';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [kinderCubby_auth, dispatch] = useReducer(authReducer, {}, () => {
    const localData = localStorage.getItem('kinderCubby_auth');
    return localData ? JSON.parse(localData) : {};
  });


  const login = async data => {
    let user = jwt(data.access_token);
    console.log('user', user);
    dispatch({
      type: 'LOGIN',
      payload: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        exp: user.exp,
        name: user.name,
        email: user.email,
      },
    });
  };

  const logout = () => {
    localStorage.setItem('timer', '');
    dispatch({
      type: 'LOGOUT',
      payload: {},
    });
  };

  // const signup = async (name, email, password) => {
  //   const token = await axios.post("http://localhost:4000/api/user/register", {
  //     name,
  //     email,
  //     password,
  //   });
  //   if (token.data.error) {
  //     localStorage.setItem("error", token.data.error);
  //   } else {
  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         token: token.data,
  //       },
  //     });
  //   }
  // };

  useEffect(() => {
    localStorage.setItem('kinderCubby_auth', JSON.stringify(kinderCubby_auth));
  }, [login]);

  return <AuthContext.Provider value={{ login, kinderCubby_auth, logout }}>{props.children}</AuthContext.Provider>;
}
