import "./App.css";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import CounterExecLogin from "./components/CounterExecLogin";
import CustomerPanel from "./components/CustomerPanel";
import CounterExecPanel from "./components/CounterExecPanel";
import AllCountersPanel from "./components/AllCountersPanel";
import { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCounter from "./components/Admin/AdminPanel/AddCounter";
import AdminDashboard from "./components/Admin/AdminDashBoard";
import AddServices from "./components/Admin/AdminPanel/AddService";
import AddCounterExecutive from "./components/Admin/AdminPanel/AddCounterExecutive";
import LoadingBar from "react-top-loading-bar";
import ModifyServices from "./components/Admin/AdminPanel/ModifyServices";
import ViewStats from "./components/Admin/AdminPanel/ViewStats";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <Fragment>
      <LoadingBar
        color="rgb(99 102 241)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress} />} />
          <Route
            path="/login/admin"
            element={<AdminLogin setProgress={setProgress} />}
          />
          <Route
            path="/login/counter-executive"
            element={<CounterExecLogin setProgress={setProgress} />}
          />
          <Route
            path="/counter-executive"
            element={<CounterExecPanel setProgress={setProgress} />}
          />
          <Route
            path="/customer-panel"
            element={<CustomerPanel setProgress={setProgress} />}
          />
          <Route
            path="/all-counter-panel"
            element={<AllCountersPanel setProgress={setProgress} />}
          />
          <Route
            path="/add/counter"
            element={<AddCounter setProgress={setProgress} />}
          />
          <Route
            path="/add/service"
            element={<AddServices setProgress={setProgress} />}
          />
          <Route
            path="/admin/modifyservices"
            element={<ModifyServices setProgress={setProgress} />}
          />
          <Route
            path="/admin/viewstats"
            element={<ViewStats setProgress={setProgress} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard setProgress={setProgress} />}
          />
          <Route
            path="/admin/addcounterexecutive"
            element={<AddCounterExecutive setProgress={setProgress} />}
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
