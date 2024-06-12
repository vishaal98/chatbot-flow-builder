import React from "react";
import { Handle } from "react-flow-renderer";
import "../assets/css/customNode.css";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">
        <i className="fas fa-paper-plane"></i> Send Message
      </div>
      <div className="custom-node-divider"></div>
      <div className="custom-node-content">{data.label}</div>
      <Handle type="target" position="top" className="handle handle-target" />
      <Handle
        type="source"
        position="bottom"
        className="handle handle-source"
      />
    </div>
  );
};

export default CustomNode;
