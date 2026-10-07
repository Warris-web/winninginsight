import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import { inputClass } from "../components/Field";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { durationLabel, money } from "../lib/format";

export default function Subscriptions() {
  const { user } = useAuth();
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [duration, setDuration] = useState("daily");
  const [plans, setPlans] = useState(null);
  const [msg, setMsg] = useState(location.state?.flash || null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    api("/auth/countries").then((r) => setCountries(r.ok && Array.isArray(r.countries) ? r.countries : []));
  }, []);
  useEffect(() => {
    if (!countryId && countries.length) setCountryId(String(user?.country_id || countries[0].id));
  }, [countries, user, countryId]);

  useEffect(() => {
    if (!countryId) return;
    let off = false;
    api("/user/subscription-plans?country_id=" + encodeURIComponent(countryId)).then((r) => {
      if (off) return;
      if (!r.ok) return setMsg({ type: "error", text: r.message || "Could not load plans" });
      setPlans(r);
    });
    return () => { off = true; };
  }, [countryId]);

  const pay = async () => {
    setPaying(true);
    setMsg({ type: "info", text: "Initialising Paystack payment..." });
    const r = await api("/user/subscriptions/paystack/initialize", { body: { country_id: countryId || 1, game_type_id: 0, duration_type: duration } });
    if (!r.ok) { setPaying(false); return setMsg({ type: "error", text: r.message || "Could not initialise payment." }); }
    window.location.href = r.authorization_url;
  };

  return (
    <AppLayout title="Subscribe" subtitle="Choose a country and duration. Each active subscription gives you Top 10, Top 20 and Top 30 pools for every available game in that country. Payment is processed with Paystack.">
      <Notice type="info">Your subscription gives access to prediction pools, not guaranteed winning numbers.</Notice>
      <div className="mt-6 grid gap-4 rounded-2xl bg-mint-50 p-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Country</label>
          <select className={inputClass} value={countryId} onChange={(e) => setCountryId(e.target.value)}>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Duration</label>
          <select className={inputClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <button onClick={pay} disabled={paying} className="rounded-md bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60">Pay with Paystack</button>
        </div>
      </div>
      <div className="mt-4"><Notice type={msg?.type}>{msg?.text}</Notice></div>

      {plans && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">{plans.country_name || "Selected country"} plans</h2>
          {!(plans.plans || []).length ? (
            <div className="mt-3"><Notice type="warn">No subscription pricing was found for this country yet.</Notice></div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {plans.plans.map((p) => {
                const on = p.duration_type === duration;
                return (
                  <button key={p.duration_type} onClick={() => setDuration(p.duration_type)}
                    className={`rounded-xl border p-5 text-left transition ${on ? "border-forest-700 bg-mint-100 ring-2 ring-forest-700/30" : "border-forest-700/15 bg-white hover:bg-mint-50"}`}>
                    <p className="font-display text-lg font-bold">{durationLabel(p.duration_type)}</p>
                    <p className="text-sm text-ink/55">All Games · Top 10, Top 20 and Top 30 included</p>
                    <p className="mt-3 font-display text-2xl font-bold text-forest-800">{p.currency_code} {money(p.amount)}</p>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}
    </AppLayout>
  );
}
