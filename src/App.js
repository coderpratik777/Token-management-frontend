import "./App.css";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import CounterExecLogin from "./components/CounterExecLogin";
import AdminPanel from "./components/Admin/AdminPanel";
import CustomerPanel from "./components/CustomerPanel";
import CounterExecPanel from "./components/CounterExecPanel";
import AllCountersPanel from "./components/AllCountersPanel";
import Counter from "./components/Counter";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCounter from "./components/Admin/AdminPanel/AddCounter";
import AdminDashboard from "./components/Admin/AdminDashBoard";
import AddServices from "./components/Admin/AdminPanel/AddService";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route
            path="/login/counter-executive"
            element={<CounterExecLogin />}
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/counter-executive" element={<CounterExecPanel />} />
          <Route path="/customer-panel" element={<CustomerPanel />} />
          <Route path="/all-counter-panel" element={<AllCountersPanel />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/Add/Counter" element={<AddCounter />} />
          <Route path="/Add/Service" element={<AddServices />} />
          <Route path="/Admin/Dashboard" element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
