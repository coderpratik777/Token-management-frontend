import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCountertops } from "react-icons/md";
import { BsArrowRightShort, BsPersonWorkspace,BsDatabaseFillAdd } from "react-icons/bs";
import { IoIosOptions } from "react-icons/io";
import { ImStatsDots } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("adminId")) {
      toast.error("Login as a admin first.", {
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
    }
  }, [navigate]);
  return (
    <>
      <section className="flex flex-col items-center w-full px-5 py-10 lg:py-24 md:space-y-24 space-y-10 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Admin Dashboard
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Manager of Apli bank
          </h1>
        </div>
        <div className="flex flex-wrap w-full px-8 lg:px-16">
          <Link
            className="flex items-center flex-shrink flex-grow m-2 p-4 lg:p-8 md:space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
            to="/add/counter"
          >
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
              <MdOutlineCountertops className="text-xl" />
            </div>
            <h2 className="ml-3 md:text-lg font-medium text-gray-900">
              Add New Counter
            </h2>
            <BsArrowRightShort className="text-xl text-indigo-500 ml-3" />
          </Link>
          <Link
            className="flex items-center flex-shrink flex-grow m-2 p-4 lg:p-8 md:space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
            to="/add/service"
          >
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
              <BsDatabaseFillAdd />
            </div>
            <h2 className="ml-3 md:text-lg font-medium text-gray-900 ">
              Add Service
            </h2>
            <BsArrowRightShort className="text-xl text-indigo-500 ml-3" />
          </Link>
          <Link
            className="flex items-center flex-shrink flex-grow m-2 p-4 lg:p-8 md:space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
            to="/admin/addcounterexecutive"
          >
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
              <BsPersonWorkspace />
            </div>
            <h2 className="ml-3 md:text-lg font-medium text-gray-900 ">
              Add Counter Executive
            </h2>
            <BsArrowRightShort className="text-xl text-indigo-500 ml-3" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row">
          <Link
            className="flex m-2 items-center p-4 lg:p-8 md:space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
            to="/admin/modifyservices"
          >
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
              <IoIosOptions />
            </div>
            <h2 className="ml-3 md:text-lg font-medium text-gray-900 ">
              Modify Services
            </h2>
            <BsArrowRightShort className="text-xl text-indigo-500 ml-3" />
          </Link>
          <Link
            className="flex m-2 items-center p-4 lg:p-8 md:space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
            to="/admin/viewstats"
          >
            <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
              <ImStatsDots />
            </div>
            <h2 className="ml-3 md:text-lg font-medium text-gray-900 ">
              View Stats
            </h2>
            <BsArrowRightShort className="text-xl text-indigo-500 ml-3" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
