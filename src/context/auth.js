import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
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

  const router = useRouter();

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await axios.get("/auth/me");

        if (res.data.type === "success") {
          dispatch("LOGIN", res.data.data.user);
          return;
        }

        router.push("/auth/login");
      } catch (error) {
        router.push("/auth/login");
      } finally {
        dispatch("LOADING", false);
      }
    }

    fetchCurrentUser();
  }, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {state.isLoading ? (
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Loading...</h1>
          </div>
        ) : (
          children
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
