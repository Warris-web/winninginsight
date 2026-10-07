// import { useMemo, useState } from "react";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PredictionResultCard from "../components/PredictionResultCard";
// import predictfloat from "../assets/img/Floating_lottery_ticket_mid-air_2K_202607050430.png"

// const RESULTS = [
//   {
//     game: "National Weekly",
//     region: "Nigeria",
//     draw: "02-JUL-01",
//     confidence: "High",
//     predicted: [6, 18, 35, 39, 60, 68, 77, 82, 84, 86],
//     official: [3, 24, 61, 73, 77],
//   },
//   {
//     game: "Mega Draw 6/49",
//     region: "Ghana",
//     draw: "02-JUL-02",
//     confidence: "Medium",
//     predicted: [4, 9, 15, 22, 28, 31, 37, 41, 45, 49],
//     official: [4, 15, 22, 33, 41],
//   },
//   {
//     game: "Global Lottery",
//     region: "Kenya",
//     draw: "02-JUL-03",
//     confidence: "High",
//     predicted: [2, 8, 14, 19, 25, 30, 36, 42, 47, 49],
//     official: [2, 8, 19, 40, 44],
//   },
//   {
//     game: "National Weekly",
//     region: "South Africa",
//     draw: "02-JUL-04",
//     confidence: "Medium",
//     predicted: [5, 11, 17, 23, 29, 34, 38, 43, 46, 48],
//     official: [11, 17, 23, 34, 46],
//   },
//   {
//     game: "National Weekly",
//     region: "Nigeria",
//     draw: "03-JUL-01",
//     confidence: "High",
//     predicted: [],
//     official: [],
//     pending: true,
//   },
// ];

// export default function PredictionHistory() {
//   const [query, setQuery] = useState("");

//   const filtered = useMemo(
//     () =>
//       RESULTS.filter((r) =>
//         `${r.game} ${r.region}`.toLowerCase().includes(query.toLowerCase())
//       ),
//     [query]
//   );

//   return (
//     <div>
//       <div className="headeranothertoppredict">
//         <Navbar />
//         <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-4 md:grid-cols-2 md:px-10 predichishsec">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="predichish">
//             <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
//               Yesterday's Prediction Results
//             </h1>
//             <p className="mt-5 max-w-md text-white/80">
//               Every prediction is graded against the official draw and published the next day.
//               Nothing appears before the result is available.
//             </p>
//           </motion.div>
//           <div
            
//             className="justify-self-center p-4"
//           >
//             <img src={predictfloat} alt="Winning Insight" />
            
//           </div>
//         </section>
//       </div>



//       <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
//         {/* Results toolbar */}
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
//           {/* Date + search */}
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center predictshowimgresuicontop">
//             <div className="flex items-center gap-3 predictshowimgresuicon">
//               <button
//                 className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[#65736F] transition hover:bg-[#DCE7E2] hover:text-[#26332F]"
//                 aria-label="Previous day"
//               >
//                 <ChevronLeft className="h-5 w-5" />
//               </button>

//               <p className="whitespace-nowrap text-[18px] font-medium tracking-[0.02em] text-[#303A38]">
//                 Showing results for Thursday, 2 July 2026
//               </p>

//               <button
//                 className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[#65736F] transition hover:bg-[#DCE7E2] hover:text-[#26332F]"
//                 aria-label="Next day"
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="relative w-full lg:ml-6 lg:w-[485px] predictshowimgresusearch">
//               <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C7774] predictshowimgresusearch1" />

//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search games"
//                 className="h-[54px] w-full rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] pl-12 pr-4 text-[17px] text-[#303A38] outline-none transition placeholder:text-[#6C7774] focus:border-[#6F8780] focus:ring-2 focus:ring-[#8DA39C]/20 predictshowimgresusearch2"
//               />
//             </div>
//           </div>

//           {/* Per page */}
//           <div className="flex shrink-0 items-center gap-3 predictshowimgresuperpage">
//             <span className="whitespace-nowrap text-[17px] text-[#5F6966]">
//               Per page
//             </span>

//             <button
//               type="button"
//               className="flex h-[54px] w-[68px] items-center justify-center rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] text-[17px] font-medium text-[#303A38] transition hover:bg-[#DCE7E2]"
//             >
//               10
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 rounded-md border border-forest-700/20 px-5 py-3 text-sm text-ink/70 predictimportnote">
//           Important: These records are for transparency. They do not mean future
//           predictions are guaranteed to win.
//         </div>

//         <div className="mt-8 space-y-6">
//           {filtered.map((r, i) => (
//             <PredictionResultCard
//               key={r.game + r.draw}
//               result={r}
//               index={i}
//             />
//           ))}

//           {filtered.length === 0 && (
//             <p className="py-10 text-center text-ink/50">
//               No games match your search.
//             </p>
//           )}
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PredictionResultCard from "../components/PredictionResultCard";
import Pagination from "../components/Pagination";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import predictfloat from "../assets/img/Floating_lottery_ticket_mid-air_2K_202607050430.png";

export default function PredictionHistory() {
  const [scope, setScope] = useState("yesterday"); // "yesterday" | "game_history"
  const [gameId, setGameId] = useState("");
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [perPage, setPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [yGames, setYGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { const t = setTimeout(() => { setDq(q); setPage(1); }, 350); return () => clearTimeout(t); }, [q]);

  useEffect(() => {
    let off = false;
    setLoading(true);
    const p = new URLSearchParams({ page, per_page: perPage, q: dq, scope });
    if (gameId) p.set("game_type_id", gameId);
    api("/public/prediction-history?" + p).then((r) => {
      if (off) return;
      setLoading(false);
      if (!r.ok) return setError(r.message || "Could not load prediction history.");
      setError(""); setData(r);
      if (scope === "yesterday") setYGames(r.games || []);
    });
    return () => { off = true; };
  }, [page, perPage, dq, scope, gameId]);

  useEffect(() => {
    if (scope === "game_history" && !yGames.length) {
      api("/public/prediction-history/games?scope=yesterday").then((r) => r.ok && setYGames(r.games || []));
    }
  }, [scope, yGames.length]);

  const openGame = (id) => { setScope("game_history"); setGameId(String(id)); setPage(1); window.scrollTo({ top: 0 }); };
  const backToYesterday = () => { setScope("yesterday"); setGameId(""); setPage(1); };
  const rows = Array.isArray(data?.history) ? data.history : [];
  const field = "h-[54px] rounded-lg border border-[#AEBDB8] bg-[#E7EFEC] px-4 text-[17px] text-[#303A38] outline-none transition focus:border-[#6F8780]";

  return (
    <div>
      <div className="headeranothertoppredict">
        <Navbar />
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-4 md:grid-cols-2 md:px-10 predichishsec">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="predichish">
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              {scope === "game_history" ? "Past Results For This Game" : "Yesterday's Prediction Results"}
            </h1>
            <p className="mt-5 max-w-md text-white/80">
              {scope === "game_history"
                ? "Older evaluated prediction records for the selected game. Nothing is shown before the actual result has been recorded."
                : "Every prediction is graded against the official draw and published the next day. Nothing appears before the result is available."}
            </p>
          </motion.div>
          <div className="justify-self-center p-4"><img src={predictfloat} alt="Winning Insight" /></div>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <select value={gameId} onChange={(e) => { setGameId(e.target.value); setPage(1); }} className={field + " lg:w-72"}>
            <option value="">Yesterday's games</option>
            {yGames.map((g) => (
              <option key={g.game_type_id} value={g.game_type_id}>
                {(g.game_name || `Game #${g.game_type_id}`) + (g.country_name ? " · " + g.country_name : "") + ` (${Number(g.result_count || 0)})`}
              </option>
            ))}
          </select>
          <div className="relative w-full lg:w-[420px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C7774]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search game, signal or draw ID" className={field + " w-full pl-12 placeholder:text-[#6C7774]"} />
          </div>
          <div className="flex items-center gap-3 lg:ml-auto">
            <span className="text-[17px] text-[#5F6966]">Per page</span>
            <select value={perPage} onChange={(e) => { setPerPage(e.target.value); setPage(1); }} className={field}>
              {["5", "10", "20"].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          {scope === "game_history" && (
            <button onClick={backToYesterday} className="rounded-lg border border-forest-800/30 px-5 py-3.5 text-sm font-semibold text-ink hover:bg-mint-50">Back to yesterday</button>
          )}
        </div>

        <div className="mt-6 rounded-md border border-forest-700/20 px-5 py-3 text-sm text-ink/70 predictimportnote">
          Important: These records are for transparency. They do not mean future predictions are guaranteed to win.
        </div>
        {data?.responsible_note && <div className="mt-3"><Notice type="info">{data.responsible_note}</Notice></div>}
        <div className="mt-3"><Notice type="error">{error}</Notice></div>

        <div className="mt-8 space-y-6">
          {loading && !data && <p className="py-10 text-center text-ink/50">Loading evaluated prediction results...</p>}
          {rows.map((r, i) => (
            <PredictionResultCard key={`${r.game_type_id}-${r.prediction_date}-${r.actual_draw_id}-${i}`} result={r} index={i} onOpenGame={scope === "yesterday" ? openGame : undefined} />
          ))}
          {data && !rows.length && !loading && (
            <p className="py-10 text-center text-ink/50">
              {scope === "game_history"
                ? "No past evaluated result is available for this game yet."
                : "No evaluated prediction result is available for yesterday yet. Results appear after the actual game result has been recorded."}
            </p>
          )}
        </div>
        <Pagination pagination={data?.pagination} onPage={setPage} />
      </section>
      <Footer />
    </div>
  );
}
