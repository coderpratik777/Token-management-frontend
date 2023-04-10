import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounterExecLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counterId, setCounterId] = useState(0);

  const [counters, setCounters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //no need to come here if already logged in
    if (localStorage.getItem("counterid")) {
      navigate("/counter-executive");
    }
    //admin not allowed here
    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
    axios
      .get("http://localhost:8080/get/counters")
      .then((response) => {
        setCounters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const submit = () => {
    if (counterId === 0) {
      toast.warning("Select counter to login", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    axios
      .post(
        "http://localhost:8080/login/counterExecutive",
        { username, password, counterId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem(
            "counterid",
            JSON.stringify(response.data.counterId)
          );
          toast.success("Welcome back!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setUsername("");
          setPassword("");
          setCounterId(0);
          navigate("/counter-executive");
        } else {
          toast.error(response.data.messsageIfAny, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <section className="">
      <div className="flex flex-col items-center px-6 mx-auto py-12 lg:py-24">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight w-full text-center tracking-tight text-gray-900 md:text-2xl ">
              Counter Executive
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="JhonDoe"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  autoComplete="on"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="counter"
                  className="mb-2 font-medium text-gray-900 "
                >
                  Counter You want to login.
                </label>
                <select
                  name="counter"
                  id="counter"
                  value={counterId}
                  onChange={(e) => {
                    setCounterId(+e.target.value);
                  }}
                  className=" bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select</option>
                  {counters.map((e) => {
                    return (
                      e.isActive === 0 && (
                        <option key={e.id} value={e.id}>
                          {e.counterName}
                        </option>
                      )
                    );
                  })}
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterExecLogin;
