import React from 'react';
import { AiOutlineMessage } from "react-icons/ai";

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div title="Drag this add New Node" style={{ padding: "10px", width: "150px", height:'100px' ,borderRight: '1px solid #ddd' }}>
     
      <div className="flex flex-row bg-gray-200 text-white font-bold py-2 px-4 rounded shadow-lg cursor-move"
        onDragStart={(event) => onDragStart(event, 'custom')}  // Pass the string 'custom'
        draggable 
        style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, margin: '10px 0' }}
      >
        <AiOutlineMessage className="text-2xl text-black" />
        <span className="text-md text-black pl-3" >Message</span>
      </div>
    </div>
  );
};

export default NodesPanel;