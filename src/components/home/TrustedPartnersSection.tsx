
import { useState, useEffect } from "react";
import trustedPartnersData from "@/metadata/trusted-partners.json";

const TrustedPartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const partners = trustedPartnersData.partners;

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-2">
              <span className="gradient-text">{trustedPartnersData.title}</span>
            </h2>
            <div className="w-20 h-1 bg-beebotix-yellow mx-auto mb-6"></div>
            <p className="text-beebotix-gray-dark text-lg max-w-2xl mx-auto">
              {trustedPartnersData.description}
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className={`flex animate-scroll ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              {/* First set of logos */}
              {partners.map((partner) => (
                <div key={partner.id} className="flex-shrink-0 mx-8">
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:scale-110 transition-transform duration-300"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                </div>
              ))}
              {/* Duplicate set for seamless scrolling */}
              {partners.map((partner) => (
                <div key={`duplicate-${partner.id}`} className="flex-shrink-0 mx-8">
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:scale-110 transition-transform duration-300"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartnersSection;
