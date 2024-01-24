import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const Like = () => {
  const isLoggedIn = localStorage.getItem("token");

  // If the user is not logged in, navigate to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, you can place the rest of the code for the "like" view here
  // ...

  return (
    <div>
      {/* The rest of the code for the "like" view */}
      <h1>Your Like Page</h1>
    </div>
  );
};

export default Like;