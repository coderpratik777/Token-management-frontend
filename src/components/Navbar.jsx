import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container flex p-4 flex-col md:flex-row items-center justify-between">
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Bank Token</span>
          </Link>
          <nav className="flex flex-wrap space-x-24 items-center text-base justify-center">
            <Link to="/login/admin" className=" hover:text-gray-900">Admin Login</Link>
            
          <Link to="/login/counter-executive" className=" hover:text-gray-900">Counter Executive Login</Link>
         
         
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
