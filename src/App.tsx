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

function App() {
  return (
    <BoardContextProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/boards" element={<BoardsRoute />} />
            <Route path="/boards/:id" element={<BoardPostsRoute />} />
          </Routes>
        </div>
        {/* <UploadWidget /> */}
      </BrowserRouter>
    </BoardContextProvider>
  );
}

export default App;
