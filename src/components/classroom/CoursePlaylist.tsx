
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YouTubeEmbed from "./YouTubeEmbed";
import { Book, BookOpen, Lock } from "lucide-react";

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

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1 bg-gray-50 p-4 max-h-[400px] overflow-y-auto border-r border-gray-200">
                  <h3 className="font-bold text-lg mb-3">Chapters</h3>
                  <ul className="space-y-2">
                    {chapters.map((chapter) => (
                      <li 
                        key={chapter.id}
                        onClick={() => handleChapterSelect(chapter)}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all ${
                          activeChapter?.id === chapter.id 
                            ? "bg-beebotix-yellow/20 border-l-4 border-beebotix-yellow" 
                            : "hover:bg-gray-100 border-l-4 border-transparent"
                        }`}
                      >
                        <span className="flex items-center">
                          {chapter.isPremium ? (
                            <Lock className="h-4 w-4 mr-2 text-beebotix-gray-dark" />
                          ) : (
                            <BookOpen className="h-4 w-4 mr-2 text-beebotix-navy" />
                          )}
                          {chapter.title}
                        </span>
                        {chapter.isPremium && (
                          <Badge variant="outline" className="bg-beebotix-navy text-white">
                            Premium
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2 p-4">
                  {activeChapter ? (
                    <div className="animate-fade-in">
                      <h3 className="font-bold text-lg mb-3">{activeChapter.title}</h3>
                      <YouTubeEmbed videoId={activeChapter.videoId} title={activeChapter.title} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-lg">
                      <Lock className="h-12 w-12 text-beebotix-gray-dark mb-2" />
                      <p className="text-lg font-medium text-beebotix-gray-dark">
                        Select a chapter to start learning
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlaylist;
