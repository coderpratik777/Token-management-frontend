import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCountertops, MdGeneratingTokens } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

const Home = () => {
  return (
    <>
      <section className="text-gray-600 body-font px-5 py-24 w-full flex flex-col items-center space-y-24">
        <div className="flex flex-col text-center w-full space-y-2">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
            We put the 'bank' in bankrupt
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Welcome To Apli bank
          </h1>
        </div>
        <div className="flex md:flex-row flex-col w-3/5">
          <Link
            to="/customer-panel"
            className="flex rounded-lg items-center bg-gray-100 m-2 p-8 space-x-2 md:space-x-4 w-full md:w-1/2 hover:shadow-lg"
          >
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <MdGeneratingTokens className="text-xl" />
            </div>
            <h2 className="text-gray-900 text-lg  title-font font-medium">
              Generate Token
            </h2>
            <div className=" text-indigo-500 inline-flex items-center">
              <BsArrowRightShort className="text-2xl" />
            </div>
          </Link>
          <Link
            to="/all-counter-panel"
            className="flex rounded-lg items-center bg-gray-100 m-2 p-8 space-x-2 md:space-x-4 w-full md:w-1/2 hover:shadow-lg"
          >
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <MdOutlineCountertops className="text-xl" />
            </div>
            <h2 className="text-gray-900 text-lg title-font font-medium">
              Counter Status
            </h2>
            <div className=" text-indigo-500 inline-flex items-center">
              <BsArrowRightShort className="text-2xl" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
