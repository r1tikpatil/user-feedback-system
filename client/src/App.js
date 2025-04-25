import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages
import FeedbackForm from "./pages/feedbackForm/index.page";
import Dashboard from "./pages/dashboard/index.page";
import Analytics from "./pages/analytics/index.page";
import Layout from "./components/layout/index.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedbackForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
