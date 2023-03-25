// import UploadWidget from "./components/UploadWidget";
import "./App.css";
import "./css/Board.css";
import "./css/boardlist.css";
import { Header } from "./components/header";
import { LandingPage } from "./components/landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardsRoute from "./routes/BoardsRoute";
import { BoardPostsRoute } from "./routes/BoardPostsRoute";
import BoardContextProvider from "./context/BoardContectProvider";
import { FormEvent, useState } from "react";
import Board, { BoardPost } from "./models/GraveBook";

function App() {
  const [boardLists, setBoardLists] = useState<Board[]>([]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setBoardLists(boardLists);
  };

  //callback function
  function UpdateBoards(boardlist: Board[]) {
    console.log(boardlist);
    setBoardLists([...boardlist]);
  }
  return (
    <BoardContextProvider>
      <BrowserRouter>
        <div className="App" onSubmit={(e) => onSubmit(e)}>
          <Header UpdateBoards={UpdateBoards} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/boards" element={<BoardsRoute />} />
            <Route path="/boards/:id" element={<BoardPostsRoute />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BoardContextProvider>
  );
}

export default App;
