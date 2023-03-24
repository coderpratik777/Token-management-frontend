import axios from "axios";
import { useEffect, useState } from "react";

const AddCounter = () => {
    const [counterData, setcounterData] = useState("");
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [counterExecutives, setCounterExecutives] = useState([]);
    const [counterExecutiveName, setCounterExecutiveName] = useState("");
  
    const data = {
      counterName: counterData,
      serviceName: serviceName,
      counterExecutiveName: counterExecutiveName,
    };
  
    // Adding Counter
    function addCounter(event) {
      window.location.reload();
      event.preventDefault();
      console.log(data);
      let url = `http://localhost:8080/add/counter`;
      axios.post(url, data).then((response) => {
        alert(response.data);
      });
    }
  
    // Getting Services for assigning to the counter
    useEffect(() => {
      let url = `http://localhost:8080/get/services`;
      axios
        .get(url)
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    // Getting Counter Executive for assigning to the counter
    useEffect(() => {
      let url = `http://localhost:8080/get/counter/executive`;
      axios
        .get(url)
        .then((response) => {
          setCounterExecutives(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    return (
      <>
        <section className="text-gray-600 body-font px-5 py-10 w-full flex flex-col items-center space-y-16">
          <div className="flex flex-col text-center w-full space-y-2">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
              Admin Dashboard Of Adding Counter And Assigning Service To Counter
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Manager of Apli bank
            </h1>
          </div>
  
          {/* Adding Counter */}
          <div>
            <h1 className="sm:text-2xl font-medium title-font  text-gray-700 ml-48  pb-6">
              Add Counter
            </h1>
            <form className="bg-white border-2 border-gray-300 pt-4 pb-10 shadow-md rounded items-center px-8 pb-8 mb-4">
              <br />
              <pre className=" text-lg">
                Counter Name :{" "}
                <input
                  type="text"
                  name="name"
                  value={counterData.name}
                  onChange={(event) => setcounterData(event.target.value)}
                  className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-80 text-md leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                  placeholder="Counter Name..."
                />
                <br />
                <br />
                {/* Assigning Service To Counter */}
                <div>
                  <label className="block mt-3">Select a service</label>
                  <select
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={serviceName}
                    onChange={(event) => setServiceName(event.target.value)}
                    required
                  >
                    <option value=""> Select an option </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.serviceName}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Assigning Counter Executive To Counter */}
                <div>
                  <label className="block mb-2 mt-10">
                    Select a Counter Executive
                  </label>
                  <select
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={counterExecutiveName}
                    onChange={(event) =>
                      setCounterExecutiveName(event.target.value)
                    }
                    required
                  >
                    <option value="">Select an option</option>
                    {counterExecutives.map((counterExecutive) => (
                      <option
                        key={counterExecutive.id}
                        value={counterExecutive.username}
                      >
                        {counterExecutive.username}
                      </option>
                    ))}
                  </select>
                </div>
              </pre>
              <button
                type="submit"
                onClick={addCounter}
                className="h-10 px-6 mt-12 ml-40 mb-2 font-semibold rounded-md bg-teal-600 hover:bg-teal-800	 text-white"
              >
                Add Counter
              </button>
            </form>
          </div>
        </section>
      </>
    );
  };
  export default AddCounter;
  