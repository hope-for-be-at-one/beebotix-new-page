
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
    <section 
      ref={sectionRef} 
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-x-[-20px]'}`}>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Circuit Board Close-up"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-beebotix-yellow p-6 rounded-2xl shadow-lg md:max-w-[200px] animate-float">
                <p className="text-beebotix-navy font-bold">
                  Innovation-driven solutions for tomorrow's challenges
                </p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-x-[20px]'}`}>
            <h2 className="heading-lg mb-2">
              <span className="gradient-text">Who We Are</span>
            </h2>
            <div className="w-20 h-1 bg-beebotix-yellow mb-6"></div>
            
            <h3 className="text-2xl font-bold text-beebotix-navy mb-4">
              Pioneering Robotics as a Service
            </h3>
            
            <div className="space-y-4 text-beebotix-gray-dark">
              <p>
                BeeBotix is at the forefront of the RAAS (Robotics as a Service) 
                revolution, providing innovative solutions that empower businesses 
                and individuals to harness the power of robotics without the 
                traditional barriers to entry.
              </p>
              
              <p>
                Our team of experienced engineers, designers, and robotics specialists 
                work together to create custom solutions that meet the unique needs of 
                our clients, from development boards for hobbyists to complete robotic 
                systems for industrial applications.
              </p>
              
              <p>
                We are passionate about innovation and committed to making cutting-edge 
                robotics technology accessible to everyone, driving forward the future 
                of automation and technological advancement.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border-l-4 border-beebotix-yellow pl-4">
                <h4 className="text-xl font-bold text-beebotix-navy">Innovation</h4>
                <p className="text-beebotix-gray-dark mt-2">
                  Constantly pushing the boundaries of what's possible in robotics
                </p>
              </div>
              
              <div className="border-l-4 border-beebotix-yellow pl-4">
                <h4 className="text-xl font-bold text-beebotix-navy">Expertise</h4>
                <p className="text-beebotix-gray-dark mt-2">
                  Deep knowledge in robotics, embedded systems, and custom solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
