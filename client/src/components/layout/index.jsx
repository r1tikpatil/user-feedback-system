import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>User Feedback System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Submit Feedback</Link>
            </li>
            <li>
              <Link to="/dashboard">View Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
