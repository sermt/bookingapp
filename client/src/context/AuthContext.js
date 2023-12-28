import React, { useEffect } from "react";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const AuthContext = React.createContext(INITIAL_STATE);

export const SearchReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
