import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddCounter = () => {
  const navigate = useNavigate();
  const [counterName, setCounterName] = useState("");

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
      <section className="flex flex-col items-center w-full px-5 py-10 space-y-16 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Admin Dashboard Of Adding Counter And Assigning Service To Counter
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Manager of Apli bank
          </h1>
        </div>
        <div className="text-center">
          <h1 className="pb-6 font-medium text-gray-700 text-3xl title-font">
            Add Counter
          </h1>
          <form
            className="items-center px-8 pt-4 pb-8 mb-4 bg-white border-2 border-gray-300 rounded shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (counterName.trim() === "") {
                toast.error("Counter Name must not be empty", {
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
                .put(`http://localhost:8080/add/counter?name=${counterName}`)
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
                    setCounterName("");
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
            }}
          >
            <label htmlFor="name" className="text-lg font-semibold">
              Counter Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={counterName}
              onChange={(e) => setCounterName(e.target.value)}
              className="py-2 pl-4 leading-6 rounded-md shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-80 text-md text-slate-900 placeholder-slate-400 ring-1 ring-slate-200"
              placeholder="Counter Name..."
            />
            <button
              type="submit"
              className="h-10 px-6 mt-12 mb-2 ml-5 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-800"
            >
              Add Counter
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddCounter;
