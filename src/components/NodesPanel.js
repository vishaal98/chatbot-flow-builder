import React from "react";
import { useDrag } from "react-dnd";

const ItemTypes = {
  NODE: "node",
};

const Node = ({ id, label }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { id, label },
  }));

  return (
    <div
      ref={drag}
      style={{
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#ddd",
        cursor: "grab",
      }}
    >
      {label}
    </div>
  );
};

const NodesPanel = () => (
  <div style={{ padding: "10px", borderRight: "1px solid #ccc" }}>
    <Node id="textNode" label="Text Node" />
  </div>
);

export default NodesPanel;
