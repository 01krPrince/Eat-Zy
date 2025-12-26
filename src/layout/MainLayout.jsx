import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* The Navbar stays at the top */}
            <Navbar />

            {/* Main content area grows to push footer down */}
            <main className="flex-grow">
                {/* Outlet renders the specific page component (e.g., Homepage) */}
                <Outlet />
            </main>

            {/* The Footer stays at the bottom */}
            <Footer />
        </div>
    );
};

export default MainLayout;