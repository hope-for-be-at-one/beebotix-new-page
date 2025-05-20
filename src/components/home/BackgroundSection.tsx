
import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    platform: "NVIDIA",
    description: "Developing advanced AI and computer vision solutions using NVIDIA platforms.",
    years: "8+ Years",
  },
  {
    platform: "Raspberry Pi",
    description: "Creating innovative projects and solutions with Raspberry Pi systems.",
    years: "10+ Years",
  },
  {
    platform: "IMX",
    description: "Building embedded systems using i.MX applications processors.",
    years: "6+ Years",
  },
  {
    platform: "Z3",
    description: "Implementing secure systems with Z3 technology.",
    years: "5+ Years",
  },
  {
    platform: "STM",
    description: "Developing microcontroller-based solutions with STMicroelectronics.",
    years: "7+ Years",
  },
];

const BackgroundSection = () => {
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
    <section
      ref={sectionRef}
      className="section-padding"
      style={{
        background: "linear-gradient(90deg, rgb(26, 31, 44) 0%, rgb(31, 41, 61) 100%)",
      }}
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg text-white mb-2">
            Our <span className="text-beebotix-yellow">Background</span>
          </h2>
          <div className="w-20 h-1 bg-beebotix-yellow mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">
            With years of experience working with world-renowned platforms, our team brings unmatched expertise to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Journey column */}
          <div 
            className={`md:col-span-1 bg-white/10 p-6 rounded-xl backdrop-blur-sm transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-beebotix-yellow mb-4">Our Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                BeeBotix was founded by a team of passionate engineers who saw the need for more accessible robotics solutions in the market.
              </p>
              <p>
                Starting with custom development boards for enthusiasts, we've grown to offer comprehensive robotics services to businesses, researchers, and hobbyists alike.
              </p>
              <p>
                Our commitment to innovation and quality has earned us a reputation as a trusted partner in the robotics industry, with clients ranging from startups to established technology companies.
              </p>
            </div>
          </div>

          {/* Experience column */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-beebotix-yellow mb-6">Platform Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-beebotix-yellow/50 transition-all duration-300 transform hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xl font-bold text-white">{exp.platform}</h4>
                    <span className="bg-beebotix-yellow/20 text-beebotix-yellow px-3 py-1 rounded-full text-sm">
                      {exp.years}
                    </span>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
