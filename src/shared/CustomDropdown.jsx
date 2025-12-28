import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({
    label,
    options,
    selected,
    onSelect,
    placeholder = "Select option",
    width = "w-full" // Manage width in all conditions
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Logic to handle "Drop-Up" if no space below
    const handleOpen = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const menuHeight = 240; // max-h-60 is 240px

            // If space below is less than menu height, open upward
            setDropUp(spaceBelow < menuHeight);
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${width}`} ref={dropdownRef}>
            {label && (
                <label className="text-[10px] font-black text-neutral-muted uppercase tracking-widest px-1 block mb-2">
                    {label}
                </label>
            )}

            {/* Selection Trigger */}
            <button
                ref={buttonRef}
                type="button"
                onClick={handleOpen}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-neutral-bg border transition-all outline-none ${isOpen ? "border-primary ring-4 ring-primary/5" : "border-gray-100"
                    }`}
            >
                <span className={`text-sm font-bold uppercase truncate pr-2 ${selected ? "text-neutral-text" : "text-neutral-muted"}`}>
                    {selected ? selected.replace('_', ' ') : placeholder}
                </span>
                <ChevronDown
                    size={18}
                    className={`text-neutral-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`
          absolute left-0 w-full bg-white dark:bg-neutral-surface border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in duration-200
          ${dropUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"}
        `}>
                    <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all ${selected === option
                                        ? "bg-primary/10 text-primary"
                                        : "text-neutral-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-neutral-text"
                                    }`}
                            >
                                <span className="truncate">{option.replace('_', ' ')}</span>
                                {selected === option && <Check size={14} className="text-primary flex-shrink-0 ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;