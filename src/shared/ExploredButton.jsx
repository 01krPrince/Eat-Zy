import { ArrowRight } from "lucide-react";

const ExploreButton = ({ text }) => {
    return (
        <button className="group relative px-10 py-5 bg-orange-600 text-white rounded-sm font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-500">

            {/* 1. Background Fill Layer (Left to Right) */}
            <span className="absolute inset-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"></span>

            {/* 2. Content Wrapper - Color changes to orange on hover */}
            <span className="relative flex items-center justify-center transition-colors duration-500 group-hover:text-orange-500">

                {/* Main Text: Slides UP and out of view */}
                <span className="flex items-center gap-3 transition-all duration-500 ease-in-out group-hover:-translate-y-[150%] group-hover:opacity-0">
                    {text} <ArrowRight size={18} />
                </span>

                {/* Hover Arrow: Slides UP from bottom into the center and is ORANGE */}
                <span className="absolute flex items-center justify-center transition-all duration-500 ease-in-out translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={24} strokeWidth={3} />
                </span>
            </span>

        </button>
    );
};

export default ExploreButton;
