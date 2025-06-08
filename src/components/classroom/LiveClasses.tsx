
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users, Video } from "lucide-react";
import { useState, useEffect } from "react";
import classroomData from "@/metadata/classroom.json";

const LiveClasses = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const upcomingClasses = classroomData.liveClasses || [];

  const getTimeUntilClass = (date: string, time: string) => {
    // Parse the date and time properly
    const classDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
    const now = currentTime;
    const diff = classDateTime.getTime() - now.getTime();
    
    if (diff < 0) {
      // Check if class started within the last 3 hours (assume class duration)
      const hoursElapsed = Math.abs(diff) / (1000 * 60 * 60);
      if (hoursElapsed <= 3) {
        return "Class in progress";
      }
      return "Class has ended";
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}, ${hours}h ${minutes}m remaining`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
    } else {
      return "Starting soon!";
    }
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours}:${minutes}:00`;
  };

  const getStatusColor = (date: string, time: string) => {
    const classDateTime = new Date(`${date}T${convertTo24Hour(time)}`);
    const now = currentTime;
    const diff = classDateTime.getTime() - now.getTime();
    
    if (diff < 0) {
      const hoursElapsed = Math.abs(diff) / (1000 * 60 * 60);
      if (hoursElapsed <= 3) {
        return "text-green-600"; // Class in progress
      }
      return "text-gray-500"; // Class ended
    }
    
    const hours = diff / (1000 * 60 * 60);
    if (hours <= 1) {
      return "text-red-600"; // Starting soon
    } else if (hours <= 24) {
      return "text-orange-600"; // Starting today
    }
    
    return "text-blue-600"; // Future class
  };

  const handleJoinClass = (meetingLink: string) => {
    window.open(meetingLink, '_blank');
  };

  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-beebotix-navy">Live Classes</h2>
        <Badge className="bg-red-500 text-white animate-pulse w-fit">
          <Video className="h-3 w-3 mr-1" />
          LIVE
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingClasses.map((classItem) => (
          <Card key={classItem.id} className="border-2 border-beebotix-yellow/20 hover:border-beebotix-yellow/40 transition-all duration-300 hover:shadow-lg overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg md:text-xl mb-1 text-beebotix-navy line-clamp-2">
                    {classItem.title}
                  </h3>
                  <p className="text-beebotix-gray-dark text-sm md:text-base">
                    {classItem.instructor}
                  </p>
                </div>
                <Badge className="bg-beebotix-yellow text-beebotix-navy w-fit">
                  {classItem.status === "upcoming" ? "Upcoming" : classItem.status}
                </Badge>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Calendar className="h-4 w-4 text-beebotix-navy flex-shrink-0" />
                  <span className="text-beebotix-gray-dark">
                    {new Date(classItem.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Clock className="h-4 w-4 text-beebotix-navy flex-shrink-0" />
                  <span className="text-beebotix-gray-dark">
                    {classItem.time} ({classItem.duration})
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Users className="h-4 w-4 text-beebotix-navy flex-shrink-0" />
                  <span className="text-beebotix-gray-dark">
                    {classItem.participants}/{classItem.maxParticipants} participants
                  </span>
                </div>
              </div>
              
              <div className="bg-beebotix-gray-light/20 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className={`text-sm font-medium ${getStatusColor(classItem.date, classItem.time)}`}>
                    {getTimeUntilClass(classItem.date, classItem.time)}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleJoinClass(classItem.meetingLink)}
                className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy font-medium transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
