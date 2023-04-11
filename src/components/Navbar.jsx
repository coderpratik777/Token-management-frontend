import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container flex p-4 flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row w-full md:w-max justify-center items-center">
            <Link
              to="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="text-xl">Bank Token System</span>
            </Link>
            {localStorage.getItem("adminId") && (
              <Link to="/admin/dashboard" className="md:ml-5 ">Admin Dashboard</Link>
            )}
          </div>

          {!(
            localStorage.getItem("counterid") || localStorage.getItem("adminId")
          ) && (
            <nav className="flex flex-wrap space-x-12 items-center text-base justify-center">
              <Link to="/login/admin" className=" hover:text-gray-900">
                Admin Login
              </Link>
              <Link
                to="/login/counter-executive"
                className=" hover:text-gray-900"
              >
                Counter Executive Login
              </Link>
            </nav>
          )}
          {(localStorage.getItem("adminId") ||
            localStorage.getItem("counterid")) && (
            <button
              type="button"
              onClick={() => {
                if (localStorage.getItem("adminId")) {
                  localStorage.removeItem("adminId");
                  toast.success("Bye..", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  navigate("/login/admin");
                } else {
                  axios
                    .put(
                      `http://localhost:8080/logout/counterExecutive?counterId=${parseInt(
                        localStorage.getItem("counterid")
                      )}`
                    )
                    .then((response) => {
                      if (response.data.status) {
                        toast.success(response.data.messsageIfAny, {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        localStorage.removeItem("counterid");
                        localStorage.removeItem("cExecId");
                        navigate("/login/counter-executive");
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
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
