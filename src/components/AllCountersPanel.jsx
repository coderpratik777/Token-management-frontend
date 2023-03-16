import React from "react";
import { Link } from "react-router-dom";

const AllCountersPanel = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link to="/counter" className="p-4 lg:w-1/4">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Counter 1
                </h1>
                <p className="leading-relaxed mb-3">Cash services</p>
                <a
                  href="/counter1"
                  className="text-indigo-500 inline-flex items-center"
                >
                  10 waiting
                </a>
              </div>
            </Link>
            <Link to="/counter" className="p-4 lg:w-1/4">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Counter 2
                </h1>
                <p className="leading-relaxed mb-3">Cash services</p>
                <a
                  href="/counter1"
                  className="text-indigo-500 inline-flex items-center"
                >
                  10 waiting
                </a>
              </div>
            </Link>
            <Link to="/counter" className="p-4 lg:w-1/4">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Counter 3
                </h1>
                <p className="leading-relaxed mb-3">Loan Services</p>
                <a
                  href="/counter1"
                  className="text-indigo-500 inline-flex items-center"
                >
                  10 waiting
                </a>
              </div>
            </Link>
            <Link className="p-4 lg:w-1/4">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative hover:shadow-lg">
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Counter 4
                </h1>
                <p className="leading-relaxed mb-3">Cash services</p>
                <a
                  href="/counter1"
                  className="text-indigo-500 inline-flex items-center"
                >
                  10 waiting
                </a>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllCountersPanel;
