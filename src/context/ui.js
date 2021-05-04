import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  isLoading: false,
  snackbar: {},
};

const StateContext = createContext(initialState);

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return {
        ...state,
        isLoading: payload,
      };

    case "SNACKBAR":
      return {
        ...state,
        snackbar: payload,
      };

    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const UIProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useUIState = () => useContext(StateContext);
export const useUIDispatch = () => useContext(DispatchContext);
