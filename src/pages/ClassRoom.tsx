
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoursePlaylist, { CourseChapter } from "@/components/classroom/CoursePlaylist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lock } from "lucide-react";

// Mock data for courses
const beginnersCoursesData = [
  {
    id: "robotics-101",
    title: "Introduction to Robotics",
    description: "Learn the basics of robotics and automation",
    tags: ["Beginner", "Robotics"],
    chapters: [
      {
        id: "r101-ch1",
        title: "What is a Robot?",
        videoId: "NkmZBGn-oHQ",
        isPremium: false
      },
      {
        id: "r101-ch2",
        title: "Components of a Robot",
        videoId: "NkmZBGn-oHQ",
        isPremium: false
      },
      {
        id: "r101-ch3",
        title: "Programming Basics",
        videoId: "NkmZBGn-oHQ",
        isPremium: true
      },
      {
        id: "r101-ch4",
        title: "Building Your First Robot",
        videoId: "NkmZBGn-oHQ",
        isPremium: true
      }
    ]
  },
  {
    id: "arduino-basics",
    title: "Arduino for Beginners",
    description: "Start your journey with Arduino programming",
    tags: ["Beginner", "Arduino"],
    chapters: [
      {
        id: "ardu-ch1",
        title: "Introduction to Arduino",
        videoId: "fJWR7dBuc18",
        isPremium: false
      },
      {
        id: "ardu-ch2",
        title: "Setting Up Your Arduino",
        videoId: "fJWR7dBuc18",
        isPremium: false
      },
      {
        id: "ardu-ch3",
        title: "First Arduino Project",
        videoId: "fJWR7dBuc18",
        isPremium: true
      }
    ]
  }
];

const intermediateCoursesData = [
  {
    id: "pcb-design",
    title: "PCB Design Fundamentals",
    description: "Learn how to design professional PCBs",
    tags: ["Intermediate", "Electronics"],
    chapters: [
      {
        id: "pcb-ch1",
        title: "PCB Design Basics",
        videoId: "35YuILLNGcs",
        isPremium: false
      },
      {
        id: "pcb-ch2",
        title: "Component Selection",
        videoId: "35YuILLNGcs",
        isPremium: true
      },
      {
        id: "pcb-ch3",
        title: "Layout Best Practices",
        videoId: "35YuILLNGcs",
        isPremium: true
      }
    ]
  }
];

const advancedCoursesData = [
  {
    id: "ai-robotics",
    title: "AI in Robotics",
    description: "Advanced techniques for intelligent robots",
    tags: ["Advanced", "AI", "Robotics"],
    chapters: [
      {
        id: "ai-ch1",
        title: "Introduction to Robot AI",
        videoId: "TIy0XGJJjpU",
        isPremium: true
      },
      {
        id: "ai-ch2",
        title: "Machine Learning for Robotics",
        videoId: "TIy0XGJJjpU",
        isPremium: true
      }
    ]
  }
];

const ClassRoom: React.FC = () => {
  // This useEffect ensures page starts from the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-24 container-custom flex-grow">
        <div className="relative mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-beebotix-navy text-center">
            BeeBotix <span className="text-beebotix-yellow">ClassRoom</span>
          </h1>
          <p className="mt-4 text-beebotix-gray-dark max-w-2xl mx-auto text-center">
            Access our comprehensive library of robotics and electronics courses
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <div className="flex items-center text-sm text-beebotix-gray-dark">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Free Content</span>
            </div>
            <div className="flex items-center text-sm text-beebotix-gray-dark ml-4">
              <Lock className="h-4 w-4 mr-1" />
              <span>Premium Content</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="beginner" className="w-full mb-16">
          <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beginner" className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {beginnersCoursesData.map((course) => (
                <CoursePlaylist
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  tags={course.tags}
                  chapters={course.chapters}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate" className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {intermediateCoursesData.map((course) => (
                <CoursePlaylist
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  tags={course.tags}
                  chapters={course.chapters}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {advancedCoursesData.map((course) => (
                <CoursePlaylist
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  tags={course.tags}
                  chapters={course.chapters}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-beebotix-navy text-white p-6 md:p-10 rounded-lg shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Upgrade to <span className="text-beebotix-yellow">Premium</span>
              </h2>
              <p className="mb-4">
                Unlock all premium content and get access to live classes and instructor support.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-beebotix-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Access to all premium course chapters
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-beebotix-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Live weekly classes with our experts
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-beebotix-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Project-based learning and assignments
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-beebotix-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Completion certificate
                </li>
              </ul>
              <button className="bg-beebotix-yellow hover:bg-yellow-400 text-beebotix-navy font-medium py-2 px-6 rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
            <div className="bg-beebotix-navy/70 p-6 rounded-lg">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <Lock className="h-16 w-16 text-beebotix-yellow opacity-80" />
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-eab10380cup?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Live class session" 
                  className="w-full h-64 object-cover rounded-lg opacity-60"
                />
              </div>
              <p className="text-center mt-4 font-medium">
                Next Live Class: Advanced Robotics - May 25, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClassRoom;
