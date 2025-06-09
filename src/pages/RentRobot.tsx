
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Bot, Clock, CheckCircle, Zap, Mail } from "lucide-react";
import robotRentalData from "@/metadata/robot-rental.json";

interface Robot {
  id: number;
  name: string;
  image: string;
  shortDescription: string;
  keyPoints: string[];
  applications: string[];
  rentPerHour: number;
}

const RentRobot = () => {
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    setRobots(robotRentalData.robots);
  }, []);

  const handleRentNow = (robotName: string) => {
    const subject = `Rental Inquiry for ${robotName}`;
    const body = `Hello,\n\nI am interested in renting the ${robotName}. Please provide more details about availability and booking process.\n\nThank you.`;
    const mailtoLink = `mailto:contact@beebotix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Bot className="h-12 w-12 text-beebotix-yellow mr-3" />
              <h1 className="heading-xl gradient-text">Rent A Robot</h1>
            </div>
            <p className="text-lg text-beebotix-gray-dark max-w-3xl mx-auto">
              Access cutting-edge robotics technology without the upfront investment. 
              Rent our professional robots for your specific needs with flexible hourly rates.
            </p>
          </div>

          {/* Robots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {robots.map((robot) => (
              <Card key={robot.id} className="border-2 border-beebotix-yellow/20 hover:border-beebotix-yellow/40 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={robot.image} 
                      alt={robot.name}
                      className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 right-4 bg-beebotix-yellow text-beebotix-navy">
                      <Clock className="h-3 w-3 mr-1" />
                      ₹{robot.rentPerHour}/hr
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-beebotix-navy">
                    {robot.name}
                  </CardTitle>
                  <p className="text-beebotix-gray-dark mb-4">
                    {robot.shortDescription}
                  </p>

                  {/* Key Points */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-beebotix-navy mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {robot.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-3 w-3 text-beebotix-teal mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-beebotix-gray-dark">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-beebotix-navy mb-2">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {robot.applications.map((app, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and CTA */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-beebotix-navy">
                          ₹{robot.rentPerHour}
                        </span>
                        <span className="text-beebotix-gray-dark ml-1">/hour</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleRentNow(robot.name)}
                      className="w-full bg-gradient-to-r from-beebotix-yellow to-beebotix-orange hover:from-beebotix-orange hover:to-beebotix-yellow text-beebotix-navy font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <Mail className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                      <span className="relative">Rent Now</span>
                      <div className="absolute -inset-1 bg-gradient-to-r from-beebotix-yellow to-beebotix-orange rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-beebotix-gray-light/20 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-beebotix-navy mb-4">
              Need Custom Configuration?
            </h3>
            <p className="text-beebotix-gray-dark mb-6 max-w-2xl mx-auto">
              Our robots can be customized for your specific requirements. 
              Contact our team to discuss pricing for extended rentals, custom programming, or bulk bookings.
            </p>
            <Button className="button-primary">
              Contact Our Team
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentRobot;
