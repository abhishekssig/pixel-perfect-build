import logo from "@/assets/Frame_4.png";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Placeholder video background - dark cinematic */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          {/* Replace src with actual video when provided */}
        </video>
        {/* Dark overlay to match the cinematic tone */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Logo top-left */}
      <div className="relative z-10 p-6 md:p-8">
        <img
          src={logo}
          alt="Rebel Head Logo"
          className="w-16 h-16 md:w-20 md:h-20"
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(255,0,0,0.4)) drop-shadow(0 0 20px rgba(255,0,0,0.15))",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
