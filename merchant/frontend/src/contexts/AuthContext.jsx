import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { urlBackend } from "../constants/Constant";
import { authReducer } from "../reducers/authReducer";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    account: null,
    actor: null,
  });

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Authenticate user
  const loadUser = async () => {
    if (localStorage["auth"]) {
      setAuthToken(localStorage["auth"]);
    }

    try {
      const response = await axios.get(`${urlBackend}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
   
      } else {
        localStorage.removeItem("auth");
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
      }
	  return response.data
    } catch (error) {
      localStorage.removeItem("auth");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
	  return error;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${urlBackend}/auth/login`,
        userForm
      );
      if (response.data.success)
      {localStorage.setItem("auth", response.data.accessToken);
      const loadResult= await loadUser();
      return loadResult;

}
      else {
        localStorage.removeItem("auth");
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
        return null;
      }


    } catch (error) {
      localStorage.removeItem("auth");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem("auth");
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    window.location.replace('/')
  };

  // Context data
  const { user, isAuthenticated}=authState;
  const authContextData = { loginUser, logoutUser, user, isAuthenticated };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
