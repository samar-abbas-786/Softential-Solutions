import React, { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await api.get("/auth/me");
          dispatch({ type: "LOAD_USER", payload: response.data });
        } catch (error) {
          console.error("Load user error:", error);
          dispatch({ type: "AUTH_ERROR" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadUser();
  }, [state.token]);

  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "AUTH_ERROR" });
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const changePassword = async (passwords) => {
    try {
      await api.put("/auth/change-password", passwords);
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error("Change password error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to change password",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
