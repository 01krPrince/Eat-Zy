import { useNavigate } from 'react-router-dom';
import { ChefHat, TrendingUp, Wallet, ArrowRight } from 'lucide-react';

const Onboarding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* --- Navbar --- */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                    <ChefHat size={28} />
                    <span>TiffinMates</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-gray-600 hover:text-orange-600 font-medium px-4"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <div className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 lg:pr-10 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        Turn your <span className="text-orange-600">Kitchen</span> into a <br />
                        Business.
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Join thousands of home chefs and tiffin providers. We handle the delivery and payments, you focus on cooking delicious food.
                    </p>

                    <button
                        onClick={() => navigate('/partner/register')}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2 mx-auto lg:mx-0"
                    >
                        Register your kitchen
                        <ArrowRight size={20} />
                    </button>

                    <p className="mt-4 text-sm text-gray-500">
                        *Setup takes less than 5 minutes
                    </p>
                </div>

                {/* Right Image/Illustration */}
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                    <div className="relative">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Cooking"
                            className="relative rounded-2xl shadow-2xl object-cover h-[400px] w-full"
                        />
                    </div>
                </div>
            </div>

            {/* --- Features Grid --- */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Why Partner with Us?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                                <Wallet size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Weekly Payouts</h3>
                            <p className="text-gray-500">Get your earnings deposited directly to your bank account every week.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Reach More Customers</h3>
                            <p className="text-gray-500">Expand your reach beyond your neighborhood without marketing costs.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                                <ChefHat size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Be Your Own Boss</h3>
                            <p className="text-gray-500">Set your own menu, prices, and working hours. Full flexibility.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;