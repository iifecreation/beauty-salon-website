import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does professional makeup application take?",
      answer: "Professional makeup typically takes 1-2 hours depending on the complexity of the look. Bridal makeup may take 2-3 hours including trial and touch-ups."
    },
    {
      question: "What's included in a luxury manicure service?",
      answer: "Our luxury manicure includes nail shaping, cuticle care, hand massage, exfoliation, base coat, premium polish application, and top coat for long-lasting results."
    },
    {
      question: "How long do eyelash extensions last?",
      answer: "Professional eyelash extensions typically last 6-8 weeks with proper care. We recommend touch-ups every 2-3 weeks to maintain the full look."
    },
    {
      question: "Are your beauty courses certified?",
      answer: "Yes, all our courses are industry-certified. Students receive official certification upon successful completion, which is recognized by beauty industry employers."
    },
    {
      question: "What nail art techniques do you teach?",
      answer: "We teach various techniques including gel art, stamping, hand-painting, 3D designs, ombre effects, and seasonal nail art trends."
    },
    {
      question: "Do you offer group discounts for courses?",
      answer: "Yes, we offer group discounts for 3 or more students enrolling together. Contact us for specific pricing and availability."
    },
    {
      question: "What products do you use for pedicures?",
      answer: "We use professional-grade, hygienic products including premium scrubs, moisturizers, and high-quality polishes. All tools are sanitized between clients."
    },
    {
      question: "Can I book a trial makeup session before my event?",
      answer: "Absolutely! We highly recommend trial sessions, especially for bridal makeup. This allows us to perfect your look and make any adjustments before your special day."
    }
  ];

  return (
    <section className="bg-warm-brown-50 rounded-[var(--radius)] md:p-12 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="md:text-[48px] text-3xl font-light leading-tight tracking-[-2.4px] text-foreground mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center mb-12 md:text-lg text-base">
          Find answers to common questions about our beauty services, courses, and treatments.
        </p>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-[var(--radius)] px-6 border-border"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-medium text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;