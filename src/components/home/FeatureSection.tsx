
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const features = [
  {
    title: "Experienced Team",
    description:
      "Our team has extensive experience with platforms like NVIDIA, Raspberry Pi, IMX, Z3, and STM.",
  },
  {
    title: "Customized Solutions",
    description:
      "Tailored solutions designed specifically for your unique requirements and challenges.",
  },
  {
    title: "In-House Development",
    description:
      "All development is done in-house, ensuring quality control and seamless integration.",
  },
  {
    title: "Trusted by Innovators",
    description:
      "We work with startups, established companies, and individual innovators to bring ideas to life.",
  },
  {
    title: "End-to-End Service",
    description:
      "From concept to prototyping to production, we handle every step of the process.",
  },
  {
    title: "Ongoing Support",
    description:
      "We provide maintenance and support services to keep your systems running smoothly.",
  },
];

const FeatureSection = () => {
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
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="order-2 md:order-1">
            <h2 className="heading-lg mb-2">
              <span className="gradient-text">Why Choose Us?</span>
            </h2>
            <div className="w-20 h-1 bg-beebotix-yellow mb-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="flex items-start">
                    <div className="mr-4 bg-beebotix-yellow rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-beebotix-navy mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-beebotix-gray-dark">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className={`order-1 md:order-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                  alt="Team of robotics engineers working"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-5 bg-beebotix-navy text-white py-3 px-6 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Expert Team</p>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-beebotix-yellow py-3 px-6 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-beebotix-navy">Industry Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
