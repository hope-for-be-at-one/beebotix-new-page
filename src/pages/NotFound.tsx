
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-beebotix-gray-light">
        <div className="container-custom py-20 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-9xl font-bold text-beebotix-yellow">404</h1>
            <h2 className="text-3xl font-bold text-beebotix-navy mt-4 mb-6">Page Not Found</h2>
            <p className="text-beebotix-gray-dark mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
              <Button className="button-primary">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
