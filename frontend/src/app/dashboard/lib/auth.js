export const Auth = {
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

  getUsername: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("username");
    }
    return null; // Return null if called server-side
  },

  setUsername: (username) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("username", username);
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
