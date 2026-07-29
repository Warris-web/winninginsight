import { useState } from "react";
import { motion } from "framer-motion";

const TIERS = ["Top 10", "Top 20", "Top 30"];

export default function PredictionResultCard({ result, index = 0 }) {
  const [tier, setTier] = useState("Top 10");
  const { game, region, draw, confidence, predicted, official, pending } = result;

  const hitCount = pending
    ? null
    : predicted.filter((n) => official.includes(n)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05 }}
      className="overflow-hidden rounded-xl border border-forest-700/10 predictresultheadertpp"
    >
      <div className="flex items-center justify-between bg-mint-100 px-6 py-4 predictresultheadertop">
        <div className="predictresultheader">
          <h3 className="font-display text-lg font-bold text-ink">{game}</h3>
          <p className="text-sm text-ink/55">
            {region} · Draw {draw}
          </p>
        </div>
        <span className="rounded-md border border-forest-700/30 px-3 py-1 text-xs font-semibold text-forest-800 predictresultheaderhigh">
          {confidence}
        </span>
      </div>

      <div className="bg-mint-50/60 px-6 py-6">
        {pending ? (
          <p className="text-sm text-ink/60">
            Waiting on the official draw. Results are graded and published as soon as they're
            available.
          </p>
        ) : (
          <>
            <div className="flex gap-6 text-sm font-semibold predicttopnumb">
              {TIERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`pb-1 transition-colors ${
                    tier === t ? "border-b-2 border-ink text-ink" : "text-ink/40 hover:text-ink/70"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 predictpredicpoolofficiald">
              <div className="predictpredicpoolofficialdun">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">
                  Predicted Pools
                </p>
                <div className="flex flex-wrap gap-2 predictpredicpoolofficialdunbtnn1">
                  {predicted.map((n) => (
                    <span
                      key={n}
                      className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                        official.includes(n)
                          ? "border-2 border-forest-700 text-forest-800 predictpredicpoolofficialdunnactive"
                          : "border border-ink/20 text-ink/70 predictpredicpoolofficialdunn"
                      }`}
                    >
                      {String(n).padStart(2, "0")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="predictpredicpoolofficialdun">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">
                  Official Draw
                </p>
                <div className="flex flex-wrap gap-2 predictpredicpoolofficialdunbtnn">
                  {official.map((n) => (
                    <span
                      key={n}
                      className="grid h-9 w-9 place-items-center rounded-md bg-forest-900 text-sm font-semibold text-white"
                    >
                      {String(n).padStart(2, "0")}
                    </span>
                  ))}
                  
                </div>
                <div className="mt-5 border-t border-dashed border-ink/15 pt-4 text-xs text-ink/50 underofficialdraw">
                  {hitCount} of {official.length} drawn numbers in {tier} —{" "}
                  {hitCount >= 3 ? "above hit threshold" : "below hit threshold"}
                </div>
              </div>
            </div>

            
          </>
        )}
      </div>
    </motion.div>
  );
}
