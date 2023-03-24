import axios from "axios";
import { useState } from "react";

const AddServices = () => {
  const [servicetypes, setServicetypes] = useState([{ serviceName: "" }]);
  const [serviceName, setServiceName] = useState("");
  const [ValidationError, setValidationError] = useState([]);

  const servicetypeInput = (index, event) => {
    const updatedservicetype = [...servicetypes];
    updatedservicetype[index].serviceName = event.target.value;
    setServicetypes(updatedservicetype);
  };

  //   Adding a type of service
  const handleAddservicetype = () => {
    setServicetypes([...servicetypes, { serviceName: "" }]);
  };

  //   Removing a type of service
  const handleRemoveservicetype = (index) => {
    const updatedservicetype = [...servicetypes];
    updatedservicetype.splice(index, 1);
    setServicetypes(updatedservicetype);
  };

  // Add/Submit of type of service
  const handleSubmit = async (event) => {
    window.location.reload();
    event.preventDefault();
    const data = { serviceName, servicetypes };
    const errors = [];
    for (let i = 0; i < servicetypes.length; ++i) {
      const servicetype = servicetypes[i];
      if (!servicetype.serviceName) {
        errors.push(`Service ${i + 1} name is required`);
      }
    }
    if (errors.length > 0) {
      setValidationError(errors);
      return;
    }
    setValidationError([]);
    console.log(data);
    let url = `http://localhost:8080/add/service`;
    await axios.post(url, data).then((response) => {
      alert(response.data);
    });
  };

  return (
    <section className="text-gray-600 body-font px-5 py-10 w-full flex flex-col items-center space-y-24">
      <div className="flex flex-col text-center w-full space-y-2">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
          Admin Dashboard Of Adding Service And It's Type
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Manager of Apli bank
        </h1>
      </div>
      <div class="w-full max-w-md">
        <h1 className="sm:text-2xl font-medium title-font items-center text-gray-700 pl-20 pb-8">
          Add Service And It's Types
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-gray-300 pt-7 pb-10 shadow-md rounded items-center px-8 pb-8 mb-4"
        >
          <div className="mb-6 border-b-2  border-neutral-400 ">
            <label className="block text-gray-600 font-medium md:text-left mb-1 md:mb-0 pr-4">
              Service Name :{" "}
              <input
                className="appearance-none border-2 border-gray-300 rounded w-full py-2 mb-6 mt-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                value={serviceName}
                onChange={(event) => setServiceName(event.target.value)}
              />
            </label>
          </div>
          {servicetypes.map((servicetype, index) => (
            <div key={index} className="mb-6">
              <label className="block text-gray-600  font-medium md:text-left mb-1 md:mb-0 pr-4">
                Type Of Service {index + 1} :
                <input
                  className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 mt-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={servicetype.serviceName}
                  onChange={(event) => servicetypeInput(index, event)}
                />
              </label>
              {ValidationError.length > 0 && !servicetype.serviceName && (
                <p style={{ color: "red" }}>Type Of Service Name Is Required</p>
              )}
              <button
                className="mt-5 mb-6 w-60 shadow-lg bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-medium py-2 px-4 rounded"
                type="button"
                onClick={() => handleRemoveservicetype(index)}
              >
                Remove Service Type
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddservicetype}
            className="shadow-lg w-60 bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-medium py-2 px-4 rounded"
          >
            Add Type Of Service
          </button>
          <button
            type="submit"
            className="shadow-lg w-30 ml-12 mt-6  bg-sky-600 hover:bg-sky-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddServices;
