import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounterExecPanel = () => {
  const [counterData, setCounterData] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
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
    async function fetchData() {
      let url = `http://localhost:8080/gettokencounters?cid=${JSON.parse(
        localStorage.getItem("counterid")
      )}`;

      // if (JSON.parse(localStorage.getItem("counterid")) === 1) {
      //   await axios.get(`http://localhost:8080/gettoken`).then((response) => {
      //     let temp = response.data;
      //     let allTokens = [];
      //     Object.keys(temp).map((e) => {
      //       allTokens = allTokens.concat(temp[e]);
      //     });
      //     console.log(allTokens);
      //     localStorage.setItem("counterData", JSON.stringify(allTokens));
      //     setCounterData(allTokens);
      //   });
      // } else {
      // }
      await axios.get(url).then((response) => {
        localStorage.setItem("counterData", JSON.stringify(response.data));
        setCounterData(response.data);
      });

      let url1 = `http://localhost:8080/getpendingqueue?counterid=${JSON.parse(
        localStorage.getItem("counterid")
      )}`;
      await axios.get(url1).then((response) => {
        setPendingQueue(response.data);
      });

      await axios
        .get("http://localhost:8080/get-all-sub-service")
        .then((response) => {
          setServiceTypes(response.data);
        });
    }
    fetchData();
  }, [navigate, refresh]);

  const call = () => {
    axios
      .get(
        `http://localhost:8080/getpendingqueue?counterid=${JSON.parse(
          localStorage.getItem("counterid")
        )}`
      )
      .then((response) => {
        setPendingQueue(response.data);
      });

    if (counterData.length > 0) {
      if (counterData[0].status === "ACTIVE") {
        toast.success("Please serve the recent token first !.", {
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
        if (count === 3 && pendingQueue.length !== 0) {
          setCount(0);
          let url1 = `http://localhost:8080/gettopservicepq?counterid=${JSON.parse(
            localStorage.getItem("counterid")
          )}`;

          axios.get(url1).then((response) => {
            let temp = JSON.parse(localStorage.getItem("counterData"));
            temp.unshift(response.data);
            localStorage.setItem("counterData", JSON.stringify(temp));
            setCounterData(JSON.parse(localStorage.getItem("counterData")));
          });
        } else {
          let url = `http://localhost:8080/gettopservice?cid=${JSON.parse(
            localStorage.getItem("counterid")
          )}`;
          axios.get(url).then((response) => {
            setRefresh(refresh + 1);
          });
          setCount(count + 1);
        }
      }
      toast.success("Next customer Called.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (pendingQueue.length !== 0) {
      async function updateCounterData() {
        await axios
          .get(
            `http://localhost:8080/copy-pendingqueue-to-counterqueue?counterid=${JSON.parse(
              localStorage.getItem("counterid")
            )}`
          )
          .then((response) => {});
      }
      updateCounterData();
      setCount(0);
      setRefresh(refresh + 1);
    } else {
      toast.success("No more tokens to serve..", {
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
  };

  const Served = async () => {
    let temp = JSON.parse(localStorage.getItem("counterData"));
    if (counterData.length > 0 && temp[0].status === "ACTIVE") {
      await fetch("http://localhost:8080/changestatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cid: localStorage.getItem("counterid"),
          st: "done",
          tokenId: counterData[0].id,
        }),
      });

      temp[0].status = "DONE";
      localStorage.setItem("counterData", JSON.stringify(temp.slice(1)));
      setCounterData(JSON.parse(localStorage.getItem("counterData")));
      toast.success("Customer Served!", {
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
      toast.error("Please call the customer first !", {
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

    let url = `http://localhost:8080/getpendingqueue?counterid=${JSON.parse(
      localStorage.getItem("counterid")
    )}`;
    axios.get(url).then((response) => {
      setPendingQueue(response.data);
    });
  };

  const Pending = async () => {
    let temp = JSON.parse(localStorage.getItem("counterData"));
    if (counterData.length > 0 && temp[0].status === "ACTIVE") {
      await axios
        .post(
          "http://localhost:8080/changestatus",
          {
            cid: JSON.parse(localStorage.getItem("counterid")),
            st: "noshow",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setRefresh(refresh + 1);
          toast.warning("Sent to Pending queue", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error("Please call the customer first !", {
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
    setRefresh(refresh + 1);
  };

  return (
    <div>
      <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 xl:w-1/2">
              <div className="mb-10 overflow-hidden bg-white rounded-lg">
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h1 className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                    Current service
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      call();
                    }}
                    style={{ margin: "5px" }}
                    className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  >
                    {" "}
                    Call
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      Pending();
                    }}
                    style={{ margin: "5px" }}
                    className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  >
                    {" "}
                    Not Showed
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      Served();
                    }}
                    style={{ margin: "5px" }}
                    className="text-body-color hover:border-primary hover:bg-indigo-900 inline-block rounded-full border border-[blue] py-2 px-7 text-base font-medium transition hover:text-white"
                  >
                    {" "}
                    Serve
                  </button>
                </div>
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <div>
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Id</th>
                          <th className="px-4 py-2">Expected Time</th>
                          <th className="px-4 py-2">Frequency Of Caling</th>
                          <th className="px-4 py-2">Generation Of Time</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      {counterData.length === 0 ? (
                        <tbody>
                          <tr>
                            <td>NO token generated</td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {counterData
                            .filter((item) => item.status === "ACTIVE")
                            .map((filteredItem) => (
                              <tr key={filteredItem.id}>
                                <td className="px-4 py-2 border">
                                  {filteredItem.id}
                                </td>
                                <td className="px-4 py-2 border">
                                  {filteredItem.expectedTime}
                                </td>
                                <td className="px-4 py-2 border">
                                  {filteredItem.frequencyOfCalling}
                                </td>
                                <td className="px-4 py-2 border">
                                  {filteredItem.generationTime}
                                </td>
                                <td className="px-4 py-2 border">
                                  {filteredItem.status}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 xl:w-1/4">
              <div className="mb-10 overflow-hidden bg-white rounded-lg">
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3 className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                    Customer List
                  </h3>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Service Type</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    {counterData.length === 0 && pendingQueue.length === 0 ? (
                      <tbody>
                        <tr>
                          <td>NO token generated</td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {counterData
                          .filter((item) => item.status === "PENDING")
                          .map((filteredItem) => (
                            <tr key={filteredItem.id}>
                              <td className="px-4 py-2 border">
                                {filteredItem.id}
                              </td>
                              <td className="border px-4 py-2">
                                {serviceTypes[filteredItem.servicetypeId]
                                  ? serviceTypes[
                                      filteredItem.servicetypeId - 1
                                    ].serviceName.replace(/([A-Z])/g, " $1")
                                  : filteredItem.servicetypeId}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 xl:w-1/4">
              <div className="mb-10 overflow-hidden bg-white rounded-lg">
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3 className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                    Pending List
                  </h3>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Service Type</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    {pendingQueue.length === 0 ? (
                      <tbody>
                        <tr>
                          <td>NO token generated</td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {pendingQueue.map((filteredItem) => (
                          <tr key={filteredItem.id}>
                            <td className="px-4 py-2 border">
                              {filteredItem.id}
                            </td>
                            <td className="px-4 py-2 border">
                              {serviceTypes[filteredItem.servicetypeId]
                                ? serviceTypes[
                                    filteredItem.servicetypeId - 1
                                  ].serviceName.replace(/([A-Z])/g, " $1")
                                : filteredItem.servicetypeId}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CounterExecPanel;
