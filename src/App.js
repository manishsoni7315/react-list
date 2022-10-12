import logo from "./logo.svg";
import "./App.css";
import List from "./components/List";
import ShowData from "./components/ShowData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="showData/:id" element={<ShowData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
