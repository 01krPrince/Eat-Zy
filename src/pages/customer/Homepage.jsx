import Hero from "../../components/customer/homepage/Hero";
import Stats from "../../components/customer/homepage/Stats";
import HowItWorks from "../../components/customer/homepage/HowItWorks";
import TrendingKitchens from "../../components/customer/homepage/TrendingKitchens";
import SafetyHygiene from "../../components/customer/homepage/SafetyHygiene";
import PricingPlans from "../../components/customer/homepage/PricingPlans";
import Testimonials from "../../components/customer/homepage/Testimonials";
import FAQ from "../../components/customer/homepage/FAQ";

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <Stats />
            <TrendingKitchens />
            <PricingPlans />
            <SafetyHygiene />
            <HowItWorks />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default LandingPage;