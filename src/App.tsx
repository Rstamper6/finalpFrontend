import "./App.css";
import { CreateBoard } from "./components/CreateBoard";
import ImageUploader from "./components/ImageUploader";
import Home from "./components/ImageUploader";
import { useState } from "react";
import BoardList from "./components/BoardList";

function App() {
  return (
    <div className="App">
      <BoardList />
    </div>
  );
}

export default App;
