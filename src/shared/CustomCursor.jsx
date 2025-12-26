// Create a new component: components/shared/CustomCursor.jsx
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setCursorPos = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', setCursorPos);
        return () => window.removeEventListener('mousemove', setCursorPos);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500/50 pointer-events-none z-[9999] transition-transform duration-100 ease-out flex items-center justify-center"
            style={{ transform: `translate(${position.x - 16}px, ${position.y - 16}px)` }}
        >
            <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            {/* Background Radial Glow that follows mouse */}
            <div
                className="fixed -inset-[200px] bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)] pointer-events-none opacity-50"
                style={{ left: position.x, top: position.y }}
            />
        </div>
    );
};