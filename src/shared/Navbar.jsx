import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat,
  User,
  MapPin,
  ShoppingBag,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPin, setSelectedPin] = useState("844502");

  const { state, dispatch } = useAuth();
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  /* ------------------ SCROLL EFFECT ------------------ */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------ CLICK OUTSIDE USER DROPDOWN ------------------ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------------------ LOGOUT ------------------ */
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    window.location.replace("/login");
  };

  const useDarkText = !isScrolled && !isDarkMode;
  const navTextClass = useDarkText ? "text-neutral-text" : "text-white";
  const navMutedClass = useDarkText ? "text-neutral-muted" : "text-gray-300";

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 h-20 flex items-center ${isScrolled
          ? "bg-neutral-text/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">

          {/* ---------- LEFT ---------- */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
                <ChefHat className="text-white w-5 h-5" />
              </div>
              <span
                className={`font-black text-xl tracking-tighter uppercase italic ${navTextClass}`}
              >
                Online<span className="text-primary">.Food</span>
              </span>
            </Link>

            <button
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border ${useDarkText
                ? "bg-gray-100 border-gray-300"
                : "bg-white/10 border-white/20"
                }`}
            >
              <MapPin size={14} className="text-primary" />
              <span className={`text-xs font-bold ${navTextClass}`}>
                {selectedPin}
              </span>
            </button>
          </div>

          {/* ---------- DESKTOP MENU ---------- */}
          <div className="hidden md:flex items-center space-x-6">
            {["Explore", "Subscriptions"].map((item) => (
              <Link
                key={item}
                to="/"
                className={`text-[11px] font-bold uppercase tracking-widest hover:text-primary transition ${navTextClass}`}
              >
                {item}
              </Link>
            ))}

            {state.isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/15"
                >
                  <div className="text-right leading-tight">
                    <span className={`text-[9px] font-black uppercase ${navMutedClass}`}>
                      Account
                    </span>
                    <span className={`text-[11px] font-bold uppercase ${navTextClass}`}>
                      {state.user?.name}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <User size={14} />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 bg-gray-50">
                      <p className="text-sm font-bold truncate">
                        {state.user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <DropdownItem
                        icon={<User size={16} />}
                        label="My Profile"
                        onClick={() => navigate("/profile")}
                      />
                      <DropdownItem icon={<ShoppingBag size={16} />} label="Active Orders" />
                      <DropdownItem icon={<History size={16} />} label="Order History" />
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-5 py-3 text-red-600 hover:bg-red-50 font-bold"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white text-[11px] font-black uppercase rounded-full"
              >
                Login
              </Link>
            )}
          </div>

          {/* ---------- MOBILE HAMBURGER ---------- */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden ${navTextClass}`}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ===================== MOBILE MENU ===================== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)} // 👈 OUTSIDE CLICK
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()} // 👈 PREVENT CLOSE INSIDE
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-black text-lg">
                Online<span className="text-primary">.Food</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-4 font-bold">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Subscriptions</Link>
            </div>

            <div className="h-px bg-gray-200 my-6" />

            {state.isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 font-bold"
                >
                  <User size={18} /> My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-600 font-bold mt-4"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 bg-primary text-white py-2 rounded-full text-center font-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const DropdownItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100"
  >
    <span className="text-gray-600">{icon}</span>
    <span className="font-bold text-sm">{label}</span>
  </button>
);

export default Navbar;
