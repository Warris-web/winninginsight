// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import AuthSidePanel from "../components/AuthSidePanel";

// export default function Login() {
//   return (
//     <div className="grid min-h-screen md:grid-cols-2 ">
//       <AuthSidePanel />

//       <div className="flex items-center justify-center px-6 py-16 md:px-16">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           <h1 className="font-display text-4xl font-bold text-ink authh1">Log in</h1>
//           <p className="mt-2 text-ink/60 authp">Enter your email address to access your account.</p>

//           <form className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
//             <div className="authformtxtf">
//               <label className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
//               />
//             </div>
//             <div className="authformtxtf">
//               <label className="mb-1.5 block text-sm font-semibold text-ink">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg authformtxtfbutton"
//             >
//               Log in
//             </button>
//             <a href="#" className="block text-center text-sm font-medium text-forest-800 hover:underline authformforget">
//               Forgot password?
//             </a>
//           </form>

//           <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-ink/40 authformnewaccount">
//             <span className="h-px flex-1 bg-ink/10" />
//             New here?
//             <span className="h-px flex-1 bg-ink/10" />
//           </div>

//           <Link
//             to="/create-account"
//             className="block w-full rounded-md border border-forest-800/30 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-mint-50 authcreateacc"
//           >
//             Create an account
//           </Link>

//           <p className="mt-8 text-center text-xs text-ink/40 authtip">
//             Play responsibly, and only with money you can afford to lose.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthSidePanel from "../components/AuthSidePanel";
import Field, { inputClass } from "../components/Field";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const location = useLocation();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotId, setForgotId] = useState("");
  const [forgotMsg, setForgotMsg] = useState(null);

  const dest = location.state?.from?.pathname || "/dashboard";
  if (isLoggedIn) return <Navigate to={dest} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg({ type: "info", text: "Logging in..." });
    const r = await api("/auth/login", { body: { identity, password, device_name: "web" } });
    setBusy(false);
    if (r.ok) login(r.token, r.user, r.terms_required);
    else setMsg({ type: "error", text: r.message || "Login failed." });
  };

  const sendReset = async () => {
    if (!forgotId) return setForgotMsg({ type: "error", text: "Please enter your email address." });
    setForgotMsg({ type: "info", text: "Sending reset link..." });
    const r = await api("/auth/forgot-password", { body: { identity: forgotId } });
    setForgotMsg({ type: r.ok ? "success" : "error", text: r.message || "If the account exists, a reset link has been sent." });
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <AuthSidePanel />
      <div className="flex items-center justify-center px-6 py-16 md:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <h1 className="font-display text-4xl font-bold text-ink authh1">Log in</h1>
          <p className="mt-2 text-ink/60 authp">Enter your email or phone to access your account.</p>

          <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
            <Field label="Email or phone" placeholder="you@example.com" value={identity} onChange={(e) => setIdentity(e.target.value)} autoComplete="username" />
            <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button type="submit" disabled={busy} className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 authformtxtfbutton">
              {busy ? "Logging in..." : "Log in"}
            </button>
            <Notice type={msg?.type}>{msg?.text}</Notice>
            <button type="button" onClick={() => { setShowForgot((v) => !v); setForgotId(identity); }} className="block w-full text-center text-sm font-medium text-forest-800 hover:underline authformforget">
              Forgot password?
            </button>
            {showForgot && (
              <div className="space-y-3 rounded-lg border border-forest-600/15 bg-white p-4">
                <label className="block text-sm font-semibold text-ink">Email address</label>
                <input className={inputClass} placeholder="Enter your email address" value={forgotId} onChange={(e) => setForgotId(e.target.value)} />
                <button type="button" onClick={sendReset} className="rounded-md border border-forest-800/30 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-mint-50">Send reset link</button>
                <Notice type={forgotMsg?.type}>{forgotMsg?.text}</Notice>
              </div>
            )}
          </form>

          <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-ink/40 authformnewaccount">
            <span className="h-px flex-1 bg-ink/10" />New here?<span className="h-px flex-1 bg-ink/10" />
          </div>
          <Link to="/create-account" className="block w-full rounded-md border border-forest-800/30 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-mint-50 authcreateacc">
            Create an account
          </Link>
          <p className="mt-8 text-center text-xs text-ink/40 authtip">Play responsibly, and only with money you can afford to lose.</p>
        </motion.div>
      </div>
    </div>
  );
}
