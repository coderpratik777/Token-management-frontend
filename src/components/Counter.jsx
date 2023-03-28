import React from "react";
import { HiOutlineNewspaper } from "react-icons/hi";

const Counter = (props) => {
  const tokenData = [
    {
      tokenId: 1,
      tokenStatus: "Active",
    },
    {
      tokenId: 2,
      tokenStatus: "Active",
    },
    {
      tokenId: 3,
      tokenStatus: "Active",
    },
  ];
  return (
    <div className="text-center">
      <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
        Counter List
      </h1>
      <div className="flex items-center justify-center h-screen">
        <div className="flex-col w-1/4 ">
          {tokenData.
          map((items) => (
            <div class="bg-gray-100 my-2 rounded flex p-4 h-full items-center">
              <HiOutlineNewspaper className="teaxtxl" />
              <span class="title-font font-medium">{items.tokenId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counter;
