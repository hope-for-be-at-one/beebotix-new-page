
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Coffee, Star } from "lucide-react";

const SponsorSection = () => {
  const [currentGoal] = useState(50000); // Goal amount in INR
  const [currentAmount] = useState(12500); // Current amount raised
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress((currentAmount / currentGoal) * 100), 500);
    return () => clearTimeout(timer);
  }, [currentAmount, currentGoal]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Heart className="h-6 w-6 text-red-500" />
          Sponsor Us
        </CardTitle>
        <p className="text-beebotix-gray-dark">
          Help us explore the underwater world through advanced robotics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goal Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>₹{currentAmount.toLocaleString()} / ₹{currentGoal.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-beebotix-gray-dark">
            {Math.round(progress)}% of our underwater research goal achieved
          </p>
        </div>

        {/* Sponsor Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => window.open('https://www.patreon.com', '_blank')}
          >
            <Heart className="h-4 w-4 mr-2" />
            Support on Patreon
          </Button>
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => window.open('https://www.buymeacoffee.com', '_blank')}
          >
            <Coffee className="h-4 w-4 mr-2" />
            Buy Me a Coffee
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center p-4 bg-beebotix-yellow/10 rounded-lg">
          <Star className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
          <p className="text-sm text-beebotix-navy font-medium">
            Thank you for supporting our mission to explore underwater robotics!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorSection;
