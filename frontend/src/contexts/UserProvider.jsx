import React, { useEffect, useState } from "react";
import UserContext from "./user";

const UserProvider = (props) => {
  const [accessToken, setAccessToken] = useState(null);

  // Load token from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAccessToken(token);
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (accessToken) localStorage.setItem("access_token", accessToken);
    else localStorage.removeItem("access_token"); // clear the local storage if user logs out (need to do this because upon logging out, only the userContext will be cleared but not the local storage)
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
