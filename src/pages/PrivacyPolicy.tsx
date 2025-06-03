
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-lg mb-8">Privacy Policy</h1>
            
            <Card className="shadow-lg">
              <CardContent className="p-8 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">1. Information We Collect</h2>
                  <p className="text-beebotix-gray-dark mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc ml-6 text-beebotix-gray-dark">
                    <li>Contact us through our website forms</li>
                    <li>Request services or quotes</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Participate in our educational programs</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">2. How We Use Your Information</h2>
                  <p className="text-beebotix-gray-dark mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc ml-6 text-beebotix-gray-dark">
                    <li>Provide and improve our services</li>
                    <li>Communicate with you about projects and services</li>
                    <li>Send you technical updates and promotional materials</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">3. Information Sharing</h2>
                  <p className="text-beebotix-gray-dark">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">4. Data Security</h2>
                  <p className="text-beebotix-gray-dark">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">5. Cookies and Tracking</h2>
                  <p className="text-beebotix-gray-dark">
                    Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">6. Your Rights</h2>
                  <p className="text-beebotix-gray-dark mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc ml-6 text-beebotix-gray-dark">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-beebotix-navy">7. Contact Us</h2>
                  <p className="text-beebotix-gray-dark">
                    If you have questions about this Privacy Policy, please contact us at privacy@beebotix.com
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

export default PrivacyPolicy;
