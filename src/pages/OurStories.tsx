
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
import { Calendar, Award, Star, Users, Trophy, ExternalLink } from "lucide-react";

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
  testimonials: Testimonial[];
  awards: AwardData[];
}

const OurStories = () => {
  const [storiesData, setStoriesData] = useState<OurStoriesData | null>(null);

  useEffect(() => {
    const loadStoriesData = async () => {
      try {
        const response = await fetch('/src/metadata/ourStories.json');
        const data = await response.json();
        setStoriesData(data);
      } catch (error) {
        console.error('Error loading stories data:', error);
      }
    };

    loadStoriesData();
  }, []);

  if (!storiesData) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-beebotix-navy"></div>
    </div>;
  }

  const { blogPosts, testimonials, awards } = storiesData;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-beebotix-navy to-beebotix-navy/80">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Stories
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the impact we're making through innovative projects, inspiring testimonials, 
            and recognition for our commitment to technology education and social good.
          </p>
        </div>
      </section>

      {/* Success Stories Blog Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-beebotix-gray-dark max-w-2xl mx-auto">
              Read about our impactful projects and the positive changes we're bringing to communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-beebotix-yellow text-beebotix-navy">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-beebotix-navy line-clamp-2">
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
                    className="border-beebotix-navy text-beebotix-navy hover:bg-beebotix-navy hover:text-white group"
                    onClick={() => window.open(post.readMoreLink, '_blank')}
                  >
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Horizontal Slideshow */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4">
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
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full p-6 bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-beebotix-gray-dark mb-6 italic text-base leading-relaxed flex-grow">
                        "{testimonial.testimonial}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 bg-beebotix-navy rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-beebotix-navy text-sm">
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
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Awards & Achievements Section with Parallax Effect */}
      <section className="py-20 relative overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beebotix-navy/5 to-beebotix-yellow/10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center bg-fixed"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-beebotix-navy mb-4">
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
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-l-4 border-l-beebotix-yellow hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Award Image Background */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <img 
                    src={award.image} 
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-beebotix-yellow to-beebotix-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="h-8 w-8 text-beebotix-navy" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-beebotix-navy mb-2 group-hover:text-beebotix-orange transition-colors duration-300">
                        {award.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-beebotix-gray-dark" />
                        <span className="text-beebotix-gray-dark font-medium text-sm">
                          {award.organization}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="ml-2 border-beebotix-yellow text-beebotix-navy group-hover:bg-beebotix-yellow transition-colors duration-300"
                        >
                          {award.year}
                        </Badge>
                      </div>
                      <p className="text-beebotix-gray-dark leading-relaxed text-sm">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStories;
