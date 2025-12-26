import React, { useState } from "react";
import { ChevronDown, Plus, Minus, HelpCircle } from "lucide-react";
import RevealOnScroll from "../../shared/RevealOnScroll";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-white/5 transition-all duration-500 ${isOpen ? "bg-white/[0.02]" : "bg-transparent"}`}>
      <button
        className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-orange-500" : "text-gray-300 group-hover:text-white"}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? "bg-orange-600 rotate-180" : "bg-white/5"}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex gap-4 px-1">
          <div className="w-1 bg-orange-600/30 rounded-full"></div>
          <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Can I pause my subscription?", answer: "Absolutely. Whether you are traveling or just want a break, you can pause your plan instantly. Your remaining credits stay safe and carry forward to your next active cycle." },
    { question: "Is the food truly hygienic?", answer: "Safety is our heritage. Every kitchen partner is FSSAI registered and must pass a rigorous 25-point audit. We conduct surprise monthly inspections to ensure clinical standards are met." },
    { question: "Can I switch my kitchen provider?", answer: "Yes. Variety is the spice of life. You have the flexibility to switch your kitchen provider at the start of every week to experience different culinary styles." },
    { question: "What if the taste doesn't suit me?", answer: "We take your palate seriously. We offer a 100% money-back guarantee on your first trial meal if it doesn't meet your expectations. No questions asked." }
  ];

  return (
    <section id="safety" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Consistent Heading Style */}
        <RevealOnScroll direction="down">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4 block">
              Inquiries
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
              General
              <span className="font-serif italic font-light text-orange-50 px-3 lowercase tracking-normal">
                questions
              </span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/10"></div>
              <HelpCircle size={16} className="text-gray-600" />
              <div className="h-px w-12 bg-white/10"></div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <div className="divide-y divide-white/5 border-t border-white/5">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </RevealOnScroll>

        {/* Support Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Still have questions? <span className="text-orange-500 cursor-pointer hover:underline ml-2">Contact our concierge</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;