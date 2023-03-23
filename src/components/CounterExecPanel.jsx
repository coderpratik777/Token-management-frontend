import React, { useEffect, useState } from "react";
import axios from "axios";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";

const CounterExecPanel = () => {
  const [counterData, setCounterData] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    let url = `http://localhost:8080/gettokencounters?cid=${JSON.parse(
      localStorage.getItem("counterid")
    )}`;

    axios.get(url).then((response) => {
      // console.log(response.data);
      localStorage.setItem("counterData", JSON.stringify(response.data));
      setCounterData(JSON.parse(localStorage.getItem("counterData")));
    });

    //not used
    let url2 = `http://localhost:8080/get-service?sid=${JSON.parse(
      localStorage.getItem("counterid")
    )}`;

    axios.get(url2).then((response) => {
      // console.log(response.data.serviceName);
      setServiceName(response.data.serviceName);
      // console.log(serviceName);
    });
  }, []);

  const call = () => {
    if (counterData.length > 0) {
      if (counterData[0].status === "ACTIVE") {
        console.log("first served the active token first");
      } else {
        let url = `http://localhost:8080/gettopservice?cid=${JSON.parse(
          localStorage.getItem("counterid")
        )}`;
        axios.get(url).then((response) => {
          // setServiceData(response.data)
          // console.log(serviceData);
          let temp = JSON.parse(localStorage.getItem("counterData"));
          temp[0].status = "ACTIVE";
          localStorage.setItem("counterData", JSON.stringify(temp));
          setCounterData(JSON.parse(localStorage.getItem("counterData")));
        });
        setCounterData(counterData.slice(1));
      }
    } else {
      console.log("data not found");
    }
  };

  const Served = async () => {
    console.log("served");
    const response = await fetch("http://localhost:8080/changestatus", {
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
                    Served
                  </button>
                </div>
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <div>
                    <table class="table-auto">
                      <thead>
                        <tr>
                          <th class="px-4 py-2">Id</th>
                          <th class="px-4 py-2">Expected Time</th>
                          <th class="px-4 py-2">Frequency Of Caling</th>
                          <th class="px-4 py-2">Generation Of Time</th>
                          <th class="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {counterData
                          .filter((item) => item.status === "ACTIVE")
                          .map((filteredItem) => (
                            <tr>
                              <td class="border px-4 py-2">
                                {filteredItem.id}
                              </td>
                              <td class="border px-4 py-2">
                                {filteredItem.expectedTime}
                              </td>
                              <td class="border px-4 py-2">
                                {filteredItem.frequencyOfCalling}
                              </td>
                              <td class="border px-4 py-2">
                                {filteredItem.generationTime}
                              </td>
                              <td class="border px-4 py-2">
                                {filteredItem.status}
                              </td>
                            </tr>
                          ))}
                      </tbody>
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
                  <table class="table-auto">
                    <thead>
                      <tr>
                        <th class="px-4 py-2">Id</th>
                        <th class="px-4 py-2">Service Type</th>
                        <th class="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {counterData
                        .filter((item) => item.status === "PENDING")
                        .map((filteredItem) => (
                          <tr>
                            <td class="border px-4 py-2">{filteredItem.id}</td>
                            <td class="border px-4 py-2">{serviceName}</td>
                          </tr>
                        ))}
                    </tbody>
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
