
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
        {/* Enhanced Hero Section */}
        <div className="relative bg-gradient-to-br from-beebotix-navy via-beebotix-navy/95 to-beebotix-navy/90 text-white py-16 md:py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F9D923\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-beebotix-yellow/20 rounded-full animate-pulse hidden md:block"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-beebotix-orange/20 rounded-full animate-bounce hidden md:block"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-beebotix-yellow to-beebotix-orange">
                  {classroomData.title}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 animate-slide-in-right">
                {classroomData.description}
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 max-w-4xl mx-auto px-4">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-beebotix-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-beebotix-yellow" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-beebotix-yellow">50+</div>
                  <div className="text-xs md:text-sm text-white/80">Courses</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-beebotix-orange/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Video className="h-6 w-6 md:h-8 md:w-8 text-beebotix-orange" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-beebotix-orange">200+</div>
                  <div className="text-xs md:text-sm text-white/80">Videos</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-beebotix-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-beebotix-yellow" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-beebotix-yellow">5K+</div>
                  <div className="text-xs md:text-sm text-white/80">Students</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-beebotix-orange/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Award className="h-6 w-6 md:h-8 md:w-8 text-beebotix-orange" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-beebotix-orange">98%</div>
                  <div className="text-xs md:text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="container-custom py-8 md:py-12 px-4 overflow-x-hidden">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
              <TabsTrigger 
                value="courses" 
                className="flex items-center gap-2 text-sm md:text-base font-medium data-[state=active]:bg-beebotix-yellow data-[state=active]:text-beebotix-navy transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Course Library</span>
                <span className="sm:hidden">Courses</span>
              </TabsTrigger>
              <TabsTrigger 
                value="live-classes" 
                className="flex items-center gap-2 text-sm md:text-base font-medium data-[state=active]:bg-beebotix-yellow data-[state=active]:text-beebotix-navy transition-all duration-300"
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Live Classes</span>
                <span className="sm:hidden">Live</span>
              </TabsTrigger>
            </TabsList>
            
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
        <div className="bg-gradient-to-r from-gray-50 to-white py-16 md:py-20 overflow-x-hidden">
          <div className="container-custom px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-beebotix-navy mb-4">
                Why Choose BeeBotix Classroom?
              </h2>
              <p className="text-beebotix-gray-dark max-w-2xl mx-auto">
                Experience world-class education with cutting-edge technology and expert instruction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-beebotix-navy" />
                </div>
                <h3 className="text-xl font-bold text-beebotix-navy mb-3">Expert Content</h3>
                <p className="text-beebotix-gray-dark">
                  Curated courses designed by industry professionals and educators
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-beebotix-navy" />
                </div>
                <h3 className="text-xl font-bold text-beebotix-navy mb-3">Interactive Learning</h3>
                <p className="text-beebotix-gray-dark">
                  Hands-on projects and real-time interaction with instructors
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-beebotix-navy" />
                </div>
                <h3 className="text-xl font-bold text-beebotix-navy mb-3">Certified Learning</h3>
                <p className="text-beebotix-gray-dark">
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
