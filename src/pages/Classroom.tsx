
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoursePlaylist from "@/components/classroom/CoursePlaylist";
import LiveClasses from "@/components/classroom/LiveClasses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <p className="text-beebotix-gray-dark">
              {classroomData.description}
            </p>
          </div>

          <Tabs defaultValue="live-classes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
              <TabsTrigger value="courses">Course Library</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live-classes" className="mt-6">
              <LiveClasses />
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <div className="space-y-8">
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Classroom;
