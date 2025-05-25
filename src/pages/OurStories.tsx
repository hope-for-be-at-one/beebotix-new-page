
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Star, Users, Trophy } from "lucide-react";

const OurStories = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building the Future: Our Smart Home Automation Project",
      excerpt: "How we helped a client create a fully automated smart home using Arduino and IoT sensors, reducing energy consumption by 40%.",
      date: "2024-01-15",
      category: "IoT Project",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "From Classroom to Competition: Student Robotics Success",
      excerpt: "Our robotics training program led a team of students to win the National Robotics Championship 2023.",
      date: "2023-12-10",
      category: "Education",
      readTime: "3 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "3D Printing Revolution: Custom Prosthetics Project",
      excerpt: "Collaborating with medical professionals to create affordable custom prosthetics using 3D printing technology.",
      date: "2023-11-22",
      category: "Healthcare",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Agricultural Innovation: Smart Farming Solutions",
      excerpt: "Implementing sensor-based irrigation systems that increased crop yield by 30% for local farmers.",
      date: "2023-10-05",
      category: "Agriculture",
      readTime: "6 min read",
      image: "/placeholder.svg"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Professor, IIT Bangalore",
      company: "Indian Institute of Technology",
      testimonial: "BeeBotix has been instrumental in enhancing our robotics curriculum. Their expertise and innovative approach have significantly improved our students' practical learning experience.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Priya Sharma",
      position: "CTO",
      company: "TechStart Innovations",
      testimonial: "The IoT solutions provided by BeeBotix transformed our manufacturing process. Their team's dedication and technical expertise are unmatched.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Amit Patel",
      position: "Founder",
      company: "GreenTech Solutions",
      testimonial: "Working with BeeBotix on our smart farming project was amazing. They delivered beyond our expectations and helped us achieve remarkable results.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Sarah Johnson",
      position: "Engineering Student",
      company: "Karnataka University",
      testimonial: "The robotics workshop by BeeBotix opened up a whole new world for me. Their teaching methodology is practical and engaging.",
      rating: 5,
      image: "/placeholder.svg"
    }
  ];

  const awards = [
    {
      title: "Best Innovation in Robotics Education",
      organization: "Karnataka State Education Board",
      year: "2023",
      description: "Recognized for outstanding contribution to robotics education and student development programs."
    },
    {
      title: "Startup Excellence Award",
      organization: "Bangalore Chamber of Commerce",
      year: "2023",
      description: "Awarded for innovative solutions in technology education and community impact."
    },
    {
      title: "Social Impact Recognition",
      organization: "Tech for Good Foundation",
      year: "2022",
      description: "Honored for using technology to create positive social impact in education and healthcare."
    },
    {
      title: "Innovation in 3D Printing",
      organization: "Indian Manufacturing Association",
      year: "2022",
      description: "Recognized for pioneering work in accessible 3D printing solutions for healthcare applications."
    }
  ];

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
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
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
                  <Button variant="outline" className="border-beebotix-navy text-beebotix-navy hover:bg-beebotix-navy hover:text-white">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-beebotix-gray-dark mb-6 italic text-lg leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-beebotix-navy rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-beebotix-navy">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-beebotix-gray-dark">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Achievements Section */}
      <section className="py-20">
        <div className="container-custom">
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
              <Card key={index} className="p-6 border-l-4 border-l-beebotix-yellow hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-beebotix-yellow rounded-full flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-beebotix-navy" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-beebotix-navy mb-2">
                        {award.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-beebotix-gray-dark" />
                        <span className="text-beebotix-gray-dark font-medium">
                          {award.organization}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {award.year}
                        </Badge>
                      </div>
                      <p className="text-beebotix-gray-dark leading-relaxed">
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
