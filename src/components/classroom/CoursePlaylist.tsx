
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="mb-10">
      <div
        className={`transition-all duration-500 transform ${
          isOpen ? "scale-100" : "scale-95 hover:scale-98"
        }`}
      >
        <div 
          onClick={handleBookClick} 
          className={`cursor-pointer transition-transform duration-500 transform ${isOpen ? "rotate-0" : "rotate-y-0"}`}
        >
          <Card className={`overflow-hidden ${isOpen ? "shadow-xl" : "shadow-md hover:shadow-lg"}`}>
            <CardHeader className="bg-beebotix-navy text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {isOpen ? (
                    <BookOpen className="h-6 w-6 text-beebotix-yellow" />
                  ) : (
                    <Book className="h-6 w-6 text-beebotix-yellow" />
                  )}
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-beebotix-yellow text-beebotix-navy">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-gray-300">{description}</p>
            </CardHeader>

            {isOpen && (
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-1 bg-gray-50 p-4 max-h-[400px] overflow-y-auto">
                    <h3 className="font-bold text-lg mb-3">Chapters</h3>
                    <ul className="space-y-2">
                      {chapters.map((chapter) => (
                        <li 
                          key={chapter.id}
                          onClick={() => handleChapterSelect(chapter)}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                            activeChapter?.id === chapter.id 
                              ? "bg-beebotix-yellow/20 border-l-4 border-beebotix-yellow" 
                              : "hover:bg-gray-100"
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
                      <>
                        <h3 className="font-bold text-lg mb-3">{activeChapter.title}</h3>
                        <YouTubeEmbed videoId={activeChapter.videoId} title={activeChapter.title} />
                      </>
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlaylist;
