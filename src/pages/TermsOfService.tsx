
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-lg mb-8">Terms of Service</h1>
            
            <Card className="shadow-lg">
              <CardContent className="p-8 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">1. Acceptance of Terms</h2>
                  <p className="text-beebotix-gray-dark">
                    By accessing and using BeeBotix services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">2. Services Description</h2>
                  <p className="text-beebotix-gray-dark">
                    BeeBotix provides robotics and embedded systems solutions including but not limited to:
                  </p>
                  <ul className="list-disc ml-6 mt-2 text-beebotix-gray-dark">
                    <li>Custom PCB Design</li>
                    <li>Robot Prototyping</li>
                    <li>Embedded Software Development</li>
                    <li>White Labeling & OEM Solutions</li>
                    <li>R&D and Project Consultancy</li>
                    <li>Student Project Support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">3. User Responsibilities</h2>
                  <p className="text-beebotix-gray-dark">
                    Users are responsible for providing accurate information and using our services in compliance with applicable laws and regulations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">4. Intellectual Property</h2>
                  <p className="text-beebotix-gray-dark">
                    All content, trademarks, and intellectual property on this website are owned by BeeBotix unless otherwise stated.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">5. Payment Terms</h2>
                  <p className="text-beebotix-gray-dark">
                    Payment terms will be specified in individual project agreements. All prices are in INR unless otherwise specified.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">6. Limitation of Liability</h2>
                  <p className="text-beebotix-gray-dark">
                    BeeBotix shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">7. Contact Information</h2>
                  <p className="text-beebotix-gray-dark">
                    For questions about these Terms of Service, please contact us at legal@beebotix.com
                  </p>
                </section>

                <div className="mt-8 pt-4 border-t border-gray-200">
                  <p className="text-sm text-beebotix-gray-dark">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
