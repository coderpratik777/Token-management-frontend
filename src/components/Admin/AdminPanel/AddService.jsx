import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddServices = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [ValidationError, setValidationError] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminId")) {
      toast.error("Login as a admin first.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login/admin");
    }
  }, [navigate]);

  const serviceTypeInput = (index, event) => {
    const updatedservicetype = [...serviceTypes];
    updatedservicetype[index] = event.target.value;
    setServiceTypes(updatedservicetype);
  };

  //   Adding a type of service
  const handleAddservicetype = () => {
    setServiceTypes([...serviceTypes, ""]);
  };

  //   Removing a type of service
  const handleRemoveservicetype = (index) => {
    const updatedservicetype = [...serviceTypes];
    updatedservicetype.splice(index, 1);
    setServiceTypes(updatedservicetype);
  };

  // Add/Submit of type of service
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      serviceName: serviceName.trim().replace(" ", ""),
      serviceTypes: serviceTypes
        .map((e) => {
          return e.trim().replace(" ", "");
        })
        .filter((e) => e !== ""),
    };

    const errors = [];
    if (data.serviceName === "") {
      errors.push(`Service name must not be empty`);
    }
    if (data.serviceTypes.length === 0) {
      errors.push(`Service type name should not be empty`);
    }
    if (errors.length > 0) {
      setValidationError(errors);
      return;
    }

    console.log(data);

    await axios
      .post(`http://localhost:8080/add/service`, data)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.messsageIfAny, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setServiceName("");
          setServiceTypes([]);
        } else {
          toast.error(response.data.messsageIfAny, {
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
      });
  };

  return (
    <section className="flex flex-col items-center w-full px-5 py-10 space-y-12 text-gray-600 body-font">
      <div className="flex flex-col w-full space-y-2 text-center">
        <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
          Admin Dashboard Of Adding Service And It's Type
        </h2>
        <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
          Manager of Apli bank
        </h1>
      </div>
      <div className="w-full max-w-md">
        <h1 className="items-center pb-8 pl-20 font-medium text-gray-700 sm:text-2xl title-font">
          Add Service And It's Types
        </h1>
        <form
          onSubmit={handleSubmit}
          className="items-center px-8 pb-10 mb-4 bg-white border-2 border-gray-300 rounded shadow-md pt-7"
        >
          <div className="pb-3 border-b-2 border-neutral-400 ">
            <label className="block pr-4 mb-1 font-medium text-gray-600 md:text-left md:mb-0">
              Service Name :{" "}
              <input
                className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 border-2 border-gray-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </label>
            {ValidationError.length > 0 && (
              <p style={{ color: "red" }}>{ValidationError[0]}</p>
            )}
          </div>
          {serviceTypes.map((serviceType, index) => (
            <div key={index} className="my-6">
              <label className="block pr-4 mb-1 font-medium text-gray-600 md:text-left md:mb-0">
                Type Of Service {index + 1} :
                <input
                  className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 border-2 border-gray-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={serviceType}
                  onChange={(event) => serviceTypeInput(index, event)}
                />
              </label>
              {ValidationError.length > 0 && (
                <p style={{ color: "red" }}>{ValidationError[1]}</p>
              )}
              <button
                className="px-4 py-2 mt-5 mb-6 font-medium text-white bg-red-500 rounded shadow-lg w-60 hover:bg-red-700 focus:shadow-outline focus:outline-none"
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
            className="px-4 py-2 font-medium text-white bg-teal-600 rounded shadow-lg w-60 hover:bg-teal-800 focus:shadow-outline focus:outline-none"
          >
            Add Type Of Service
          </button>
          <button
            type="submit"
            className="px-4 py-2 mt-6 ml-12 font-bold text-white rounded shadow-lg w-30 bg-sky-600 hover:bg-sky-800 focus:shadow-outline focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddServices;
