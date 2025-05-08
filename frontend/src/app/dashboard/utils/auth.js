const Auth = {
  getToken: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token");
    }
    return null; // Return null if called server-side
  },

  setToken: (token) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
    }
  },

  getUser: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("user");
    }
    return null; // Return null if called server-side
  },

  setUser: (userData) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", userData);
    }
  },

  removeUsername: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("username");
    }
  },

  isLoggedIn: () => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("token");
    }
    return false; // Return false if called server-side
  },
};

export default Auth;
