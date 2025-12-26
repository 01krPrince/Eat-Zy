import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Menu, X, User, Instagram, Twitter, MapPin, ChevronDown, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Mock Pincodes
const PINCODES = ["812001", "812002", "110001", "400001", "560001"];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState("844502");

  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("auth");
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const NavLink = ({ item }) => (
    <a href={`#${item.toLowerCase().replace(" ", "")}`} className="relative overflow-hidden px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-500 group/link">
      <span className="absolute inset-0 bg-orange-600 -translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out z-[-1]"></span>
      <span className="relative z-10">{item}</span>
    </a>
  );

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 h-20 flex items-center ${isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-orange-500/50 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center h-16">

        {/* Left Section: Logo & Pincode */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group z-[110]">
            <div className="bg-orange-600 p-1.5 md:p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-600/20">
              <ChefHat className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-black text-lg md:text-2xl tracking-tighter text-white uppercase italic">
              Online<span className="text-orange-500">.Food</span>
            </span>
          </Link>

          {/* AREA PINCODE SELECTOR */}
          <div className="relative z-[110]">
            <button
              onClick={() => setIsPinOpen(!isPinOpen)}
              className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group backdrop-blur-md"
            >
              <MapPin size={14} className="text-orange-500 group-hover:animate-bounce" />
              <div className="text-left hidden xs:block">
                <p className="text-[8px] font-black uppercase tracking-[0.1em] text-gray-500 leading-none mb-0.5">Area</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] md:text-xs font-bold text-white tracking-tight">{selectedPin}</span>
                  <ChevronDown size={10} className={`text-gray-500 transition-transform duration-300 ${isPinOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <span className="xs:hidden text-[10px] font-bold text-white">{selectedPin}</span>
            </button>

            {/* Pincode Dropdown Menu */}
            {isPinOpen && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setIsPinOpen(false)}></div>
                <div className="absolute top-full mt-3 left-0 w-40 md:w-48 bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                  <p className="px-3 py-2 text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 mb-1">Select Delivery Area</p>
                  {PINCODES.map((pin) => (
                    <button
                      key={pin}
                      onClick={() => {
                        setSelectedPin(pin);
                        setIsPinOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${selectedPin === pin
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {pin}
                      {selectedPin === pin && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <div className="flex items-center">
            {["Explore", "Subscriptions", "Safety"].map((item) => <NavLink key={item} item={item} />)}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {state.isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Welcome</span>
                <span className="text-[11px] font-bold text-orange-500 uppercase tracking-widest">{state.user?.name || "Chef"}</span>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all duration-300">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="relative overflow-hidden group/login px-6 py-2 text-[11px] font-black uppercase tracking-widest text-white border border-white/10 rounded-full transition-all duration-500">
              <span className="absolute inset-0 bg-white -translate-y-full group-hover/login:translate-y-0 transition-transform duration-500 ease-out z-[-1]"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover/login:text-black transition-colors duration-500">
                <User size={14} className="text-orange-500" /> Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-[110] flex items-center gap-2">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 transition-all duration-300 ${isMobileMenuOpen ? 'text-white' : 'text-orange-500'}`}>
            {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[105] md:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full pt-32 pb-12 px-8">
          <div className="flex flex-col space-y-6">
            {["Explore", "Subscriptions", "Safety", "Our Story"].map((item, idx) => (
              <a key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-black text-white uppercase tracking-tighter hover:text-orange-500 transition-all transform duration-500 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}>
                {item}
              </a>
            ))}
          </div>
          <div className={`mt-auto space-y-4 transition-all duration-700 delay-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {state.isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center">Logged in as <span className="text-white">{state.user?.name}</span></p>
                <button onClick={handleLogout} className="w-full py-4 bg-orange-600 text-white text-center text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-600/20">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 border border-white/10 text-white text-center text-xs font-black uppercase tracking-widest rounded-xl bg-white/5 backdrop-blur-md">Login to Account</Link>
            )}
            <div className="flex justify-center gap-8 pt-8 border-t border-white/5">
              <Instagram className="text-gray-500 hover:text-orange-500 transition-colors" size={24} />
              <Twitter className="text-gray-500 hover:text-orange-500 transition-colors" size={24} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;