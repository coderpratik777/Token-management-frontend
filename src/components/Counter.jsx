import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Counter = (props) => {
  const location = useLocation();

  const [counters, setCounters] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  return (
    <div>
      Counter {location.state.counterClicked}
      {counters[location.state.counterClicked - 1] ? (
        <div>
          {counters[location.state.counterClicked - 1].name.replace(
            /([A-Z])/g,
            " $1"
          )}
        </div>
      ) : (
        <div>Counter {location.state.counterClicked}</div>
      )}
      {services[location.state.counterClicked - 1] ? (
        <div>
          {services[location.state.counterClicked - 1].serviceName.replace(
            /([A-Z])/g,
            " $1"
          )}
        </div>
      ) : (
        <div>Service {location.state.counterClicked}</div>
      )}
    </div>
  );
};

export default Counter;
