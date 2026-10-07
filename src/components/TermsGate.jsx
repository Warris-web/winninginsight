import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notice from "./Notice";

export default function TermsGate() {
  const { isLoggedIn, termsRequired, acceptTerms } = useAuth();
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState(null);
  if (!isLoggedIn || !termsRequired) return null;

  const accept = async () => {
    if (!checked) return setMsg({ type: "error", text: "Please tick the box to accept the Terms and Responsible Play disclaimer." });
    setMsg({ type: "info", text: "Saving acceptance..." });
    const r = await acceptTerms();
    if (!r.ok) setMsg({ type: "error", text: r.message || "Could not save acceptance." });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-8 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">Responsible play</p>
        <h2 className="font-display text-2xl font-bold text-ink">Accept Terms and Conditions</h2>
        <p className="text-sm text-ink/70">Winning Insight is a prediction support system. It does not guarantee that any number, pool or game will win.</p>
        <p className="text-sm text-ink/70">You agree to use the predictions responsibly and only play with money you can afford to lose.</p>
        <label className="flex items-start gap-3 text-sm text-ink/70">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-0.5 h-4 w-4 accent-forest-800" />
          I understand and accept the Terms and Conditions and Responsible Play disclaimer.
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button onClick={accept} className="rounded-md bg-forest-900 px-6 py-3 text-sm font-semibold text-white">Accept and continue</button>
          <Link to="/terms" target="_blank" className="text-sm font-medium text-forest-800 hover:underline">Read full terms</Link>
        </div>
        <Notice type={msg?.type}>{msg?.text}</Notice>
      </div>
    </div>
  );
}
