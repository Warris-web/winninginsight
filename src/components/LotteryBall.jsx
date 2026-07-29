import { motion } from "framer-motion";

export default function LotteryBall({ number, size = 56, circled = false, delay = 0, float = false }) {
  const Comp = float ? motion.div : "div";
  const floatProps = float
    ? {
        animate: { y: [0, -10, 0] },
        transition: { duration: 4 + (number % 5) * 0.4, repeat: Infinity, ease: "easeInOut", delay },
      }
    : {};

  return (
    <Comp
      {...floatProps}
      className="relative grid shrink-0 place-items-center rounded-full font-display font-bold text-forest-900 shadow-[inset_-4px_-6px_10px_rgba(0,0,0,0.15),inset_3px_4px_6px_rgba(255,255,255,0.7)]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: "radial-gradient(circle at 32% 28%, #ffffff 0%, #dfe5e2 55%, #b9c2bd 100%)",
        outline: circled ? "2px solid #2d6f5a" : "none",
        outlineOffset: circled ? 2 : 0,
      }}
    >
      {String(number).padStart(2, "0")}
    </Comp>
  );
}
