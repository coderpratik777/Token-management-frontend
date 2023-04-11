import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModifyServices = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

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
    axios.get(`http://localhost:8080/get-global-queue`).then((response) => {
      setServices(response.data);
    });
  }, [navigate]);
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
      <div className="servicedisplay">
        {service}
      </div>
    </section>
  );
};

export default ModifyServices;
