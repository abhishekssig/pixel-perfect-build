const ShowcaseSection = () => {
  return (
    <section
      className="relative z-20 bg-black rounded-t-[2rem] min-h-screen px-6 md:px-16 lg:px-24 pt-16 md:pt-24 -mt-[100vh]"
      style={{
        boxShadow: "0 -30px 80px rgba(0,0,0,0.8)",
      }}
    >
      <h2 className="text-white text-3xl md:text-5xl font-light leading-tight">
        Showcasing Product
      </h2>
      <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
        Discover the standout features and design of our latest innovation. We're showcasing a product that blends performance, style, and smart functionality.
      </p>
    </section>
  );
};

export default ShowcaseSection;
