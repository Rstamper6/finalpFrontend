import UploadWidget from "./components/UploadWidget";
import "./App.css";
// import UploadWidget from "./components/UploadWidget";
import "./App.css";
import "../src/css/Services.css"
import "../src/css/Board.css"
import Services from "./components/Services";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      {/* <UploadWidget /> */}
      <Services/>
      <Board/>
    </div>
  );
}

export default App;