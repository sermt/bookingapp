import React from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = React.createContext(INITIAL_STATE);

export const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
