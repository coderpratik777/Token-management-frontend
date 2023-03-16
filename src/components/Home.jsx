import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="text-gray-600 body-font px-5 py-24 w-full flex flex-col items-center space-y-24">
        <div className="flex flex-col text-center w-full space-y-2">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
            something here
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Welcome To Apli bank
          </h1>
        </div>
        <div className="flex w-3/5 space-x-3">
          <Link
            to="/customer-panel"
            className="flex rounded-lg items-center bg-gray-100 p-8 space-x-4 w-1/2 hover:shadow-lg"
          >
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">
              Generate Token
            </h2>
            <div className=" text-indigo-500 inline-flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
          <Link
            to="/all-counter-panel"
            className="flex rounded-lg items-center bg-gray-100 p-8 space-x-4 w-1/2 hover:shadow-lg"
          >
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">
              Counter Status
            </h2>
            <div className=" text-indigo-500 inline-flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
