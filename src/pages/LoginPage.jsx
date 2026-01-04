import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChefHat, Mail, Lock, AlertCircle, X } from "lucide-react";
import { loginUser } from "../service/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setWarning("");
        setLoading(true);

        try {
            const data = await loginUser(formData.email, formData.password);

            dispatch({ type: "LOGIN", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));

            const userRole = data.role;
            if (userRole === 'ADMIN') navigate("/admin", { replace: true });
            else if (userRole === 'PROVIDER') navigate("/dashboard", { replace: true });
            else navigate("/", { replace: true });

        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Invalid credentials";
            setWarning(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="max-w-5xl w-full bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] border border-white/5 relative">

                {/* Close Button */}
                <div className="absolute top-8 right-8 z-50">
                    <button onClick={() => navigate("/")} className="bg-black/40 text-white p-2 rounded-full border border-white/10 hover:bg-orange-600 hover:border-orange-600 transition-all shadow-xl">
                        <X size={18} />
                    </button>
                </div>

                {/* Error Toast */}
                {warning && (
                    <div className="absolute top-24 lg:top-8 right-8 lg:right-auto lg:left-8 bg-red-500/90 backdrop-blur text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 z-50">
                        <AlertCircle size={18} />
                        <span className="text-xs font-bold">{warning}</span>
                    </div>
                )}

                {/* Left Side - Image */}
                <div className="lg:w-1/2 relative hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000" alt="Food" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-600 p-2 rounded-xl"><ChefHat className="text-white w-6 h-6" /></div>
                            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">Online<span className="text-orange-500">.Food</span></span>
                        </div>
                        <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                            Welcome back. <br /> Taste the difference.
                        </h2>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-1/2 w-full p-8 lg:p-16 flex flex-col justify-center bg-[#0d0d0d]">
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            Login
                        </h3>
                        <p className="text-gray-500 text-sm">
                            New here?
                            <Link to="/register" className="ml-2 text-orange-500 font-bold hover:underline">
                                Create account
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
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

                        {/* Replace with <ExploreButton /> if you prefer */}
                        <button
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-lg shadow-orange-900/20"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;