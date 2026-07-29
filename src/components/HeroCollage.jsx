import { motion } from "framer-motion";
import LotteryBall from "./LotteryBall";

const tickets = [
  { rotate: -18, x: "6%", y: "2%", scale: 0.72, delay: 0 },
  { rotate: 10, x: "46%", y: "-2%", scale: 0.78, delay: 0.1 },
  { rotate: -4, x: "22%", y: "18%", scale: 1, delay: 0.2 },
  { rotate: 12, x: "8%", y: "44%", scale: 0.8, delay: 0.3 },
  { rotate: -10, x: "44%", y: "40%", scale: 0.78, delay: 0.4 },
];

const balls = [
  { n: 15, top: "46%", left: "2%" },
  { n: 8, top: "88%", left: "6%" },
  { n: 44, top: "36%", left: "94%" },
  { n: 29, top: "70%", left: "90%" },
  { n: 11, top: "84%", left: "86%" },
];

function MiniTicket({ variant }) {
  return (
    <div className="w-52 rounded-sm border border-black/5 bg-[#f3ede0] p-3 text-[#2b2b26] shadow-xl">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-current">⊕</span>
        Global Lottery
      </div>
      {variant === "primary" && (
        <p className="mt-1 text-[9px] font-semibold text-ink/70">MEGA DRAW 6/49</p>
      )}
      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-[8px] font-semibold">
        {Array.from({ length: 49 }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={
              [8, 15, 24, 44].includes(n) && variant === "primary"
                ? "rounded-full text-forest-800 ring-1 ring-forest-700"
                : ""
            }
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-2 h-4 w-full bg-[repeating-linear-gradient(90deg,#2b2b26_0,#2b2b26_1.5px,transparent_1.5px,transparent_3px)]" />
    </div>
  );
}

export default function HeroCollage() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-lg md:h-[560px]">
      <motion.div
        className="absolute inset-8 rounded-full border border-white/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-gold/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {tickets.map((t, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 0, y: 40, rotate: t.rotate }}
          animate={{ opacity: 1, y: [0, -8, 0], rotate: t.rotate }}
          transition={{
            opacity: { duration: 0.6, delay: t.delay },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: t.delay },
          }}
        >
          <div style={{ transform: `scale(${t.scale})` }}>
            <MiniTicket variant={i === 2 ? "primary" : "secondary"} />
          </div>
        </motion.div>
      ))}

      {balls.map((b, i) => (
        <div key={i} className="absolute" style={{ top: b.top, left: b.left }}>
          <LotteryBall number={b.n} size={44} float delay={i * 0.3} />
        </div>
      ))}
    </div>
  );
}
