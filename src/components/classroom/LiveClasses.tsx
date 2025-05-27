
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users, Video } from "lucide-react";
import classroomData from "@/metadata/classroom.json";

const LiveClasses = () => {
  const upcomingClasses = classroomData.liveClasses || [
    {
      id: 1,
      title: "Arduino Programming Basics",
      instructor: "Prof. Rajesh Kumar",
      date: "2024-01-25",
      time: "10:00 AM",
      duration: "90 minutes",
      participants: 24,
      maxParticipants: 30,
      status: "upcoming",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      title: "IoT Project Development",
      instructor: "Dr. Priya Sharma",
      date: "2024-01-26", 
      time: "2:00 PM",
      duration: "120 minutes",
      participants: 18,
      maxParticipants: 25,
      status: "upcoming",
      meetingLink: "https://zoom.us/j/123456789"
    }
  ];

  const getTimeUntilClass = (date: string, time: string) => {
    const classDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diff = classDateTime.getTime() - now.getTime();
    
    if (diff < 0) return "Class has started";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    }
    
    return `${hours}h ${minutes}m remaining`;
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
                  Next Class
                </Badge>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Calendar className="h-4 w-4 text-beebotix-navy flex-shrink-0" />
                  <span className="text-beebotix-gray-dark">
                    {new Date(classItem.date).toLocaleDateString()}
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
                  <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-orange-600">
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
