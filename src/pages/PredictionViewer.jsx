import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import LotteryBall from "../components/LotteryBall";
import { api } from "../lib/api";
import { groupNumbers, groupObject, groupSignal, signalTone } from "../lib/prediction";
import { pad } from "../lib/format";

const POOLS = [
  ["top10", "Top 10 Highest Possibility Numbers", "The tightest pool of numbers with the strongest combined signal.", "Highest showing-up signal"],
  ["top20", "Top 20 Higher Possibility Numbers", "A stronger expanded pool with high combined signal and wider coverage.", "Higher showing-up signal"],
  ["top30", "Top 30 Wider Possibility Numbers", "A wider pool for broader coverage after weighted consensus scoring.", "Wider showing-up signal"],
];
const plain = (n) => (Array.isArray(n) ? n.map(pad).join(" ") : "");

export default function PredictionViewer() {
  const { gameId } = useParams();
  const [r, setR] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let off = false;
    setR(null); setError("");
    api("/user/predictions/game/" + Number(gameId)).then((res) => {
      if (off) return;
      if (!res.ok) setError(res.message || "Could not load prediction");
      else setR(res);
    });
    return () => { off = true; };
  }, [gameId]);

  if (error) {
    return (
      <AppLayout title="Prediction Viewer">
        <Notice type="error">{error}</Notice>
        <Link to="/subscriptions" className="mt-6 inline-block rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white">Subscribe to this country</Link>
      </AppLayout>
    );
  }
  if (!r) return <AppLayout title="Prediction Viewer"><p className="text-ink/50">Loading prediction page...</p></AppLayout>;

  const fp = r.final_prediction || {};
  const sig = fp.model_rhythm_signal || {};
  const gameName = (r.game && (r.game.name || r.game.game_name || r.game.title)) || "Game";
  const history = r.prediction_history || [];

  return (
    <AppLayout title={`${gameName} Prediction`} subtitle="Final consensus prediction page — a weighted consensus ranking built by the shared prediction engine.">
      <Notice type="warn">Important: {r.responsible_note || "Predictions are suggestions, not guarantees. Play responsibly."}</Notice>

      <section className="mt-8 rounded-2xl bg-mint-50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold">Harvest Signal</h2>
            <p className="mt-1 text-sm text-ink/55">{sig.short_message}</p>
            <p className="text-sm text-ink/55">{sig.interpretation}</p>
          </div>
          <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${signalTone(sig.signal)}`}>{sig.display_label || "Not available"}</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[["top10", "Top 10"], ["top20", "Top 20"], ["top30", "Top 30"]].map(([k, label]) => {
            const g = groupSignal(fp, k);
            return (
              <div key={k} className="rounded-xl bg-white p-4 text-sm text-ink/65">
                <p className="font-semibold text-ink">{label}: {g.label}</p>
                <p>Current dry streak: {g.dry} draw(s)</p>
                <p>Median dry before hit: {g.median} draw(s)</p>
                <p>Last tested hits: {g.hits}</p>
              </div>
            );
          })}
        </div>
      </section>

      {POOLS.map(([key, title, desc, label]) => {
        const g = groupObject(fp, key);
        const s = groupSignal(fp, key);
        const nums = groupNumbers(fp, key);
        return (
          <section key={key} className="mt-8">
            <h2 className="font-display text-xl font-bold">{g.title || title}</h2>
            <p className="mt-1 text-sm text-ink/55">{g.description || desc}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-mint-100 px-3 py-1 font-semibold text-forest-800">{g.chance_label || label}</span>
              <span className={`rounded-full border px-3 py-1 font-semibold ${signalTone(s.signal)}`}>Harvest Signal: {s.label}</span>
              {s.message && <span className="text-ink/55">{s.message}</span>}
            </div>
            {nums.length ? (
              <div className="mt-5 flex flex-wrap gap-3">{nums.map((n) => <LotteryBall key={n} number={Number(n)} size={52} />)}</div>
            ) : <p className="mt-4 text-sm text-ink/50">No numbers available yet.</p>}
          </section>
        );
      })}

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold">Last 20 Prediction Results</h2>
        <p className="mt-1 text-sm text-ink/55">Pending rows become evaluated after the next actual draw is uploaded.</p>
        {!history.length ? <p className="mt-4 text-sm text-ink/50">No prediction history has been saved yet.</p> : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-forest-700/10">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-mint-100 text-xs uppercase tracking-wider text-ink/55">
                <tr>{["Generated", "Source", "Signal", "Top 10", "Top 20", "Top 30", "Actual draw", "Status"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-forest-700/10 align-top">
                {history.map((h, i) => {
                  const gs = (h.signal_data && h.signal_data.groups) || {};
                  const cell = (k, nums, hits) => (
                    <td className="px-4 py-3">
                      <p>{plain(nums)}</p>
                      <p className="mt-1 text-xs text-ink/50">Hits: {Number(hits || 0)} · {(gs[k] && gs[k].display_label) || "Not available"}</p>
                    </td>
                  );
                  return (
                    <tr key={i}>
                      <td className="px-4 py-3">{h.created_at}<p className="text-xs text-ink/50">Date: {h.prediction_date}</p></td>
                      <td className="px-4 py-3 capitalize">{String(h.prediction_source || "Unknown").replace(/_/g, " ")}</td>
                      <td className="px-4 py-3 font-semibold">{h.signal_label || "Not available"}</td>
                      {cell("top10", h.top10_numbers, h.top10_hits)}
                      {cell("top20", h.top20_numbers, h.top20_hits)}
                      {cell("top30", h.top30_numbers, h.top30_hits)}
                      <td className="px-4 py-3">{h.actual_numbers && h.actual_numbers.length ? <>{plain(h.actual_numbers)}<p className="text-xs text-ink/50">Draw ID: {h.actual_draw_id}</p></> : <span className="text-ink/50">Awaiting next draw</span>}</td>
                      <td className="px-4 py-3 capitalize">{h.status || "pending"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="mt-10 rounded-md border border-forest-700/20 px-5 py-3 text-sm text-ink/60">
        Note: the order of numbers on this page can be refreshed on every display. The system keeps the underlying ranking internally.
      </p>
    </AppLayout>
  );
}
