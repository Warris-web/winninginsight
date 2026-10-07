// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import AuthSidePanel from "../components/AuthSidePanel";

// const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States"];

// export default function CreateAccount() {
//   const [agreed, setAgreed] = useState(true);

//   return (
//     <div className="grid min-h-screen md:grid-cols-2">
//       <AuthSidePanel />

//       <div className="flex items-center justify-center px-6 py-16 md:px-16">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           <h1 className="font-display text-4xl font-bold text-ink authh1">Create Account</h1>
//           <p className="mt-2 text-ink/60 authp">
//             Sign up for an account, confirm your email address, and choose your subscription plan.
//           </p>

//           <form className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
//             <Field label="Email" type="email" placeholder="you@example.com" />
//             <Field label="Phone Number" type="tel" placeholder="+2347010203040" />

//             <div className="authformtxtf">
//               <label className="mb-1.5 block text-sm font-semibold text-ink">Country</label>
//               <select className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2">
//                 {countries.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <Field label="Password" type="password" placeholder="••••••••" />
//             <Field label="Confirm Password" type="password" placeholder="••••••••" />

//             <button
//               type="submit"
//               className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg authformtxtfbutton"
//             >
//               Register
//             </button>

//             <label className="flex items-start gap-3 text-xs text-ink/60 agreetandctxt">
//               <input
//                 type="checkbox"
//                 checked={agreed}
//                 onChange={(e) => setAgreed(e.target.checked)}
//                 className="mt-0.5 h-4 w-4 accent-forest-800 agreetandc"
//               />
//               I agree to the Terms and Conditions and understand that Winning Insight is only a
//               predictor. It does not guarantee winnings and I will play responsibly.
//             </label>
//           </form>

//           <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-ink/40 authformnewaccount">
//             <span className="h-px flex-1 bg-ink/10" />
//             Already have an account?
//             <span className="h-px flex-1 bg-ink/10" />
//           </div>

//           <Link
//             to="/login"
//             className="block w-full rounded-md border border-forest-800/30 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-mint-50 authcreateacc"
//           >
//             Login to your account
//           </Link>

//           <p className="mt-8 text-center text-xs text-ink/40 authtip">
//             Play responsibly, and only with money you can afford to lose.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// function Field({ label, ...props }) {
//   return (
//     <div className="authformtxtf">
//       <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
//       <input
//         {...props}
//         className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
//       />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthSidePanel from "../components/AuthSidePanel";
import Field, { inputClass } from "../components/Field";
import Notice from "../components/Notice";
import Turnstile from "../components/Turnstile";
import { api } from "../lib/api";
import { getReferralCode } from "../lib/referral";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [f, setF] = useState({ email: "", phone: "", nickname: "", country_id: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false); // must be an explicit opt-in
  const [countries, setCountries] = useState([]);
  const [captcha, setCaptcha] = useState({ loaded: false, enabled: false, siteKey: "" });
  const [tsToken, setTsToken] = useState("");
  const [tsReset, setTsReset] = useState(0);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  useEffect(() => {
    api("/auth/countries").then((r) => {
      const list = r.ok && Array.isArray(r.countries) && r.countries.length ? r.countries : [{ id: 1, name: "Nigeria" }];
      setCountries(list);
      setF((s) => ({ ...s, country_id: s.country_id || String(list[0].id) }));
    });
    api("/auth/captcha-config").then((r) => {
      const c = r.ok && r.captcha ? r.captcha : {};
      setCaptcha({ loaded: true, enabled: !!c.enabled, siteKey: c.site_key || "" });
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!captcha.loaded) return setMsg({ type: "info", text: "Security verification is still loading. Please wait a moment." });
    if (f.password.length < 6) return setMsg({ type: "error", text: "Password must be at least 6 characters." });
    if (f.password !== f.confirm) return setMsg({ type: "error", text: "Passwords do not match. Please check both password fields." });
    if (!agreed) return setMsg({ type: "error", text: "Please accept the Terms and Conditions and Responsible Play disclaimer before registering." });
    if (captcha.enabled && !tsToken) return setMsg({ type: "error", text: "Please complete the security verification before registering." });

    setBusy(true);
    setMsg({ type: "info", text: "Creating account..." });
    const r = await api("/auth/register", {
      body: {
        email: f.email,
        phone: f.phone,
        nickname: f.nickname,
        referral_code: getReferralCode(),
        country_id: f.country_id,
        password: f.password,
        password_confirm: f.confirm,
        terms_accepted: 1,
        responsible_play_accepted: 1,
        turnstile_token: tsToken,
      },
    });
    setBusy(false);
    if (r.ok) return navigate("/register-success" + (f.email ? "?email=" + encodeURIComponent(f.email) : ""));
    setMsg({ type: "error", text: r.message || "Registration failed. Please try again." });
    setTsReset((n) => n + 1);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <AuthSidePanel />
      <div className="flex items-center justify-center px-6 py-16 md:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <h1 className="font-display text-4xl font-bold text-ink authh1">Create Account</h1>
          <p className="mt-2 text-ink/60 authp">Sign up for an account, confirm your email address, and choose your subscription plan.</p>

          <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
            <Field label="Email" type="email" placeholder="you@example.com" value={f.email} onChange={set("email")} autoComplete="email" />
            <Field label="Phone Number" type="tel" placeholder="+2347010203040" value={f.phone} onChange={set("phone")} autoComplete="tel" />
            <Field label="Nickname" placeholder="Choose a nickname" value={f.nickname} onChange={set("nickname")} />
            <div className="authformtxtf">
              <label className="mb-1.5 block text-sm font-semibold text-ink">Country</label>
              <select className={inputClass} value={f.country_id} onChange={set("country_id")}>
                {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Field label="Password" type="password" placeholder="••••••••" value={f.password} onChange={set("password")} autoComplete="new-password" />
            <Field label="Confirm Password" type="password" placeholder="••••••••" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" />
            <p className="-mt-2 text-xs text-ink/50">Use at least 6 characters. Make sure both password fields match.</p>

            <label className="flex items-start gap-3 text-xs text-ink/60 agreetandctxt">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-forest-800 agreetandc" />
              <span>
                I agree to the <Link to="/terms" target="_blank" className="font-semibold text-forest-800 underline">Terms and Conditions</Link> and understand that Winning Insight is only a predictor. It does not guarantee winnings and I will play responsibly.
              </span>
            </label>

            {captcha.enabled && captcha.siteKey && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">Security verification</label>
                <Turnstile siteKey={captcha.siteKey} onToken={setTsToken} resetKey={tsReset}
                  onError={() => setMsg({ type: "error", text: "Security verification could not load. Please refresh the page." })} />
                <p className="mt-1 text-xs text-ink/50">This protects registration from automated signups.</p>
              </div>
            )}

            <button type="submit" disabled={busy} className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 authformtxtfbutton">
              {busy ? "Creating account..." : "Register"}
            </button>
            <Notice type={msg?.type}>{msg?.text}</Notice>
          </form>

          <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-ink/40 authformnewaccount">
            <span className="h-px flex-1 bg-ink/10" />Already have an account?<span className="h-px flex-1 bg-ink/10" />
          </div>
          <Link to="/login" className="block w-full rounded-md border border-forest-800/30 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-mint-50 authcreateacc">
            Login to your account
          </Link>
          <p className="mt-8 text-center text-xs text-ink/40 authtip">Play responsibly, and only with money you can afford to lose.</p>
        </motion.div>
      </div>
    </div>
  );
}
