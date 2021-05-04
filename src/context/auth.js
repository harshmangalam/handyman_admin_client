import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
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

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, token: "" };

    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await axios.get("/auth/me");

        dispatch("LOGIN", res.data.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCurrentUser();
  }, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
