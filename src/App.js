import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChatbotFlow from "./components/ChatbotFlow";
import NodesPanel from "./components/NodesPanel";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App" style={{ display: "flex" }}>
        <NodesPanel />
        <ChatbotFlow />
      </div>
    </DndProvider>
  );
}

export default App;
