import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CustomNode from './Components/CustomNode';
import NodesPanel from './Components/NodePanel';
import Sidebar from './Components/Sidebar';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 20, y: 200 },
    data: { label: 'Test message 1' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 420, y: 100 },
    data: { label: 'Test message 2' },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'default', markerEnd: { type: 'arrowclosed' }  }];

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [localStore,setlocalStore] = useState(false);

  // useEffect to load data from local storage on page load
  const clearDataFromLocalStorage = ()=>{
    localStorage.clear();
    setlocalStore((prev) => !prev);
    window.location.reload()
  }
  
  useEffect(() => {
    const storedNodes = JSON.parse(localStorage.getItem('nodes'));
    const storedEdges = JSON.parse(localStorage.getItem('edges'));
    console.log(storedNodes)
    if (storedNodes) setNodes(storedNodes);
    if (storedEdges) setEdges(storedEdges);
  }, [localStore]);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => {
      // Check if there's already an edge with the same source
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (sourceHasEdge) {
        alert('A source handle can only have one edge originating from it.');
      } else {
        const newEdge = {
          ...params,
          markerEnd: { type: 'arrowclosed' }, // Add the arrow to the new edge
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [edges]
  );
  const onNodeClick = (event, node) => {
    console.log('Node clicked:', node); // Debugging line
    setSelectedNode(node);
    setShowSidebar(true);
    document.getElementById('messageArea').innerText = node.data.label
  };
  const onEdgeClick = (event, edge) => {
    console.log('Edge clicked:', edge); // Debugging line
    setSelectedNode(edge);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      if (!type) return;

      const newNode = {
        id: (nodes.length + 1).toString(),
        type: 'custom',
        position,
        data: { label: 'New Message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  // function for move dropEffect
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // function to Change message
  const handleTextChange = (event) => {
    const { value } = event.target;
    // console.log(value); 
    // console.log('Selected Node:', selectedNode); // Debugging line
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          node.data.label = value;
        }
        return node;
      })
    );
  };


  const handleBack = () => setShowSidebar(false);
  const onSave = () => {
    if (
      nodes.filter((node) => edges.every((edge) => edge.target !== node.id))
        .length > 1
    ) {
      alert('Error: More than one node with empty target handle!');
    } else {
      localStorage.setItem('nodes', JSON.stringify(nodes));
      localStorage.setItem('edges', JSON.stringify(edges));
      alert('Flow saved successfully!');
    }
  };

  return (
  
    <div >

   
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <div className="h-screen flex flex-col">
          {/* Top bar with Save Changes button */}
          <div className="flex items-center justify-end bg-gray-300 p-2">
            <div className="text-sm font-semibold text-gray-700"></div>
            <button
              className="px-2 py-1 mr-5 text-xs font-medium text-white pt-2 pb-2 bg-red-500 pointer rounded hover:bg-red-600"
              onClick={clearDataFromLocalStorage}
            >
              Start from Scratch
            </button>
            <button
              onClick={onSave}
              className="px-2 py-1 w-32 text-xs font-medium text-white pt-2 pb-2 bg-blue-600 rounded hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
          <div className="flex flex-1">
            <div
              className="flex-1 relative"
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onLoad={(reactFlowInstance) => reactFlowInstance.fitView()}
              >
                <Background />
                <Controls />
               
              </ReactFlow>
            </div>
            <div>
              {showSidebar ? (
                <Sidebar
                  handleSave={onSave}
                  selectedNode={selectedNode}
                  handleTextChange={handleTextChange}
                  handleBack={handleBack}
                />
              ) : (
                <NodesPanel />
              )}
            </div>
          </div>
        </div>
      </ReactFlowProvider>
    </DndProvider>
    </div>
  );
}

export default App;






