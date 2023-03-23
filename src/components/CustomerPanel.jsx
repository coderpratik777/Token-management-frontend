import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const services = [
  { name: "Cash Service", value: "CashService" },
  { name: "Loan Service", value: "LoanService" },
  { name: "Account Service", value: "AccountService" },
  { name: "Cheque Service", value: "ChequeService" },
  { name: "Other Service", value: "OtherService" },
];

const serviceDetails = {
  CashService: [
    { name: "Cash Deposit", value: "CashDeposit" },
    { name: "Cash Withdrawal", value: "CashWithdrawal" },
  ],
  LoanService: [
    { name: "Personal Loan", value: "PersonalLoan" },
    { name: "Auto Loan", value: "AutoLoan" },
    { name: "Small Business Loan", value: "SmallBusinessLoan" },
  ],
  AccountService: [
    { name: "Account Opening", value: "AccountOpening" },
    { name: "Account Closing", value: "AccountClosing" },
    { name: "Balance Enquiry", value: "BalanceEnquiry" },
    { name: "Account Statement Request", value: "AccountStatementRequest" },
    { name: "Account Modification", value: "AccountModification" },
  ],
  ChequeService: [
    { name: "ChequeDeposit", value: "ChequeDeposit" },
    { name: "ChequeEncashment", value: "ChequeEncashment" },
  ],
  OtherService: [
    { name: "Financial Counselling", value: "FinancialCounselling" },
    { name: "Online Banking", value: "OnlineBanking" },
    { name: "Mobile Banking", value: "MobileBanking" },
  ],
};

const CustomerPanel = () => {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("counterid")) {
      toast.error("You do not have access to generate token.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/counter-executive");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) {
      console.log("Select at least 1 service");
    } else {
      await axios
        .post("http://localhost:8080/addtoken", {
          service: selectedService,
          subServices: selectedOptions,
        })
        .then(function (response) {
          if (JSON.parse(localStorage.getItem("UserToken"))) {
            localStorage.setItem(
              "UserToken",
              JSON.stringify(
                JSON.parse(localStorage.getItem("UserToken")).concat(
                  response.data
                )
              )
            );
          } else {
            localStorage.setItem("UserToken", JSON.stringify(response.data));
          }
          toast.success("Token Generated", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/all-counter-panel");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedOptions([]);
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <>
      <div className="flex flex-col text-center w-full space-y-2 py-16">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
          something here
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Pick Any service to generate Token
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[30rem] justify-between"
      >
        <div className="w-full flex flex-wrap justify-around p-5">
          {services.map((service) => (
            <div
              key={service.value}
              className="w-full md:w-5/12j lg:w-1/6 bg-gray-100 flex rounded flex-col shadow hover:shadow-lg h-max m-2"
            >
              <label className="flex items-center justify-between p-4">
                {service.name}
                <input
                  type="radio"
                  name="service"
                  value={service.value}
                  checked={selectedService === service.value}
                  onChange={handleServiceChange}
                />
              </label>
              {selectedService === service.value && (
                <div className="flex-col bg-gray-200">
                  {serviceDetails[service.value].map((option) => (
                    <div key={option.value} className="hover:bg-gray-300 p-3">
                      <label className="flex w-full space-x-5">
                        <input
                          type="checkbox"
                          name="option"
                          value={option.value}
                          checked={selectedOptions.includes(option.value)}
                          onChange={handleOptionChange}
                        />
                        <span className="">{option.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full pb-8">
          <button
            className="text-xl bg-indigo-500 hover:bg-indigo-600 text-white w-max py-2 px-6 rounded-md"
            type="submit"
          >
            Generate token
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerPanel;
