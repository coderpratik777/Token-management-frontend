import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const AllCountersPanel = () => {
  const [counterData, setCounterData] = useState({});
  const [userToken, setUserToken] = useState([]);
  // const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8080/gettoken")
      .then(function (response) {
        setCounterData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (JSON.parse(localStorage.getItem("UserToken"))) {
      setUserToken(JSON.parse(localStorage.getItem("UserToken")));
    } else {
      setUserToken([]);
    }
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font w-full px-5 py-10 flex">
        <div className="flex flex-wrap w-2/3">
          {Object.keys(counterData).map((eachCounterNo) => {
            return (
              <Link
                to="/counter"
                className="p-4 lg:w-1/3 h-max"
                key={eachCounterNo}
              >
                <div className="h-full bg-gray-100 bg-opacity-75 p-8 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Counter {eachCounterNo}
                  </h1>
                  <p className="leading-relaxed mb-3">Cash services</p>
                  <span className="text-indigo-500 inline-flex mb-3 items-center">
                    {counterData[eachCounterNo].length} waiting
                  </span>
                  <div className="tokens w-full flex flex-col">
                    <div className="token flex bg-gray-200 p-2 rounded m-2">
                      Token id:
                      {counterData[eachCounterNo].map((eachToken) => {
                        return (
                          <span key={eachToken.id}> {eachToken.id + ","}</span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="tokendetails p-5 w-1/3">
          <div className="bg-gray-100 p-5 rounded hover:shadow-lg">
            <span className="text-xl font-semibold">Your token Details</span>
            {userToken.length === 0 ? (
              <div className="flex flex-col">
                <span className="py-3">You have availed 0 services</span>
                <Link
                  to="/customer-panel"
                  className="bg-indigo-500 w-max rounded text-white px-4 py-2"
                >
                  click to see available services
                </Link>
              </div>
            ) : (
              <div>
                {userToken.map((e) => {
                  return (
                    <div className="token flex flex-col py-3" key={e.id}>
                      <span>Token Id: {e.id}</span>
                      <span>Generation Time: {e.generationTime}</span>
                      <span>Expected time: {e.expectedTime}</span>
                      <span>Frequency of calling: {e.frequencyOfCalling}</span>
                      <span>Service Type: {e.servicetypeId}</span>
                      <span>Status: {e.status}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllCountersPanel;
