import React, { useEffect, useState } from "react";
import authService from "./api-authorization/AuthorizeService";
import LoginForm from "./LoginForm";
import "./Styles/SideMenu.css";

export default function Sidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // authService.isAuthenticated().then((result) => setIsAuthenticated(result));
  }, []);

  return <div className="side-menu">{!isAuthenticated && <LoginForm />}</div>;
}
