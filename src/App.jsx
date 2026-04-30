import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Weekly from "./pages/Weekly";
import Special from "./pages/Special";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/special" element={<Special />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && <Navbar />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
