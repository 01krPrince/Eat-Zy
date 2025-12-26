import React, { useState, useEffect, useRef } from "react";

const RevealOnScroll = ({ children, delay = 0, direction = "up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    const getTransformClass = () => {
        if (!isVisible) {
            switch (direction) {
                case "left": return "-translate-x-20 opacity-0";
                case "right": return "translate-x-20 opacity-0";
                case "down": return "-translate-y-20 opacity-0";
                default: return "translate-y-20 opacity-0";
            }
        }
        return "translate-x-0 translate-y-0 opacity-100";
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${getTransformClass()}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;