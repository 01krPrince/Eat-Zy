import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ChefHat, User, MapPin,
  ShoppingBag, History, LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPin, setSelectedPin] = useState("844502");

  const { state, dispatch } = useAuth();
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    window.location.replace("/login");
  };

  const useDarkText = !isScrolled && !isDarkMode;
  const navTextClass = useDarkText ? "text-neutral-text" : "text-white";
  const navMutedClass = useDarkText ? "text-neutral-muted" : "text-gray-300";

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 h-20 flex items-center ${isScrolled
      ? "bg-neutral-text/90 dark:bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
      : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">

        {/* LEFT: LOGO & PINCODE */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
              <ChefHat className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className={`font-black text-lg md:text-2xl tracking-tighter uppercase italic ${navTextClass}`}>
              Online<span className="text-primary">.Food</span>
            </span>
          </Link>

          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${useDarkText ? "bg-gray-100 border-gray-300" : "bg-white/10 border-white/20"
            }`}>
            <MapPin size={14} className="text-primary" />
            <span className={`text-[10px] md:text-xs font-bold ${navTextClass}`}>{selectedPin}</span>
          </button>
        </div>

        {/* RIGHT: NAV LINKS & USER MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            {["Explore", "Subscriptions"].map((item) => (
              <Link
                key={item}
                to="/"
                className={`text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors ${navTextClass}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {state.isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all ${useDarkText ? "hover:bg-gray-200" : "hover:bg-white/15"
                  }`}
              >
                <div className="flex flex-col items-end text-right leading-tight">
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${navMutedClass}`}>Account</span>
                  <span className={`text-[11px] font-bold uppercase ${navTextClass}`}>{state.user?.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                  <User size={14} />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full mt-3 right-0 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[120]">

                  {/* Signed in header - light background */}
                  <div className="px-5 py-4 bg-gray-50">
                    <p className="text-sm font-bold text-gray-900 mt-1 truncate">
                      {state.user?.email || "User"}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    {/* <DropdownItem onClick={navigate('/profile')} icon={<User size={16} />} label="My Profile" /> */}
                    <DropdownItem
                      onClick={() => {
                        navigate('/profile');
                        setIsUserMenuOpen(false); // Optional: Close menu after clicking
                      }}
                      icon={<User size={16} />}
                      label="My Profile"
                    />
                    <DropdownItem icon={<ShoppingBag size={16} />} label="Active Orders" />
                    <DropdownItem icon={<History size={16} />} label="Order History" />
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-3.5 text-red-600 hover:bg-red-50 transition-colors font-bold text-sm"
                  >
                    <LogOut size={16} />
                    Logout Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-primary/90 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// Dropdown items - dark text for white background
const DropdownItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-100 transition-colors text-left"
  >
    <span className="text-gray-600">{icon}</span>
    <span className="text-sm font-bold text-gray-900">{label}</span>
  </button>
);

export default Navbar;