import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { durationLabel } from "../lib/format";

const pillTone = (s) => {
  s = String(s || "").toLowerCase();
  if (["active", "successful", "evaluated", "rewarded"].includes(s)) return "bg-mint-100 text-forest-900 border-forest-700/30";
  if (s === "pending") return "bg-amber-50 text-amber-900 border-amber-200";
  return "bg-white text-ink/60 border-ink/15";
};

export default function Dashboard() {
  const { syncUser } = useAuth();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await api("/user/dashboard");
    setLoading(false);
    if (!r.ok) return setMsg({ type: "error", text: r.message || "Could not load dashboard" });
    setMsg(null);
    setData(r);
    syncUser(r.user, r.terms_required);
  }, [syncUser]);

  useEffect(() => { load(); }, [load]);

  const copy = (link) => {
    navigator.clipboard?.writeText(link).then(
      () => setMsg({ type: "success", text: "Referral link copied." }),
      () => window.prompt("Copy your referral link:", link)
    );
  };

  const subs = data?.subscriptions || [];
  const today = data?.today_predictions || [];
  const ref = data?.referral_summary || {};
  const stat = (label, value) => (
    <div className="rounded-xl bg-mint-100 p-5"><p className="text-sm text-ink/55">{label}</p><p className="mt-1 font-display text-3xl font-bold text-ink">{value}</p></div>
  );

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Your subscription status, today's generated predictions and recent transactions."
      action={<button onClick={load} className="rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white">Refresh</button>}
    >
      <Notice type="info">Responsible play: predictions are not guaranteed results. Use them as guidance only.</Notice>
      <div className="mt-4"><Notice type={msg?.type}>{msg?.text}</Notice></div>
      {loading && !data && <p className="mt-6 text-ink/50">Loading dashboard...</p>}

      {data && (
        <div className="mt-8 space-y-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {stat("Active subscriptions", subs.filter((s) => String(s.status).toLowerCase() === "active").length)}
            {stat("Today's predictions", today.length)}
            {stat("Recent transactions", (data.transactions || []).length)}
          </div>

          {ref.code && (
            <section className="rounded-2xl border border-forest-700/15 bg-mint-50 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">Referral rewards</p>
                  <h2 className="mt-1 font-display text-xl font-bold">Invite friends and earn free days</h2>
                  <p className="mt-1 text-sm text-ink/60">When someone signs up with your link and pays, your free days are added automatically.</p>
                </div>
                {ref.url && <button onClick={() => copy(ref.url)} className="rounded-md border border-forest-800/30 px-4 py-2.5 text-sm font-semibold hover:bg-white">Copy link</button>}
              </div>
              <p className="mt-4 text-sm text-ink/60">Your code: <strong className="font-display text-lg text-ink">{ref.code}</strong></p>
              {ref.url && <input readOnly value={ref.url} onClick={(e) => e.target.select()} className="mt-3 w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm" />}
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[["Registered", ref.registered_count], ["Paid referrals", ref.rewarded_count], ["Free days earned", ref.total_reward_days], ["Waiting to pay", ref.pending_count]].map(([l, v]) => (
                  <div key={l}><p className="font-display text-2xl font-bold">{Number(v || 0)}</p><p className="text-xs text-ink/55">{l}</p></div>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink/50">Daily payment gives you 1 free day, Weekly gives 2, Monthly gives 5. Rewards stack.</p>
              {(ref.recent_referrals || []).length > 0 && (
                <ul className="mt-4 space-y-2">
                  {ref.recent_referrals.map((it, i) => {
                    const who = it.referred_nickname || it.referred_email || it.referred_phone || "Friend";
                    const st = String(it.status || "registered");
                    const d = Number(it.reward_days || 0);
                    return (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span>{who}</span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${pillTone(st)}`}>{st === "rewarded" ? `Rewarded +${d} day${d === 1 ? "" : "s"}` : "Registered"}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}

          <section>
            <h2 className="font-display text-xl font-bold">Today's predictions</h2>
            {!today.length && <p className="mt-2 text-sm text-ink/55">No prediction has been generated for today yet. Open an active subscribed game to generate one on demand.</p>}
            <div className="mt-4 space-y-3">
              {today.map((p) => (
                <div key={p.game_type_id} className="flex items-center justify-between rounded-xl bg-mint-100 px-5 py-4">
                  <div><p className="font-semibold">{p.game_name || `Game #${p.game_type_id}`}</p><p className="text-sm text-ink/55">Top 10, Top 20 and Top 30 included</p></div>
                  <Link to={`/prediction/${p.game_type_id}`} className="rounded-md bg-forest-900 px-4 py-2.5 text-sm font-semibold text-white">Open prediction</Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold">Subscriptions</h2>
            {!subs.length && <p className="mt-2 text-sm text-ink/55">You do not have an active subscription yet.</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {subs.map((s, i) => (
                <span key={i} className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${pillTone(s.status)}`}>
                  {s.country_name} · {s.game_name || "All Games"} · All Tiers · {durationLabel(s.duration_type)} · {s.status}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/subscriptions" className="rounded-md bg-forest-900 px-5 py-3 text-sm font-semibold text-white">Subscribe or renew</Link>
              <Link to="/games" className="rounded-md border border-forest-800/30 px-5 py-3 text-sm font-semibold hover:bg-mint-50">Browse available games</Link>
            </div>
          </section>
        </div>
      )}
    </AppLayout>
  );
}
