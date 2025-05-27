
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YouTubeEmbed from "./YouTubeEmbed";
import { BookOpen, Lock, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CourseChapter {
  id: string;
  title: string;
  videoId: string;
  isPremium: boolean;
  youtubeUrl?: string;
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
    } else {
      // Redirect to email for premium course request
      window.location.href = `mailto:support@beebotix.com?subject=Premium Course Request: ${chapter.title}&body=I would like to request access to the premium course: ${chapter.title}`;
    }
  };

  const handleYouTubeRedirect = (chapter: CourseChapter) => {
    if (chapter.youtubeUrl) {
      window.open(chapter.youtubeUrl, '_blank');
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
    <Card className="overflow-hidden mb-10 border-l-4 border-beebotix-yellow shadow-lg">
      <CardHeader className="bg-beebotix-navy text-white pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-beebotix-yellow flex-shrink-0" />
            <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-beebotix-yellow text-beebotix-navy text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-sm md:text-base">{description}</p>
      </CardHeader>

      <CardContent className="p-4 md:p-6 overflow-x-hidden">
        {/* Course Chapters List */}
        <div className="mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-beebotix-navy">Course Chapters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id} 
                className={`bg-white rounded-lg border ${
                  activeChapter?.id === chapter.id ? 'border-beebotix-yellow shadow-md' : 'border-gray-200'
                } overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg`}
              >
                {/* Video Thumbnail - Fixed aspect ratio */}
                <div className="relative w-full aspect-video bg-gray-100">
                  <img 
                    src={getYouTubeThumbnail(chapter.videoId)} 
                    alt={`Thumbnail for ${chapter.title}`} 
                    className="w-full h-full object-cover"
                  />
                  {chapter.isPremium && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="h-6 w-6 md:h-8 md:w-8 text-beebotix-yellow" />
                    </div>
                  )}
                  {!chapter.isPremium && (
                    <button 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => handleChapterSelect(chapter)}
                      aria-label={`Play ${chapter.title}`}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-beebotix-yellow flex items-center justify-center">
                        <Video className="h-5 w-5 md:h-6 md:w-6 text-beebotix-navy" />
                      </div>
                    </button>
                  )}
                </div>
                
                {/* Chapter Info */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-sm md:text-lg font-semibold text-beebotix-navy line-clamp-2 flex-1">
                      {chapter.title}
                    </h3>
                    <div className="flex-shrink-0">
                      {chapter.isPremium ? (
                        <Badge variant="outline" className="bg-beebotix-navy text-white text-xs">
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-600 text-white text-xs">
                          Free
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs md:text-sm text-beebotix-gray-dark mb-3 line-clamp-2 flex-1">
                    {getChapterHandout(chapter.id).substring(0, 80)}...
                  </p>
                  
                  <div className="mt-auto">
                    <Button
                      onClick={() => chapter.isPremium ? handleChapterSelect(chapter) : handleYouTubeRedirect(chapter)}
                      className={`w-full text-xs md:text-sm ${
                        chapter.isPremium 
                          ? 'bg-gray-400 hover:bg-gray-500 text-white' 
                          : 'bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy'
                      }`}
                      size="sm"
                    >
                      <Video className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      {chapter.isPremium ? 'Request Access' : 'Watch Now'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Active Chapter Content */}
        {activeChapter && (
          <div className="mt-8 bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 animate-fade-in overflow-x-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-beebotix-navy mb-4">{activeChapter.title}</h2>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Video Player */}
              <div className="xl:col-span-2">
                <YouTubeEmbed videoId={activeChapter.videoId} title={activeChapter.title} />
              </div>
              
              {/* Course Handout */}
              <div className="xl:col-span-1">
                <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 h-full">
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
