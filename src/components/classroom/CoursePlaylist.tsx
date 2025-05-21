
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YouTubeEmbed from "./YouTubeEmbed";
import { Book, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CourseChapter {
  id: string;
  title: string;
  videoId: string;
  isPremium: boolean;
}

interface CoursePlaylistProps {
  title: string;
  description: string;
  tags: string[];
  chapters: CourseChapter[];
}

const CoursePlaylist: React.FC<CoursePlaylistProps> = ({
  title,
  description,
  tags,
  chapters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<CourseChapter | null>(
    chapters.find((chapter) => !chapter.isPremium) || null
  );

  const handleBookClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChapterSelect = (chapter: CourseChapter) => {
    if (!chapter.isPremium) {
      setActiveChapter(chapter);
    }
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  // Sample course handout content for each chapter
  const getChapterHandout = (chapterId: string) => {
    const handouts: Record<string, string> = {
      default: "This handout covers the basics of this topic. You'll find key concepts, terminology, and exercises to practice. For premium chapters, unlock to access the complete handout with advanced examples and project ideas.",
      "r101-ch1": "In this handout, we explore the definition of robots, their history, and their applications in modern society. Robots are programmable machines that can autonomously perform tasks. The history of robotics dates back to ancient civilizations, but modern robotics began in the mid-20th century.",
      "r101-ch2": "This handout details the key components of a robot: sensors (input), controllers (processing), actuators (output), and power systems. We'll examine how each component functions and interacts with others to create a functional robotic system.",
      "ardu-ch1": "Arduino is an open-source electronics platform based on easy-to-use hardware and software. This handout introduces the Arduino ecosystem, its history, and why it's an excellent platform for beginners in electronics and robotics."
    };

    return handouts[chapterId] || handouts.default;
  };

  return (
    <div className="perspective-1000 mb-10">
      <div
        className={`relative transition-all duration-700 transform-style-3d w-full ${
          isOpen ? "rotate-y-180 book-open" : "rotate-y-0 book-closed"
        }`}
      >
        {/* Front Cover (Closed Book) */}
        <div 
          className={`absolute w-full backface-hidden transition-all duration-700 transform ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <Card 
            onClick={handleBookClick}
            className="cursor-pointer shadow-lg hover:shadow-xl group overflow-hidden bg-gradient-to-br from-beebotix-navy to-beebotix-navy/90 border-l-8 border-beebotix-yellow"
          >
            <CardHeader className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Book className="h-7 w-7 text-beebotix-yellow transition-transform duration-300 group-hover:rotate-12" />
                  <CardTitle className="text-xl text-white">{title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-beebotix-yellow text-beebotix-navy">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mt-2">{description}</p>
              <div className="absolute bottom-3 right-6 text-sm text-beebotix-yellow/80 font-semibold flex items-center">
                Click to open
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 animate-pulse" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Book Content (Open Book) */}
        <div 
          className={`w-full backface-hidden transition-all duration-700 transform ${
            isOpen ? "rotate-y-180 shadow-2xl" : "rotate-y-180 shadow-none"
          }`}
        >
          <Card className="overflow-hidden min-h-[400px]">
            <CardHeader className="bg-beebotix-navy text-white pb-4 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-6 w-6 text-beebotix-yellow" />
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
                <p className="text-gray-300">{description}</p>
              </div>
              <button
                onClick={handleBookClick}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </CardHeader>

            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-8">
                {/* Course Chapters List - Thumbnails on left, description on right */}
                {chapters.map((chapter) => (
                  <div 
                    key={chapter.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                      chapter.isPremium ? "opacity-90" : "hover:shadow-lg"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Left Column: Video Thumbnail */}
                      <div className="md:col-span-1 relative">
                        <div className="relative aspect-video h-full min-h-[180px] overflow-hidden rounded-l-lg">
                          <img 
                            src={getYouTubeThumbnail(chapter.videoId)} 
                            alt={`Thumbnail for ${chapter.title}`} 
                            className="w-full h-full object-cover"
                          />
                          {chapter.isPremium && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Lock className="h-10 w-10 text-beebotix-yellow" />
                            </div>
                          )}
                          {!chapter.isPremium && (
                            <button 
                              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                              onClick={() => handleChapterSelect(chapter)}
                            >
                              <div className="w-12 h-12 rounded-full bg-beebotix-yellow flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-beebotix-navy" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Right Column: Chapter Info */}
                      <div className="md:col-span-2 p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-beebotix-navy">{chapter.title}</h3>
                          {chapter.isPremium && (
                            <Badge variant="outline" className="bg-beebotix-navy text-white">
                              Premium
                            </Badge>
                          )}
                        </div>
                        
                        <p className="mt-2 text-sm text-beebotix-gray-dark">
                          {getChapterHandout(chapter.id).substring(0, 120)}...
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge className="bg-beebotix-gray-dark/80">Key Concepts</Badge>
                          <Badge className="bg-beebotix-gray-dark/80">Exercises</Badge>
                        </div>
                        
                        {!chapter.isPremium && (
                          <Button
                            onClick={() => handleChapterSelect(chapter)}
                            variant="outline"
                            className="mt-4 bg-beebotix-yellow text-beebotix-navy hover:bg-beebotix-yellow/80"
                          >
                            Watch Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Active Chapter Content */}
                {activeChapter && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fade-in">
                    <h2 className="text-2xl font-bold text-beebotix-navy mb-4">{activeChapter.title}</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Video Player on Left */}
                      <div className="lg:col-span-2">
                        <YouTubeEmbed videoId={activeChapter.videoId} title={activeChapter.title} />
                      </div>
                      
                      {/* Course Handout on Right */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                          <h3 className="font-semibold text-lg mb-3 text-beebotix-navy">Course Handout</h3>
                          <p className="text-sm leading-relaxed text-beebotix-gray-dark">
                            {getChapterHandout(activeChapter.id)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlaylist;
