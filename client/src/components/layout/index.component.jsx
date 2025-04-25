import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppContainer,
  AppHeader,
  HeaderTitle,
  Nav,
  AppMain,
} from "./index.style";

const Layout = () => {
  return (
    <AppContainer>
      <AppHeader>
        <HeaderTitle>User Feedback System</HeaderTitle>
        <Nav>
          <ul>
            <li>
              <Link to="/">Submit Feedback</Link>
            </li>
            <li>
              <Link to="/dashboard">View Dashboard</Link>
            </li>
          </ul>
        </Nav>
      </AppHeader>

      <AppMain>
        <Outlet />
      </AppMain>
    </AppContainer>
  );
};

export default Layout;
