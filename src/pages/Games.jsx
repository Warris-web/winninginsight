import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import Pagination from "../components/Pagination";
import { inputClass } from "../components/Field";
import { api } from "../lib/api";

export default function Games() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [perPage, setPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { const t = setTimeout(() => { setDq(q); setPage(1); }, 350); return () => clearTimeout(t); }, [q]);

  useEffect(() => {
    let off = false;
    setLoading(true);
    api("/user/games?" + new URLSearchParams({ page, per_page: perPage, q: dq })).then((r) => {
      if (off) return;
      setLoading(false);
      if (!r.ok) return setError(r.message || "Could not load games");
      setError(""); setData(r);
    });
    return () => { off = true; };
  }, [page, perPage, dq]);

  const games = data?.games || [];
  const pill = (on, yes, no, good) => (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${on ? "border-forest-700/30 bg-mint-100 text-forest-900" : good ? "border-ink/15 bg-white text-ink/60" : "border-amber-200 bg-amber-50 text-amber-900"}`}>{on ? yes : no}</span>
  );

  return (
    <AppLayout title="Available Games" subtitle="Search and browse the game catalogue. Open Prediction will show a clear message if access is not available.">
      <Notice type="info">Open Prediction shows model-generated pools. It is not a promise that any game will win.</Notice>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search game or country" className={inputClass + " sm:max-w-xs"} />
        <select value={perPage} onChange={(e) => { setPerPage(e.target.value); setPage(1); }} className={inputClass + " sm:w-28"}>
          {["10", "20", "50"].map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div className="mt-4"><Notice type="error">{error}</Notice></div>
      {loading && !data && <p className="mt-6 text-ink/50">Loading available games...</p>}
      <div className="mt-6 space-y-4">
        {games.map((g) => (
          <div key={g.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-mint-100 p-5">
            <div>
              <h3 className="font-display text-lg font-bold">{g.name}</h3>
              <p className="text-sm text-ink/55">{g.country_name} · Cut off: {g.cutoff_time || "Not set"}</p>
              <p className="mt-1 text-xs text-ink/45">Prediction pools are guidance only, not guaranteed winning numbers.</p>
              <div className="mt-3 flex gap-2">
                {pill(g.has_champion_profile, "Champion profile: Yes", "Champion profile: No", true)}
                {pill(g.has_access, "Subscribed", "Needs subscription", false)}
              </div>
            </div>
            <button disabled={!g.can_subscribe} onClick={() => navigate(`/prediction/${g.id}`)} className="rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">Open prediction</button>
          </div>
        ))}
        {data && !games.length && <p className="text-ink/55">No available games matched your filter.</p>}
      </div>
      <Pagination pagination={data?.pagination} onPage={setPage} />
    </AppLayout>
  );
}
