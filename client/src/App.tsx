import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Converter } from "./components/Converter";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <nav>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/converter">Converter</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </div>
  );
}

export default App;
