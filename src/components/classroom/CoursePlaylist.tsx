
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YouTubeEmbed from "./YouTubeEmbed";
import { BookOpen, Lock, Video } from "lucide-react";
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
  const [activeChapter, setActiveChapter] = useState<CourseChapter | null>(
    chapters.find((chapter) => !chapter.isPremium) || null
  );

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
    <Card className="overflow-hidden mb-10 border-l-4 border-beebotix-yellow">
      <CardHeader className="bg-beebotix-navy text-white pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-beebotix-yellow" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-beebotix-yellow text-beebotix-navy">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-gray-300 mt-2">{description}</p>
      </CardHeader>

      <CardContent className="p-4">
        {/* Course Chapters List */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-beebotix-navy">Course Chapters</h3>
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id} 
                className={`bg-white rounded-lg border ${
                  activeChapter?.id === chapter.id ? 'border-beebotix-yellow shadow-md' : 'border-gray-200'
                } overflow-hidden transition-all duration-300`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column: Video Thumbnail */}
                  <div className="md:col-span-1 relative">
                    <div className="relative aspect-video h-full min-h-[140px] overflow-hidden rounded-l-lg">
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
                          aria-label={`Play ${chapter.title}`}
                        >
                          <div className="w-12 h-12 rounded-full bg-beebotix-yellow flex items-center justify-center">
                            <Video className="h-6 w-6 text-beebotix-navy" />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Column: Chapter Info */}
                  <div className="md:col-span-2 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-beebotix-navy">{chapter.title}</h3>
                      {chapter.isPremium ? (
                        <Badge variant="outline" className="bg-beebotix-navy text-white">
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-600 text-white">
                          Free
                        </Badge>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm text-beebotix-gray-dark">
                      {getChapterHandout(chapter.id).substring(0, 120)}...
                    </p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge className="bg-beebotix-gray-dark/80">Key Concepts</Badge>
                      <Badge className="bg-beebotix-gray-dark/80">Exercises</Badge>
                    </div>
                    
                    {!chapter.isPremium && (
                      <Button
                        onClick={() => handleChapterSelect(chapter)}
                        variant="outline"
                        className="mt-3 bg-beebotix-yellow text-beebotix-navy hover:bg-beebotix-yellow/80"
                      >
                        Watch Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default CoursePlaylist;
