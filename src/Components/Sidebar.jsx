import React from 'react';
import { IoMdArrowBack } from "react-icons/io";

const Sidebar = ({  selectedNode, handleTextChange,handleBack }) => {
  // console.log('Selected Node in Sidebar:', selectedNode); // Debugging line
  // const x = JSON.parse(selectedNode)
  // debugger;
  

  return (
    <aside style={{ padding: '10px', width: '300px', borderLeft: '1px solid #ddd' }}>
       <button
        onClick={handleBack}
        className="mb-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        <div className='flex flex-row pt-1'>
          <IoMdArrowBack />
          <span className='pl-1 pr-1 mb-1'>Back</span>
        </div>
        
        
      </button>
     <div >
    
      Edit the text below
     </div>
      {selectedNode && (
        <div>
        
          <textarea id='messageArea' className="w-full h-32 p-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
           placeholder='new message...'
            onChange={handleTextChange}
          />
        </div>
      )}
      
    </aside>
  );
};

export default Sidebar;