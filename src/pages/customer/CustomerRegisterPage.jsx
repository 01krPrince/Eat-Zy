import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChefHat, Mail, Lock, User, AlertCircle, ChevronLeft, X } from "lucide-react";
import { registerUser, verifyOtp } from "../../service/authService";

const CustomerRegisterPage = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const inputRefs = useRef([]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // OTP Logic
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleRegisterAction = async (e) => {
        e.preventDefault();
        setWarning("");
        setLoading(true);

        try {
            if (step === 1) {
                // Step 1: Register User
                await registerUser(formData);
                setStep(2);
                alert("OTP Sent to your email!");
            } else {
                // Step 2: Verify OTP
                const otpString = otp.join("");
                if (otpString.length < 6) {
                    setWarning("Please enter a valid 6-digit OTP");
                    setLoading(false);
                    return;
                }
                await verifyOtp(formData.email, otpString);
                alert("Account verified successfully! Please Login.");
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Registration failed.";
            setWarning(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="max-w-5xl w-full bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] border border-white/5 relative">

                {/* Header Controls */}
                <div className="absolute top-8 right-8 left-8 lg:left-auto flex justify-between lg:justify-end items-center gap-4 z-50">
                    {step === 2 && (
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-orange-500 transition-colors bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/5">
                            <ChevronLeft size={14} /> Back
                        </button>
                    )}
                    <button onClick={() => navigate("/")} className="bg-black/40 text-white p-2 rounded-full border border-white/10 hover:bg-orange-600 hover:border-orange-600 transition-all shadow-xl">
                        <X size={18} />
                    </button>
                </div>

                {/* Error Toast */}
                {warning && (
                    <div className="absolute top-24 lg:top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 z-50">
                        <AlertCircle size={18} />
                        <span className="text-xs font-bold">{warning}</span>
                    </div>
                )}

                {/* Left Side - Image */}
                <div className="lg:w-1/2 relative hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000" alt="Cooking" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-600 p-2 rounded-xl"><ChefHat className="text-white w-6 h-6" /></div>
                            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">Online<span className="text-orange-500">.Food</span></span>
                        </div>
                        <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                            {step === 1 ? "Start your journey." : "Secure Verification."}
                        </h2>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-16 flex flex-col justify-center bg-[#0d0d0d]">
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            {step === 1 ? "Create Account" : "Verify OTP"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Joined already?
                            <Link to="/login" className="ml-2 text-orange-500 font-bold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleRegisterAction}>

                        {step === 1 ? (
                            <>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none transition-all"
                                    />
                                </div>
                            </>
                        ) : (
                            // STEP 2: OTP
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
                                <div className="flex justify-between gap-2">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            value={data}
                                            onChange={(e) => handleOtpChange(e.target, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-12 h-14 lg:w-14 lg:h-16 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black text-orange-500 focus:border-orange-500 focus:bg-orange-500/5 outline-none transition-all"
                                        />
                                    ))}
                                </div>
                                <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
                                    Code sent to {formData.email}
                                </p>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-lg shadow-orange-900/20"
                        >
                            {loading ? "Processing..." : (step === 1 ? "Get OTP" : "Verify Account")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerRegisterPage;