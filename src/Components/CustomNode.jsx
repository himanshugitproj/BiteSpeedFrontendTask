import React from 'react';
import { Handle } from 'reactflow';
import { AiOutlineMessage } from "react-icons/ai";

const CustomNode = ({ data }) => {
  return (
    <div className=" w-64 rounded-md shadow-md border border-gray-400 p-2 active:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 ">
      <Handle type="target" position="left" className="w-2 h-2 bg-gray-500 -ml-2" />
      <div style={{margin:'-8px'}}  className="flex items-center bg-teal-300 p-2 rounded-t-md">
        <AiOutlineMessage className="text-lg text-gray-700" />
        <div className="ml-2 text-sm font-semibold text-gray-700">Send Message </div>
      </div>
      <div className="p-2 text-sm text-gray-700 mt-3">{data.label}</div>
      <Handle type="source" position="right" className="w-2 h-2 bg-gray-500 -mr-2" />
    </div>
  );
};

export default CustomNode;