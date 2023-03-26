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
import AuthContextProvider from "./context/AuthContextProvider";
import { FormEvent, useState } from "react";
import Board from "./models/GraveBook";

function App() {
  const [boardLists, setBoardLists] = useState<Board[]>([]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setBoardLists(boardLists);
  };

  //callback function
  function UpdateBoards(apiResponseBoardList: Board[]) {
    console.log(apiResponseBoardList);
    setBoardLists([...apiResponseBoardList]);
  }
  return (
    <AuthContextProvider>
      <BoardContextProvider>
        <BrowserRouter>
          <div className="App" onSubmit={(e) => onSubmit(e)}>
            <Header UpdateBoards={UpdateBoards} />
            <Routes>
              <Route
                path="/"
                element={<LandingPage boardLists={boardLists} />}
              />
              <Route path="/boards" element={<BoardsRoute />} />
              <Route path="/boards/:id" element={<BoardPostsRoute />} />
            </Routes>
          </div>
          {/* <UploadWidget /> */}
        </BrowserRouter>
      </BoardContextProvider>
    </AuthContextProvider>
  );
}

export default App;
