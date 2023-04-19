import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounterExecPanel = () => {
  const [globalQueue, setGlobalQueue] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [activeToken, setActiveToken] = useState({});
  const navigate = useNavigate();

  //fetch data for global,pending queue and active token
  const fetchData = async () => {
    await axios
      .get(`http://localhost:8080/get-global-queue`)
      .then((response) => {
        setGlobalQueue(response.data);
      });

    await axios
      .get(`http://localhost:8080/get-pending-queue`)
      .then((response) => {
        setPendingQueue(response.data);
      });

    await axios
      .get(
        `http://localhost:8080/get-active-token-of-counter?counterId=${localStorage.getItem(
          "counterid"
        )}`
      )
      .then((response) => {
        if (response.data.status) {
          setActiveToken(response.data.globalQueue);
        } else {
          setActiveToken({});
        }
      });
  };

  useEffect(() => {
    //no admin allowed
    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
    //if counter not logged
    if (!localStorage.getItem("counterid")) {
      toast.error("Please login as a Counter Executive First", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login/counter-executive");
    }

    axios.get("http://localhost:8080/get/allSubServices").then((response) => {
      setServiceTypes(response.data);
    });

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const callNext = () => {
    axios
      .get(
        `http://localhost:8080/call-next?counterId=${localStorage.getItem(
          "counterid"
        )}`
      )
      .then((response) => {
        if (response.data) {
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
        fetchData();
      });
  };

  const Serve = async () => {
    axios
      .get(
        `http://localhost:8080/serve-token?counterId=${localStorage.getItem(
          "counterid"
        )}`
      )
      .then((response) => {
        if (response.data) {
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
        fetchData();
      });
  };

  const addToPending = async () => {
    axios
      .get(
        `http://localhost:8080/addtoken-to-pending?counterId=${localStorage.getItem(
          "counterid"
        )}`
      )
      .then((response) => {
        if (response.data) {
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
        fetchData();
      });
  };

  return (
    <section>
      <div className="w-full text-3xl font-semibold text-center py-9">
        Counter No. {localStorage.getItem("counterid")}
      </div>
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex flex-col w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max lg:w-1/3 hover:shadow">
          <div className="flex flex-col w-full space-y-5 text-center">
            <span className="text-2xl font-semibold">Current service</span>
            <div className="flex justify-center w-full space-x-3 btns">
              <button
                type="button"
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-gray-700 w-max hover:text-white"
                onClick={() => {
                  callNext();
                }}
              >
                Call Next
              </button>
              <button
                type="button"
                onClick={() => {
                  addToPending();
                }}
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-yellow-500 w-max hover:text-white"
              >
                Move to Pending
              </button>

              <button
                type="button"
                onClick={() => {
                  Serve();
                }}
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-green-500 w-max hover:text-white"
              >
                Serve
              </button>
            </div>
          </div>
          {activeToken.tokenId ? (
            <table className="text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Type of service</th>
                  <th className="px-4 py-2">Times Called</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={activeToken.tokenId}
                  className="bg-gray-200 border border-gray-300"
                >
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {activeToken.tokenId}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {serviceTypes[activeToken.servicetypeId - 1]}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {activeToken.frequencyOfCalling}
                  </td>
                  <td className="px-4 py-2">{activeToken.status}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <span className="w-full text-center">No active token</span>
          )}
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max md:w-1/2 lg:w-1/4 hover:shadow-xl">
          <span className="w-full text-2xl font-semibold text-center">
            Customer List
          </span>
          {globalQueue.filter((token) => {
            return token.status === "PENDING";
          }).length === 0 ? (
            <span>No token generated</span>
          ) : (
            <table className="w-4/5 text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Service Type</th>
                </tr>
              </thead>
              <tbody>
                {globalQueue.map((item) => {
                  return (
                    item.status === "PENDING" && (
                      <tr
                        key={item.tokenId}
                        className="bg-gray-200 border border-gray-300 "
                      >
                        <td className="px-4 py-2 border-r-2 border-gray-300">
                          {item.tokenId}
                        </td>
                        <td className="px-4 py-2 ">
                          {serviceTypes[item.servicetypeId - 1]}
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max md:w-1/2 lg:w-1/4 hover:shadow-xl">
          <span className="w-full text-2xl font-semibold text-center">
            Pending List
          </span>
          {pendingQueue.length === 0 ? (
            <span className="w-full text-center">No token here</span>
          ) : (
            <table className="w-4/5 text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Service Type</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((item) => (
                  <tr
                    key={item.tokenId}
                    className="bg-gray-200 border border-gray-300 "
                  >
                    <td className="px-4 py-2 border-r-2 border-gray-300">
                      {item.tokenId}
                    </td>
                    <td className="px-4 py-2 ">
                      {serviceTypes[item.servicetypeId - 1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterExecPanel;
