import Hero from "../components/homepage/Hero";
import Stats from "../components/homepage/Stats";
import HowItWorks from "../components/homepage/HowItWorks";
import TrendingKitchens from "../components/homepage/TrendingKitchens";
import SafetyHygiene from "../components/homepage/SafetyHygiene";
import PricingPlans from "../components/homepage/PricingPlans";
import Testimonials from "../components/homepage/Testimonials";
import FAQ from "../components/homepage/FAQ";

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <Stats />
            <HowItWorks />
            <TrendingKitchens />
            <SafetyHygiene />
            <PricingPlans />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default LandingPage;