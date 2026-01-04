import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source
            src="https://videos.pexels.com/video-files/2099568/2099568-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white">
            Hey, I'm <span className="text-blue-400">Toplago</span>,
            <br />
            your AI trip planner
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Tell me your style and budget, and I'll design a trip for you.
          </p>

          {/* Search  */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mb-6 max-w-2xl mx-auto shadow-2xl">
            <Link to="/planner" className="flex items-center">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 text-left">
                <i className="fa-solid fa-magnifying-glass text-slate-300"></i>
                <span className="text-slate-200">Where do you want to go?</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition shadow-lg hover:shadow-blue-600/25">
                Plan Trip
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
