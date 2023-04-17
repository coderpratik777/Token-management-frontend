import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineDownloadDone, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";

const ModifyServices = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [subService, setSubService] = useState("");
  const [isVisible, setIsVisible] = useState([]);

  const fetchData = useCallback(async () => {
    await axios.get(`http://localhost:8080/get/services`).then((response) => {
      setServices(response.data);
    });
    setIsVisible(new Array(services.length).fill(false));
  }, [services.length]);

  const toggleVisibility = (index) => {
    setIsVisible((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

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
    fetchData();
  }, [navigate, fetchData]);

  return (
    <section className="flex flex-col items-center w-full px-5 py-10 lg:py-14 md:space-y-24 space-y-10 text-gray-600 body-font">
      <div className="flex flex-col w-full space-y-2 text-center">
        <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
          Admin Dashboard
        </h2>
        <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
          Modify Services
        </h1>
      </div>
      <div className="servicedisplay flex flex-wrap w-full px-8 lg:px-16">
        {services.map((service, i) => {
          return (
            <div
              key={i}
              className="flex-shrink flex-grow h-max m-2 w-2/12 bg-gray-100 rounded-lg hover:shadow-lg"
            >
              <div className="bg-gray-200 w-full p-4 flex justify-between items-center">
                <span>{service.serviceName}</span>
                <AiFillDelete
                  className="text-lg cursor-pointer"
                  onClick={() => {
                    axios
                      .put(
                        `http://localhost:8080/delete/service?sId=${service.id}`
                      )
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
                          fetchData();
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
                  }}
                />
              </div>
              {service.servicetypes.map((serviceType) => {
                return (
                  <div
                    key={serviceType.id}
                    className="p-4 flex justify-between items-center"
                  >
                    <span>{serviceType.serviceName}</span>
                    <AiFillDelete
                      className="text-lg cursor-pointer"
                      onClick={() => {
                        axios
                          .put(
                            `http://localhost:8080/delete/subservice?subService=${serviceType.serviceName}`
                          )
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
                              fetchData();
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
                      }}
                    />
                  </div>
                );
              })}
              {isVisible[i] && (
                <form
                  className="flex w-full items-center p-4 rounded"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (subService.trim() === "") {
                      toast.error("Service type must not be empty", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      return;
                    }
                    axios
                      .put(
                        `http://localhost:8080/add/subservice?subService=${subService.replace(
                          " ",
                          ""
                        )}&sId=${service.id}`
                      )
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
                          setSubService("");
                          fetchData();
                          toggleVisibility(i);
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
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                    className="p-2 rounded-md w-6/12 flex-grow mr-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-md text-slate-900 placeholder-slate-400 ring-1 ring-slate-200"
                    placeholder="Sub service name"
                  />
                  <button
                    type="submit"
                    className="h-8 w-8 flex items-center justify-center text-white bg-indigo-500 rounded hover:bg-indigo-600"
                  >
                    <MdOutlineDownloadDone className="text-lg" />
                  </button>
                  <button
                    type="submit"
                    className="h-8 w-8 ml-2 flex items-center justify-center rounded hover:bg-gray-300"
                  >
                    <MdOutlineCancel
                      className="text-2xl"
                      onClick={() => {
                        toggleVisibility(i);
                      }}
                    />
                  </button>
                </form>
              )}

              {!isVisible[i] && (
                <div className="p-4 flex justify-between items-center">
                  <span>Add new </span>
                  <AiOutlinePlusCircle
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      toggleVisibility(i);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ModifyServices;
