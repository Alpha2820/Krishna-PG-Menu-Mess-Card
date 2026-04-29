import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiInfo, FiCalendar, FiCoffee } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#0b0f14] border-t border-gray-800">
      <div className="flex justify-around items-center py-2">
        <NavItem
          icon={<FiHome />}
          label="Home"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        <NavItem
          icon={<FiCalendar />}
          label="Weekly"
          active={location.pathname === "/weekly"}
          onClick={() => navigate("/weekly")}
          cursor="pointer"
        />
        <NavItem
          icon={<FiCoffee />}
          label="Special"
          active={location.pathname === "/special"}
          onClick={() => navigate("/special")}
          cursor="pointer"
        />
        <NavItem
          icon={<FiInfo />}
          label="About"
          active={location.pathname === "/about"}
          onClick={() => navigate("/about")}
          cursor="pointer"
        />
      </div>
    </nav>
  );
}

const NavItem = ({ icon, label, active, onClick, cursor }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center text-xs ${
      active ? "text-amber-400" : "text-gray-400"
    }`}
    style={{ cursor }}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] mt-1">{label}</span>
    {active && <div className="w-5 h-1 bg-amber-400 rounded-full mt-1"></div>}
  </button>
);

export default Navbar;
