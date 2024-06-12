import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { useDrop } from "react-dnd";
import SettingsPanel from "./SettingsPanel";
import CustomNode from "./CustomNode";
import "../assets/css/customNode.css";
import "../assets/css/chatbotFlow.css";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "Welcome to the chatbot!" },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  custom: CustomNode, // Register custom node type
};

const ChatbotFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = (params) => {
    const sourceConnected = edges.some(
      (edge) =>
        edge.source === params.source &&
        edge.sourceHandle === params.sourceHandle
    );

    if (!sourceConnected) {
      setEdges((eds) => addEdge(params, eds));
    } else {
      alert("Source handle can only have one edge originating from it.");
    }
  };

  const onNodeSelect = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeChange = (id, newText) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newText } }
          : node
      )
    );
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "node",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const position = {
        x: offset.x - 200,
        y: offset.y - 50,
      };
      const newNode = {
        id: `${new Date().getTime()}`,
        type: "custom", // Use custom node type
        position,
        data: { label: item.label },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSave = () => {
    const emptyTargetNodes = nodes.filter((node) => {
      const connectedEdges = edges.filter((edge) => edge.source === node.id);
      return connectedEdges.length === 0;
    });

    if (emptyTargetNodes.length > 1) {
      alert("Error: More than one node has empty target handles");
    } else {
      alert("Flow saved successfully");
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div ref={drop} style={{ height: 500, width: "80%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeSelect}
          nodeTypes={nodeTypes} // Register custom node types
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode && (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeChange={onNodeChange}
        />
      )}
      <button
        className="saveButton"
        onClick={handleSave}
        style={{ margin: "10px" }}
      >
        Save Flow
      </button>
    </div>
  );
};

export default ChatbotFlow;
