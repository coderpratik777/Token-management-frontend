import "./App.css";


import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import CounterExecLogin from "./components/CounterExecLogin";
import CounterPanel from "./components/AllCountersPanel";
import AdminPanel from "./components/AdminPanel";
import CustomerPanel from "./components/CustomerPanel";
import CounterExecPanel from "./components/CounterExecPanel";
import AllCountersPanel from "./components/AllCountersPanel";
import Counter from "./components/Counter";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
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
          
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
