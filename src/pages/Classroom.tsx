
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import classroomData from "@/metadata/classroom.json";

const Classroom = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">
              <span className="gradient-text">{classroomData.title}</span>
            </h1>
            <p className="text-beebotix-gray-dark text-lg">
              {classroomData.description}
            </p>
          </div>

          {/* Courses Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {classroomData.courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={
                        course.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                        course.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                    <p className="text-beebotix-gray-dark mb-4">{course.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-beebotix-gray-dark">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.instructor}
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        {course.videos.length} videos
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Course Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{course.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Sample Videos:</h4>
                      <div className="space-y-2">
                        {course.videos.slice(0, 2).map((video) => (
                          <div key={video.id} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <Play className="h-3 w-3" />
                              {video.title}
                            </span>
                            <span className="text-beebotix-gray-dark">{video.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full button-primary">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-16">
            <h2 className="heading-md mb-8">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classroomData.resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{resource.title}</h3>
                    <p className="text-beebotix-gray-dark mb-4">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.categories.map((category, index) => (
                        <Badge key={index} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-beebotix-gray-dark">
                        {resource.count} items available
                      </span>
                      <Button variant="outline">
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/80 rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="heading-md mb-2">Ready to Start Learning?</h2>
                <p className="text-white/80">Join thousands of students mastering robotics and electronics.</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Button className="button-primary">
                  Browse All Courses
                </Button>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Free Resources
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Classroom;
