import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PredictionResultCard from "../components/PredictionResultCard";
import predictfloat from "../assets/img/Floating_lottery_ticket_mid-air_2K_202607050430.png"

const RESULTS = [
  {
    game: "National Weekly",
    region: "Nigeria",
    draw: "02-JUL-01",
    confidence: "High",
    predicted: [6, 18, 35, 39, 60, 68, 77, 82, 84, 86],
    official: [3, 24, 61, 73, 77],
  },
  {
    game: "Mega Draw 6/49",
    region: "Ghana",
    draw: "02-JUL-02",
    confidence: "Medium",
    predicted: [4, 9, 15, 22, 28, 31, 37, 41, 45, 49],
    official: [4, 15, 22, 33, 41],
  },
  {
    game: "Global Lottery",
    region: "Kenya",
    draw: "02-JUL-03",
    confidence: "High",
    predicted: [2, 8, 14, 19, 25, 30, 36, 42, 47, 49],
    official: [2, 8, 19, 40, 44],
  },
  {
    game: "National Weekly",
    region: "South Africa",
    draw: "02-JUL-04",
    confidence: "Medium",
    predicted: [5, 11, 17, 23, 29, 34, 38, 43, 46, 48],
    official: [11, 17, 23, 34, 46],
  },
  {
    game: "National Weekly",
    region: "Nigeria",
    draw: "03-JUL-01",
    confidence: "High",
    predicted: [],
    official: [],
    pending: true,
  },
];

export default function PredictionHistory() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      RESULTS.filter((r) =>
        `${r.game} ${r.region}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div>
      <div className="headeranothertoppredict">
        <Navbar />
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-4 md:grid-cols-2 md:px-10 predichishsec">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="predichish">
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              Yesterday's Prediction Results
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              Every prediction is graded against the official draw and published the next day.
              Nothing appears before the result is available.
            </p>
          </motion.div>
          <div
            
            className="justify-self-center p-4"
          >
            <img src={predictfloat} alt="Winning Insight" />
            
          </div>
        </section>
      </div>



      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        {/* Results toolbar */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Date + search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center predictshowimgresuicontop">
            <div className="flex items-center gap-3 predictshowimgresuicon">
              <button
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[#65736F] transition hover:bg-[#DCE7E2] hover:text-[#26332F]"
                aria-label="Previous day"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <p className="whitespace-nowrap text-[18px] font-medium tracking-[0.02em] text-[#303A38]">
                Showing results for Thursday, 2 July 2026
              </p>

              <button
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[#65736F] transition hover:bg-[#DCE7E2] hover:text-[#26332F]"
                aria-label="Next day"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="relative w-full lg:ml-6 lg:w-[485px] predictshowimgresusearch">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C7774] predictshowimgresusearch1" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games"
                className="h-[54px] w-full rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] pl-12 pr-4 text-[17px] text-[#303A38] outline-none transition placeholder:text-[#6C7774] focus:border-[#6F8780] focus:ring-2 focus:ring-[#8DA39C]/20 predictshowimgresusearch2"
              />
            </div>
          </div>

          {/* Per page */}
          <div className="flex shrink-0 items-center gap-3 predictshowimgresuperpage">
            <span className="whitespace-nowrap text-[17px] text-[#5F6966]">
              Per page
            </span>

            <button
              type="button"
              className="flex h-[54px] w-[68px] items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[17px] font-medium text-[#303A38] transition hover:bg-[#DCE7E2]"
            >
              10
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-forest-700/20 px-5 py-3 text-sm text-ink/70 predictimportnote">
          Important: These records are for transparency. They do not mean future
          predictions are guaranteed to win.
        </div>

        <div className="mt-8 space-y-6">
          {filtered.map((r, i) => (
            <PredictionResultCard
              key={r.game + r.draw}
              result={r}
              index={i}
            />
          ))}

          {filtered.length === 0 && (
            <p className="py-10 text-center text-ink/50">
              No games match your search.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
