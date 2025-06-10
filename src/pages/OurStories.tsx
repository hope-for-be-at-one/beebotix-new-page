
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Award, Star, Trophy, ExternalLink, Youtube, Play, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  readMoreLink: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  duration: string;
  category: string;
  knowMoreLink: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number;
  image: string;
}

interface AwardData {
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
}

interface OurStoriesData {
  blogPosts: BlogPost[];
  videos: Video[];
  testimonials: Testimonial[];
  awards: AwardData[];
}

const OurStories = () => {
  const [storiesData, setStoriesData] = useState<OurStoriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoriesData = async () => {
      try {
        console.log('Loading stories data...');
        const response = await fetch('/ourStories.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Stories data loaded successfully:', data);
        setStoriesData(data);
      } catch (error) {
        console.error('Error loading stories data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load stories data');
      } finally {
        setLoading(false);
      }
    };

    loadStoriesData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-beebotix-navy mx-auto mb-4"></div>
          <p className="text-beebotix-gray-dark animate-pulse">Loading our stories...</p>
        </div>
      </div>
    );
  }

  if (error || !storiesData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-red-500 mb-4">Error: {error || 'Failed to load stories data'}</p>
          <Button onClick={() => window.location.reload()} className="animate-bounce">Try Again</Button>
        </div>
      </div>
    );
  }

  const { blogPosts, videos, testimonials, awards } = storiesData;

  return (
    <>
      <div className="min-h-screen bg-white">
        <SEOHead 
          title="Our Stories - BeeBotix Success Stories & Achievements"
          description="Explore BeeBotix's inspiring success stories, client testimonials, and prestigious awards. Discover how we're transforming technology education and creating positive impact."
          keywords="BeeBotix success stories, robotics achievements, technology education testimonials, innovation awards, STEM education impact, client testimonials"
          image="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=630&fit=crop"
          url="https://beebotix.com/our-stories"
        />
        
        <Navbar />
        
        {/* Enhanced Hero Section with Background Image */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop"
              alt="Our Stories Background - BeeBotix Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-beebotix-navy/90 to-beebotix-navy/70"></div>
          </div>
          
          {/* Content */}
          <div className="container-custom text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
                Our Stories
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-in-right">
                Discover the impact we're making through innovative projects, inspiring testimonials, 
                and recognition for our commitment to technology education and social good.
              </p>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-beebotix-yellow/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-beebotix-orange/20 rounded-full animate-bounce"></div>
          </div>
        </section>

        {/* Success Stories Blog Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4 hover-scale">
                Success Stories
              </h2>
              <p className="text-lg text-beebotix-gray-dark max-w-2xl mx-auto">
                Read about our impactful projects and the positive changes we're bringing to communities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-beebotix-yellow text-beebotix-navy hover:bg-beebotix-orange transition-colors duration-300">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-beebotix-navy line-clamp-2 group-hover:text-beebotix-orange transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-beebotix-gray-dark">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-beebotix-gray-dark mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-beebotix-navy text-beebotix-navy hover:bg-beebotix-navy hover:text-white group/btn transform hover:scale-105 transition-all duration-300"
                      onClick={() => window.open(post.readMoreLink, '_blank')}
                    >
                      Read More
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4 hover-scale">
                Featured Videos
              </h2>
              <p className="text-lg text-beebotix-gray-dark max-w-2xl mx-auto">
                Watch our innovative projects in action and see the impact we're making in the tech community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden cursor-pointer" onClick={() => window.open(video.youtubeUrl, '_blank')}>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
                        <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/70 text-white border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-beebotix-yellow text-beebotix-navy hover:bg-beebotix-orange transition-colors duration-300">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl text-beebotix-navy line-clamp-2 group-hover:text-beebotix-orange transition-colors duration-300">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-beebotix-gray-dark mb-6 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white group/btn transform hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(video.youtubeUrl, '_blank')}
                      >
                        <Youtube className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        Watch Video
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex-1 border-beebotix-navy text-beebotix-navy hover:bg-beebotix-navy hover:text-white group/btn transform hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(video.knowMoreLink, '_blank')}
                      >
                        Know More
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4 hover-scale">
                What People Say About Us
              </h2>
              <p className="text-lg text-beebotix-gray-dark max-w-2xl mx-auto">
                Hear from our satisfied clients, students, and partners about their experience with BeeBotix
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto animate-slide-in-right"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                        <p className="text-beebotix-gray-dark mb-6 italic text-base leading-relaxed flex-grow group-hover:text-beebotix-navy transition-colors duration-300">
                          "{testimonial.testimonial}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `<div class="w-full h-full bg-beebotix-navy rounded-full flex items-center justify-center"><svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg></div>`;
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-beebotix-navy text-sm group-hover:text-beebotix-orange transition-colors duration-300">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs text-beebotix-gray-dark">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 hover:scale-110 transition-transform duration-300" />
              <CarouselNext className="right-4 hover:scale-110 transition-transform duration-300" />
            </Carousel>
          </div>
        </section>

        {/* Enhanced Awards & Achievements Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-beebotix-navy/5 via-beebotix-yellow/5 to-beebotix-orange/10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center bg-fixed"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
          
          <div className="absolute top-10 right-10 w-32 h-32 bg-beebotix-yellow/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-beebotix-orange/10 rounded-full animate-bounce"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4 hover-scale">
                Awards & Achievements
              </h2>
              <p className="text-lg text-beebotix-gray-dark max-w-2xl mx-auto">
                Recognition for our commitment to innovation, education, and positive social impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-l-4 border-l-beebotix-yellow hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-15 group-hover:opacity-30 transition-all duration-500 overflow-hidden">
                    <img 
                      src={award.image} 
                      alt={award.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=400&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-beebotix-yellow/20 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-beebotix-yellow via-beebotix-orange to-beebotix-yellow rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                          <Trophy className="h-10 w-10 text-beebotix-navy group-hover:animate-bounce" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-beebotix-navy mb-3 group-hover:text-beebotix-orange transition-colors duration-300 leading-tight">
                          {award.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-beebotix-gray-dark group-hover:text-beebotix-yellow transition-colors duration-300" />
                            <span className="text-beebotix-gray-dark font-semibold text-sm">
                              {award.organization}
                            </span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="border-beebotix-yellow text-beebotix-navy group-hover:bg-beebotix-yellow group-hover:scale-110 transition-all duration-300 font-semibold"
                          >
                            {award.year}
                          </Badge>
                        </div>
                        <p className="text-beebotix-gray-dark leading-relaxed text-base group-hover:text-beebotix-navy transition-colors duration-300">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-beebotix-yellow/0 to-beebotix-orange/0 group-hover:from-beebotix-yellow/5 group-hover:to-beebotix-orange/5 transition-all duration-500"></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default OurStories;
