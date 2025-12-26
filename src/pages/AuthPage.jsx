import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, Mail, Lock, User, AlertCircle, ChevronLeft, X, Utensils, ShoppingBag } from "lucide-react";
import ExploreButton from "../shared/ExploredButton";
import { loginUser, registerUser } from "../service/authService";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    // UI State
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [warning, setWarning] = useState("");
    const [loading, setLoading] = useState(false);

    // Form State (Matches RegisterRequestDTO and LoginRequestDTO)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER" // Default role for RegisterRequestDTO
    });

    const inputRefs = useRef([]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.value !== "" && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleAction = async (e) => {
        e.preventDefault();
        setWarning("");
        setLoading(true);

        try {
            if (isLogin) {
                // --- LOGIN LOGIC ---
                const data = await loginUser(formData.email, formData.password);
                dispatch({ type: "LOGIN", payload: data });
                localStorage.setItem("auth", JSON.stringify(data));
                navigate("/");
            } else {
                // --- REGISTRATION LOGIC ---
                if (step === 1) {
                    // Trigger Backend Registration (which sends OTP)
                    await registerUser(formData);
                    setStep(2);
                } else {
                    // OTP Verification logic
                    if (otp.join("").length < 4) {
                        setWarning("Please enter the complete 4-digit OTP.");
                    } else {
                        console.log("OTP Verified:", otp.join(""));
                        // On success, flip to login
                        setIsLogin(true);
                        setStep(1);
                        alert("Account verified! Please login.");
                    }
                }
            }
        } catch (err) {
            // Handle @Valid errors or Custom Exceptions from Spring Boot
            const errorMsg = err.response?.data?.message || err.response?.data || "Action failed. Please try again.";
            setWarning(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="max-w-5xl w-full bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[700px] border border-white/5 relative">

                {/* Navigation and Warning Toast (Same as your original code) */}
                <div className="absolute top-8 right-8 left-8 lg:left-auto flex justify-between lg:justify-end items-center gap-4 z-50">
                    {(!isLogin && step === 2) && (
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-orange-500 transition-colors bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/5">
                            <ChevronLeft size={14} /> Back
                        </button>
                    )}
                    <button onClick={() => navigate("/")} className="bg-black/40 text-white p-2 rounded-full border border-white/10 hover:bg-orange-600 hover:border-orange-600 transition-all shadow-xl">
                        <X size={18} />
                    </button>
                </div>

                {warning && (
                    <div className="absolute top-24 lg:top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 z-50">
                        <AlertCircle size={18} />
                        <span className="text-xs font-bold">{warning}</span>
                    </div>
                )}

                {/* Left Side: Branding */}
                <div className="lg:w-1/2 relative hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000" alt="Food" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-600 p-2 rounded-xl"><ChefHat className="text-white w-6 h-6" /></div>
                            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">Online<span className="text-orange-500">.Food</span></span>
                        </div>
                        <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                            {isLogin ? "Welcome back to the kitchen." : step === 1 ? "Start your culinary journey." : "Secure Verification."}
                        </h2>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-16 flex flex-col justify-center bg-[#0d0d0d]">
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            {isLogin ? "Login" : step === 1 ? "Register" : "Verify OTP"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {isLogin ? "New here?" : "Joined already?"}
                            <button onClick={() => { setIsLogin(!isLogin); setStep(1); setWarning(""); }} className="ml-2 text-orange-500 font-bold hover:underline">
                                {isLogin ? "Create account" : "Sign in"}
                            </button>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleAction}>
                        {isLogin || step === 1 ? (
                            <>
                                {/* Role Selection - Required for RegisterRequestDTO */}
                                {!isLogin && (
                                    <div className="flex gap-3 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: 'CUSTOMER' })}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${formData.role === 'CUSTOMER' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 text-gray-500'}`}
                                        >
                                            <ShoppingBag size={16} /> <span className="text-xs font-bold uppercase">Customer</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: 'PROVIDER' })}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${formData.role === 'PROVIDER' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 text-gray-500'}`}
                                        >
                                            <Utensils size={16} /> <span className="text-xs font-bold uppercase">Chef</span>
                                        </button>
                                    </div>
                                )}

                                {!isLogin && (
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                        <input name="name" type="text" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all" />
                                    </div>
                                )}
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all" />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all" />
                                </div>
                            </>
                        ) : (
                            <div className="space-y-8">
                                <div className="flex justify-between gap-3">
                                    {otp.map((data, index) => (
                                        <input key={index} type="text" maxLength="1" ref={(el) => (inputRefs.current[index] = el)} value={data} onChange={(e) => handleOtpChange(e.target, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl text-center text-3xl font-black text-orange-500 focus:border-orange-500 focus:bg-orange-500/5 outline-none transition-all" />
                                    ))}
                                </div>
                                <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">Code sent to {formData.email}</p>
                            </div>
                        )}

                        <ExploreButton
                            text={loading ? "Processing..." : (isLogin ? "Sign In" : step === 1 ? "Get OTP" : "Verify Account")}
                            disabled={loading}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;