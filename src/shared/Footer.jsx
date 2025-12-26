import React from "react";
import {
  ChefHat,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Smartphone,
  Mail,
  Apple,
  Play,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-10 font-sans border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/[0.03] rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- Top Section: Brand & Borderless AppCTA --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/5 pb-16 mb-16 gap-12">

          {/* Brand & Mission */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/20">
                <ChefHat className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                online<span className="text-orange-500">.food</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-medium">
              Experience the soul of home-cooked meals, curated by master chefs and delivered to your doorstep. Join our culinary community today.
            </p>
          </div>

          {/* BORDERLESS APP CTA (Integrated Top-Right) */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-md">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
              Mobile Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tighter leading-tight">
              Your kitchen <br />
              <span className="font-serif italic font-light text-orange-50/80">is now portable.</span>
            </h2>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-orange-50 transition-all font-black uppercase text-[10px] tracking-widest">
                <Apple size={14} fill="currentColor" /> App Store
              </button>
              <button className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all font-black uppercase text-[10px] tracking-widest">
                <Play size={14} fill="currentColor" /> Play Store
              </button>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.4em]">Company</h4>
            <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2">Blog <ArrowRight size={10} /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.4em]">Support</h4>
            <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Safety Protocol</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Partner FAQ</a></li>
              <li className="pt-2 italic tracking-normal lowercase text-orange-500/70">support@onlinefood.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.4em]">Policy</h4>
            <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Settings</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.4em]">Newsletter</h4>
            <p className="text-gray-600 text-[10px] mb-4 font-bold uppercase tracking-widest leading-relaxed">Join for culinary updates</p>
            <div className="flex bg-white/5 rounded-xl border border-white/5 p-1 mb-8">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent text-[9px] font-black p-3 focus:outline-none uppercase tracking-widest placeholder:text-gray-700"
              />
              <button className="bg-orange-600 px-5 rounded-lg text-white font-black text-[9px] hover:bg-orange-700 tracking-widest transition-colors">
                JOIN
              </button>
            </div>
            <div className="flex gap-5">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-700 hover:text-orange-500 transition-all transform hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Footer Bar --- */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
              © 2025 online-food Technologies Pvt. Ltd.
            </p>
            <div className="flex gap-4 text-[9px] font-bold text-gray-700 uppercase tracking-widest">
              <span>GST: 12AAAAA0000A1Z5</span>
              <span>FSSAI: 10000000000001</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.02] px-6 py-3 rounded-full border border-white/5 hover:border-orange-500/30 transition duration-500 group">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              Design by{" "}
              <a href="https://www.linkedin.com/in/01krPrince" target="_blank" className="text-gray-400 group-hover:text-white transition-colors">
                &lt;/01krPrince&gt;
              </a>{" "}
              <span className="text-orange-600 ml-2">❤</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;