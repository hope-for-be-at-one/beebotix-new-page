
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoursePlaylist from "@/components/classroom/CoursePlaylist";
import LiveClasses from "@/components/classroom/LiveClasses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Users, Award } from "lucide-react";
import classroomData from "@/metadata/classroom.json";

const Classroom = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-24 overflow-x-hidden">
        {/* Enhanced Hero Section with Image */}
        <div className="relative bg-gradient-to-br from-beebotix-navy via-beebotix-navy/95 to-beebotix-navy/90 text-white py-12 md:py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Classroom Technology" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-beebotix-navy/60"></div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F9D923' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-6 right-6 w-12 h-12 md:w-20 md:h-20 bg-beebotix-yellow/20 rounded-full animate-pulse hidden sm:block"></div>
          <div className="absolute bottom-6 left-6 w-10 h-10 md:w-16 md:h-16 bg-beebotix-orange/20 rounded-full animate-bounce hidden sm:block"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-beebotix-yellow to-beebotix-orange">
                  {classroomData.title}
                </span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 animate-slide-in-right">
                {classroomData.description}
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12 max-w-4xl mx-auto px-4">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-beebotix-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-beebotix-yellow" />
                  </div>
                  <div className="text-lg md:text-xl font-bold text-beebotix-yellow">50+</div>
                  <div className="text-xs md:text-sm text-white/80">Courses</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-beebotix-orange/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video className="h-5 w-5 md:h-6 md:w-6 text-beebotix-orange" />
                  </div>
                  <div className="text-lg md:text-xl font-bold text-beebotix-orange">200+</div>
                  <div className="text-xs md:text-sm text-white/80">Videos</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-beebotix-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-beebotix-yellow" />
                  </div>
                  <div className="text-lg md:text-xl font-bold text-beebotix-yellow">5K+</div>
                  <div className="text-xs md:text-sm text-white/80">Students</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-beebotix-orange/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-5 w-5 md:h-6 md:w-6 text-beebotix-orange" />
                  </div>
                  <div className="text-lg md:text-xl font-bold text-beebotix-orange">98%</div>
                  <div className="text-xs md:text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Tabs Section - Fixed */}
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8 overflow-x-hidden">
          <Tabs defaultValue="courses" className="w-full">
            <div className="flex justify-center mb-6 md:mb-8">
              <TabsList className="grid grid-cols-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-lg border border-gray-200 max-w-md w-full h-auto">
                <TabsTrigger 
                  value="courses" 
                  className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold py-3 px-4 rounded-lg transition-all duration-300 data-[state=active]:bg-beebotix-yellow data-[state=active]:text-beebotix-navy data-[state=active]:shadow-md text-gray-600 hover:text-gray-900"
                >
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Course Library</span>
                  <span className="sm:hidden">Courses</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="live-classes" 
                  className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold py-3 px-4 rounded-lg transition-all duration-300 data-[state=active]:bg-beebotix-yellow data-[state=active]:text-beebotix-navy data-[state=active]:shadow-md text-gray-600 hover:text-gray-900"
                >
                  <Video className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Live Classes</span>
                  <span className="sm:hidden">Live</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="courses" className="mt-6 overflow-x-hidden">
              <div className="space-y-8 md:space-y-12">
                {classroomData.categories.map((category) => (
                  <CoursePlaylist
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    tags={category.tags}
                    chapters={category.chapters}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="live-classes" className="mt-6 overflow-x-hidden">
              <LiveClasses />
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Features Section */}
        <div className="bg-gradient-to-br from-gray-50/50 to-white py-12 md:py-16 overflow-x-hidden border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-beebotix-navy mb-4">
                Why Choose BeeBotix Classroom?
              </h2>
              <p className="text-base md:text-lg text-beebotix-gray-dark max-w-2xl mx-auto leading-relaxed">
                Experience world-class education with cutting-edge technology and expert instruction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-beebotix-navy" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-beebotix-navy mb-3">Expert Content</h3>
                <p className="text-sm md:text-base text-beebotix-gray-dark leading-relaxed">
                  Curated courses designed by industry professionals and educators
                </p>
              </div>
              
              <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <Video className="h-8 w-8 md:h-10 md:w-10 text-beebotix-navy" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-beebotix-navy mb-3">Interactive Learning</h3>
                <p className="text-sm md:text-base text-beebotix-gray-dark leading-relaxed">
                  Hands-on projects and real-time interaction with instructors
                </p>
              </div>
              
              <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-beebotix-navy" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-beebotix-navy mb-3">Certified Learning</h3>
                <p className="text-sm md:text-base text-beebotix-gray-dark leading-relaxed">
                  Earn recognized certificates upon course completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Classroom;
