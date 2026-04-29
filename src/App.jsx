import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Weekly from "./pages/Weekly";
import Special from "./pages/Special";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/special" element={<Special />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
