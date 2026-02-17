import keyboardDark from "@/assets/keyboard-dark.png";

const KeyboardSection = () => {
  return (
    <section className="relative z-20 bg-black">
      <div className="flex justify-center py-16">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            width: "45%",
            height: "40vh",
            background:
              "linear-gradient(180deg, #909090 0%, #b0b0b0 40%, #c0c0c0 70%, #808080 100%)",
          }}
        >
          {/* Keyboard image positioned so only the top-right corner is visible */}
          <img
            src={keyboardDark}
            alt="Mechanical Keyboard"
            className="absolute"
            style={{
              width: "130%",
              bottom: "-35%",
              right: "-15%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default KeyboardSection;
