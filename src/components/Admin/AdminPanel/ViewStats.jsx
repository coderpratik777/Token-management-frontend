import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const ViewStats = () => {
  const [counterStats, setCounterStats] = useState([]);
  const [counterExecStats, setCounterExecStats] = useState([]);

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
      <div className="counter w-full md:w-1/2 bg-gray-100 rounded shadow p-5 flex flex-col space-y-3">
        <div className="text-2xl font-bold">Counter Stats</div>
        <div className="stat flex flex-wrap justify-start">
          {counterStats.map((counter) => {
            return (
              <div
                key={counter.id}
                className="bg-gray-200 m-2 rounded w-full p-5"
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
                  {Math.round(counter.averageServeTime)} minutes
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
      </div>
      <div className="counterExec w-full md:w-1/2 h-max bg-gray-100 rounded shadow p-5 flex flex-col space-y-3">
        <div className="text-2xl font-bold">Counter Executive Stats</div>
        <div className="stat flex flex-wrap justify-start">
          {counterExecStats.map((counter) => {
            return (
              <div
                key={counter.id}
                className="bg-gray-200 m-2 rounded w-full p-5"
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
                  {Math.round(counter.averageServeTime)} minutes
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
      </div>
    </div>
  );
};

export default ViewStats;
