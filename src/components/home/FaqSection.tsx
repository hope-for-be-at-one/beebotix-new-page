
import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Robotics as a Service (RAAS)?",
    answer:
      "Robotics as a Service (RAAS) is a business model where companies provide access to robotics technology and solutions on a subscription or service basis, eliminating the need for upfront investment in hardware and infrastructure. At BeeBotix, we offer various robotic solutions that can be customized according to your specific requirements.",
  },
  {
    question: "What types of development boards do you offer?",
    answer:
      "We offer a wide range of development boards for different applications, including custom boards for specific requirements. Our boards are compatible with platforms like NVIDIA, Raspberry Pi, IMX, Z3, and STM, and are suitable for industries, hobbyists, and innovators.",
  },
  {
    question: "Can you customize robots for specific applications?",
    answer:
      "Yes, we specialize in creating fully tailored robotic solutions and embedded systems designed to meet your specific requirements. Our team works closely with you to understand your needs and develop a solution that addresses your unique challenges.",
  },
  {
    question: "What materials do you use for 3D printing?",
    answer:
      "Our 3D printing services utilize PLA, PETG, and TPU materials. We can accommodate designs up to 20x20x25cm in size and can produce items for projects, prototypes, and custom gifts.",
  },
  {
    question: "Do you offer educational programs?",
    answer:
      "Yes, we provide both offline and online workshops, as well as 1-to-1 online classes for robotics education and development. These programs are designed for various skill levels and can be customized to meet your specific learning objectives.",
  },
  {
    question: "How can I request a quote for a custom project?",
    answer:
      "You can request a quote by contacting us through our website, email, or phone. Please provide as much detail as possible about your project requirements, and our team will get back to you promptly with a customized quote.",
  },
];

const FaqSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-beebotix-gray-light">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-2">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <div className="w-20 h-1 bg-beebotix-yellow mx-auto mb-6"></div>
          <p className="text-beebotix-gray-dark text-lg">
            Answers to common questions about our services, capabilities, and how we can help you.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-lg font-medium text-beebotix-navy py-5 hover:text-beebotix-yellow hover:no-underline transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-beebotix-gray-dark pb-5 pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
