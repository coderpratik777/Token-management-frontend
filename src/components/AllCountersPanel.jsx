import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AllCountersPanel = (props) => {
  const { setProgress } = props;
  const [userTokens, setUserTokens] = useState([]);
  const [userTokenData, setUserTokenData] = useState([]);
  const [counters, setCounters] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .get("http://localhost:8080/get/counters")
      .then(function (response) {
        setCounters(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    //counter executive not allowed on this screen
    if (localStorage.getItem("counterid")) {
      navigate("/counter-executive");
    }
    // manager not allowed on this screen
    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }

    if (JSON.parse(localStorage.getItem("UserToken"))) {
      setUserTokens(JSON.parse(localStorage.getItem("UserToken")));
    } else {
      setUserTokens([]);
    }

    axios.get("http://localhost:8080/get/allSubServices").then((response) => {
      setServiceTypes(response.data);
    });

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  useEffect(() => {
    let temp = [];
    userTokens.map(async (id) => {
      return await axios
        .get(`http://localhost:8080/get-token-info?id=${id}`)
        .then(function (response) {
          if (response.data.status) {
            temp.push(response.data.globalQueue);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    setUserTokenData(temp);
  }, [userTokens, setProgress]);

  useEffect(() => {
    counters.map((eachCounter) => {
      if (userTokens.includes(eachCounter.isWorking)) {
        toast.success("Your token called!!", {
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
      return 0;
    });
  }, [counters, userTokens]);

  return (
    <section className="flex flex-col w-full px-5 py-10 text-gray-600 body-font md:flex-row ">
      <div className="flex flex-wrap w-full md:w-3/4 h-max">
        {counters.map((eachCounter) => {
          return (
            <div
              className="p-3 cursor-pointer lg:w-1/3 h-max"
              key={eachCounter.id}
            >
              <div className="flex flex-col h-full p-6 space-y-3 overflow-hidden text-center bg-gray-200 bg-opacity-75 rounded-lg hover:shadow-lg">
                <h1 className="text-2xl font-medium text-gray-900 title-font sm:text-2xl">
                  <div>
                    {eachCounter.counterName.replace(/([A-Z])/g, " $1")}
                  </div>
                </h1>
                {eachCounter.isActive === 0 ? (
                  <span className="text-lg text-red-500">Inactive</span>
                ) : (
                  <span className="text-lg text-green-500">Active</span>
                )}
                {eachCounter.isWorking === 0 ? (
                  <span className="text-red-500 text-md">No token Called.</span>
                ) : (
                  <span className="text-green-500 text-md">
                    Serving Token :{eachCounter.isWorking}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full p-3 md:w-1/4 tokendetails">
        <div className="p-5 bg-gray-200 rounded hover:shadow-lg">
          <span className="text-xl font-semibold">Your token Details</span>
          {userTokenData.length === 0 ? (
            <div className="flex flex-col">
              <span className="py-3">You have availed 0 services</span>
              <Link
                to="/customer-panel"
                className="px-4 py-2 text-white bg-indigo-500 rounded w-max"
              >
                click to see available services
              </Link>
            </div>
          ) : (
            <div>
              {userTokenData.map((e) => {
                return (
                  <div className="flex flex-col py-3 token" key={e.tokenId}>
                    <span>
                      Token Id:{" "}
                      <span className="font-semibold"> {e.tokenId}</span>
                    </span>
                    <span>
                      Generation Time:
                      <span className="font-semibold">
                        {" "}
                        {e.generationTime.slice(11, 19)}
                      </span>
                    </span>
                    <span>
                      Expected time:{" "}
                      <span className="font-semibold">
                        {e.expectedTime.slice(11, 19)}
                      </span>
                    </span>
                    <span>
                      Frequency of calling:
                      <span className="font-semibold">
                        {" "}
                        {e.frequencyOfCalling}
                      </span>
                    </span>
                    <span>
                      Service Type:{" "}
                      <span className="font-semibold">
                        {serviceTypes[e.servicetypeId - 1]}
                      </span>
                    </span>
                    <span>
                      Status: <span className="font-semibold">{e.status}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCountersPanel;
