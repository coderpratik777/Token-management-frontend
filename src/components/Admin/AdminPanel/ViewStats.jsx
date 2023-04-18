import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const ViewStats = () => {
  const [counterStats, setCounterStats] = useState([]);
  const [counterExecStats, setCounterExecStats] = useState([]);

  const [counterStatOpen, setCounterStatOpen] = useState(false);
  const [counterExecStatOpen, setCounterExecStatOpen] = useState(true);

  const [dailyStat, setDailyStat] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/get/stats/date-wise`).then((response) => {
      setDailyStat(response.data);
    });
  }, []);

  const NumberOfTokendata = {
    labels: dailyStat.map((each) => {
      return each[0];
    }),
    datasets: [
      {
        label: "Number of token",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        data: dailyStat.map((each) => {
          return each[1];
        }),
      },
    ],
  };

  const AverageTimedata = {
    labels: dailyStat.map((each) => {
      return each[0];
    }),
    datasets: [
      {
        label: "Average Serve Time",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        data: dailyStat.map((each) => {
          return each[2];
        }),
      },
    ],
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/get/stats/counter`).then((response) => {
      setCounterStats(response.data);
    });
    axios
      .get(`http://localhost:8080/get/stats/counter-executive`)
      .then((response) => {
        setCounterExecStats(response.data);
      });
  }, []);

  return (
    <div className="p-5 flex md:flex-row flex-col md:space-x-4 space-y-4 md:space-y-0">
      <div className="left w-full md:w-1/2 flex flex-col items-center space-y-6">
        <div className="heading w-full text-3xl font-bold">Bank Stats</div>
        <div className="space-y-3 w-8/12">
          <div className="chartlabel w-full text-center text-lg font-medium">
            Number of tokens served Day wise.
          </div>
          <Line data={NumberOfTokendata} options={options} />
        </div>
        <div className="space-y-3 w-8/12">
          <div className="chartlabel w-full text-center text-lg font-medium">
            Average serve time Day wise.
          </div>
          <Line data={AverageTimedata} options={options} />
        </div>
      </div>
      <div className="right w-full md:w-1/2 flex flex-col space-y-3">
        <div className="counter w-full h-max rounded shadow-md flex flex-col">
          <div
            className="text-2xl font-semibold p-5 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() => {
              setCounterStatOpen(!counterStatOpen);
            }}
          >
            <span>Counter Stats</span>
            {counterStatOpen ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </div>
          {counterStatOpen && (
            <div className="stat flex flex-wrap justify-start bg-gray-200 p-2">
              {counterStats.map((counter) => {
                return (
                  <div
                    key={counter.id}
                    className="bg-gray-300 m-2 rounded w-full p-5"
                  >
                    <div className="text-xl font-semibold">{counter.name}</div>
                    <div>
                      <span className="font-medium">Token served: </span>
                      {counter.tokensServed.length === 0 ? (
                        <span>None</span>
                      ) : (
                        <span className="space-x-2">
                          {counter.tokensServed.map((e) => {
                            return <span key={e}>{e}</span>;
                          })}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Avg Serve Time: </span>
                      {counter.averageServeTime} minutes
                    </div>
                    <div>
                      <span className="font-medium">Tokens Abandoned: </span>
                      {counter.tokenAbandoned.length === 0 ? (
                        <span>None</span>
                      ) : (
                        <span className="space-x-2">
                          {counter.tokenAbandoned.map((e) => {
                            return <span key={e}>{e}</span>;
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="counterExec w-full h-max  rounded shadow-md flex flex-col ">
          <div
            className="text-2xl font-semibold bg-gray-100 p-5 flex justify-between items-center cursor-pointer"
            onClick={() => {
              setCounterExecStatOpen(!counterExecStatOpen);
            }}
          >
            <span>Counter Executive Stats</span>
            {counterExecStatOpen ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </div>
          {counterExecStatOpen && (
            <div className="stat flex flex-wrap justify-start bg-gray-200 p-2">
              {counterExecStats.map((counter) => {
                return (
                  <div
                    key={counter.id}
                    className="bg-gray-300 m-2 rounded w-full p-5"
                  >
                    <div className="text-xl font-semibold">
                      Name: {counter.name}
                    </div>
                    <div>
                      <span className="font-medium">Token served: </span>
                      {counter.tokensServed.length === 0 ? (
                        <span>None</span>
                      ) : (
                        <span className="space-x-2">
                          {counter.tokensServed.map((e) => {
                            return <span key={e}>{e}</span>;
                          })}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Avg Serve Time: </span>
                      {counter.averageServeTime} minutes
                    </div>
                    <div>
                      <span className="font-medium">Tokens Abandoned: </span>
                      {counter.tokenAbandoned.length === 0 ? (
                        <span>None</span>
                      ) : (
                        <span className="space-x-2">
                          {counter.tokenAbandoned.map((e) => {
                            return <span key={e}>{e}</span>;
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStats;
