import UploadWidget from "./components/UploadWidget";
import "./App.css";
import { Header } from './components/header';
import { LandingPage } from "./components/landingPage";

function App() {
  return (
    <div className="App">
      {/* <UploadWidget /> */}
      <Header />
      <LandingPage />
    </div>
  );
}

export default App;
