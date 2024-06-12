import React from "react";

const SettingsPanel = ({ selectedNode, onNodeChange }) => {
  const handleChange = (event) => {
    const newText = event.target.value;
    onNodeChange(selectedNode.id, newText);
  };

  return (
    <div style={{ padding: "10px", borderLeft: "1px solid #ccc" }}>
      <h3>Settings</h3>
      <input
        type="text"
        value={selectedNode.data.label}
        onChange={handleChange}
      />
    </div>
  );
};

export default SettingsPanel;
