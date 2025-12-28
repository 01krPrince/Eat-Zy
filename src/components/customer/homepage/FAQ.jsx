import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import RevealOnScroll from "../../../shared/RevealOnScroll";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Background switches to a very soft gray when open */
    <div className={`border-b border-gray-100 transition-all duration-500 ${isOpen ? "bg-gray-50/50" : "bg-transparent"}`}>
      <button
        className="w-full py-7 flex justify-between items-center text-left focus:outline-none group px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-primary" : "text-neutral-text group-hover:text-primary"}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? "bg-primary rotate-180 shadow-lg shadow-primary/20" : "bg-gray-100"}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-neutral-muted group-hover:text-neutral-text" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-8 px-4" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex gap-4">
          {/* Brand-colored vertical line */}
          <div className="w-1 bg-primary/20 rounded-full"></div>
          <p className="text-neutral-muted text-sm leading-relaxed font-medium max-w-2xl">
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
    <section id="faq" className="py-32 bg-neutral-surface relative overflow-hidden">
      {/* Decorative accent matching the theme */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-light/10 -skew-x-12 translate-x-20 z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <RevealOnScroll direction="down">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
              Inquiries
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-text tracking-tighter">
              General <span className="text-primary italic font-serif font-light">Questions</span>
            </h2>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gray-200"></div>
              <HelpCircle size={20} className="text-primary opacity-40" />
              <div className="h-px w-12 bg-gray-200"></div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          {/* Card-like container for all items */}
          <div className="bg-neutral-surface rounded-max shadow-soft border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16 text-center">
          <p className="text-neutral-muted text-[10px] font-black uppercase tracking-widest">
            Still have questions?
            <span className="text-primary cursor-pointer hover:underline ml-2 transition-all">
              Contact our support team
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;