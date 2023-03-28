import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounterExecPanel = () => {
  const [counterData, setCounterData] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    let url = `http://localhost:8080/gettokencounters?cid=${JSON.parse(
      localStorage.getItem("counterid")
    )}`;

    axios.get(url).then((response) => {
      localStorage.setItem("counterData", JSON.stringify(response.data));
      setCounterData(JSON.parse(localStorage.getItem("counterData")));
    });

    axios
      .get("http://localhost:8080/get-all-sub-service")
      .then(function (response) {
        setServiceType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [navigate]);

  const call = () => {
    if (counterData.length > 0) {
      if (counterData[0].status === "ACTIVE") {
        console.log("first served the active token first");
      } else {
        let url = `http://localhost:8080/gettopservice?cid=${JSON.parse(
          localStorage.getItem("counterid")
        )}`;
        axios.get(url).then((response) => {
          let temp = JSON.parse(localStorage.getItem("counterData"));
          temp[0].status = "ACTIVE";
          localStorage.setItem("counterData", JSON.stringify(temp));
          setCounterData(JSON.parse(localStorage.getItem("counterData")));
        });
        setCounterData(counterData.slice(1));
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
    } else {
      console.log("data not found");
    }
  };

  const Served = async () => {
    console.log("served");
    await fetch("http://localhost:8080/changestatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: localStorage.getItem("counterid"),
        st: "done",
        tokenId: counterData[0].id,
      }),
    });
    let temp = JSON.parse(localStorage.getItem("counterData"));
    temp[0].status = "DONE";
    localStorage.setItem("counterData", JSON.stringify(temp.slice(1)));
    console.log(JSON.parse(localStorage.getItem("counterData")));
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
    // setCounterData(counterData.slice(1));
  };

  const Pending = () => {
    axios
      .post(
        "http://localhost:8080/changestatus",
        {
          cid: JSON.parse(localStorage.getItem("counterid")),
          st: "pending",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
      });
  };

  return (
    <div>
      <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 xl:w-1/2">
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
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
                    Pending
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
                              <tr>
                                <td className="border px-4 py-2">
                                  {filteredItem.id}
                                </td>
                                <td className="border px-4 py-2">
                                  {filteredItem.expectedTime}
                                </td>
                                <td className="border px-4 py-2">
                                  {filteredItem.frequencyOfCalling}
                                </td>
                                <td className="border px-4 py-2">
                                  {filteredItem.generationTime}
                                </td>
                                <td className="border px-4 py-2">
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
            <div className="w-full px-4 md:w-1/2 xl:w-1/2">
              <div className="mb-10 overflow-hidden rounded-lg bg-white">
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
                    {counterData.length === 0 ? (
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
                              <td className="border px-4 py-2">
                                {filteredItem.id}
                              </td>
                              <td className="border px-4 py-2">
                                {serviceType[filteredItem.servicetypeId]
                                  ? serviceType[filteredItem.servicetypeId - 1]
                                      .serviceName
                                  : "Servicetype"}
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
