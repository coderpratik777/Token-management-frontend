import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Counter = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [counters, setCounters] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [counterNo, setCounterNo] = useState(0);

  const [userTokens, setUserTokens] = useState([]);

  const [counterData, setCounterData] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);

  useEffect(() => {
    if (location.state === null) {
      navigate("/all-counter-panel");
    } else {
      setCounterNo(location.state.counterClicked);
    }
    if (localStorage.getItem("counterid")) {
      navigate("/counter-executive");
    }

    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `http://localhost:8080/gettokencounters?cid=${location.state.counterClicked}`
        )
        .then((response) => {
          setCounterData(response.data);
        });
      await axios
        .get("http://localhost:8080/get-counter")
        .then(function (response) {
          setCounters(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .get("http://localhost:8080/get-services")
        .then(function (response) {
          setServices(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .get(
          `http://localhost:8080/getpendingqueue?counterid=${location.state.counterClicked}`
        )
        .then((response) => {
          setPendingQueue(response.data);
        });

      await axios
        .get("http://localhost:8080/get-all-sub-service")
        .then((response) => {
          setServiceTypes(response.data);
        });

      if (JSON.parse(localStorage.getItem("UserToken"))) {
        setUserTokens(JSON.parse(localStorage.getItem("UserToken")));
      } else {
        setUserTokens([]);
      }
    }
    fetchData();
  }, [location.state.counterClicked]);

  return (
    <div>
      <div className="flex flex-col text-center w-full space-y-3 py-8">
        <h1 className="text-4xl font-bold title-font text-gray-900">
          {counters[counterNo - 1] ? (
            <div>{counters[counterNo - 1].name.replace(/([A-Z])/g, " $1")}</div>
          ) : (
            <div>Counter {counterNo}</div>
          )}
        </h1>
        <div className="text-xl font-semibold">
          Current Token in service:{" "}
          {counterData.map((e) => {
            return e.status === "ACTIVE" && <span key={e.id}>{e.id}</span>;
          })}
        </div>
      </div>
      <div className="section w-full p-5 flex">
        <div className="w-2/5 bg-gray-100 p-5 flex flex-col space-y-2 m-2">
          <span className="font-semibold text-xl">Current queue</span>
          <table className="tokenqueue">
            <tbody>
              <tr>
                <td className="px-4 py-2 border font-medium">Token ID</td>
                <td className="px-4 py-2 border font-medium">Service Type</td>
                <td className="px-4 py-2 border font-medium">Times Called</td>
                <td className="px-4 py-2 border font-medium">Status</td>
              </tr>
              {counterData.map((filteredItem) => (
                <tr
                  key={filteredItem.id}
                  className={`hover:bg-gray-200 ${
                    filteredItem.status === "ACTIVE"
                      ? "bg-green-500"
                      : "bg-gray-100"
                  }`}
                >
                  <td className="px-4 py-2 border">{filteredItem.id}</td>
                  <td className="border px-4 py-2">
                    {serviceTypes[filteredItem.servicetypeId]
                      ? serviceTypes[
                          filteredItem.servicetypeId - 1
                        ].serviceName.replace(/([A-Z])/g, " $1")
                      : filteredItem.servicetypeId}
                  </td>
                  <td className="px-4 py-2 border">
                    {filteredItem.frequencyOfCalling}
                  </td>
                  <td className="px-4 py-2 border">{filteredItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/5 bg-gray-100 p-5 flex flex-col space-y-2 m-2">
          <span className="font-semibold text-xl">Pending queue</span>
          {pendingQueue.length > 0 && (
            <table className="tokenqueue">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-medium">Token ID</td>
                  <td className="border px-4 py-2 font-medium">Service Type</td>
                  <td className="px-4 py-2 border font-medium">Times Called</td>
                  <td className="px-4 py-2 border font-medium">Status</td>
                </tr>
                {pendingQueue.map((filteredItem) => (
                  <tr
                    key={filteredItem.id}
                    className={`bg-gray-100 hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2 border">{filteredItem.id}</td>
                    <td className="border px-4 py-2">
                      {serviceTypes[filteredItem.servicetypeId]
                        ? serviceTypes[
                            filteredItem.servicetypeId - 1
                          ].serviceName.replace(/([A-Z])/g, " $1")
                        : filteredItem.servicetypeId}
                    </td>
                    <td className="px-4 py-2 border">
                      {filteredItem.frequencyOfCalling}
                    </td>
                    <td className="px-4 py-2 border">{filteredItem.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="w-1/5 bg-gray-100 p-5 flex flex-col space-y-2 m-2">
          <span className="font-semibold text-xl">Your tokens</span>
          <table className="tokenqueue">
            <tbody>
              <tr>
                <td className="px-4 py-2 border font-medium">Token ID</td>
              </tr>
              {pendingQueue.map((item) => (
                <tr key={item.id}>
                  {userTokens.includes(item.id) && (
                    <td className="px-4 py-2 border">{item.id}</td>
                  )}
                </tr>
              ))}
              {counterData.map((item) => (
                <tr key={item.id}>
                  {userTokens.includes(item.id) && (
                    <td className="px-4 py-2 border">{item.id}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Counter;
