import controllerBlack from "@/assets/controller-black.png";
import controllerGrey from "@/assets/controller-grey.png";
import platformBg from "@/assets/platform-bg.png";

const ShowcasingProduct = () => {
  return (
    <section className="relative w-full bg-black py-20 px-6 md:px-10">
      {/* Heading */}
      <div className="max-w-2xl mb-16">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light mb-4">
          Showcasing Product
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed">
          Discover the standout features and design of our latest innovation — built for those who refuse to blend in.
        </p>
      </div>

      {/* Platform + Controllers */}
      <div className="relative flex items-center justify-center">
        {/* Platform background */}
        <img
          src={platformBg}
          alt=""
          className="w-full max-w-4xl"
        />

        {/* Black controller - left */}
        <img
          src={controllerBlack}
          alt="Black controller"
          className="absolute w-[35%] max-w-xs -translate-x-[25%] translate-y-[-10%]"
          style={{
            filter:
              "drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
        />

        {/* Grey controller - right */}
        <img
          src={controllerGrey}
          alt="Grey controller"
          className="absolute w-[35%] max-w-xs translate-x-[25%] translate-y-[-10%]"
          style={{
            filter:
              "drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
        />
      </div>
    </section>
  );
};

export default ShowcasingProduct;
