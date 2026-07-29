import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthSidePanel from "../components/AuthSidePanel";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States"];

export default function CreateAccount() {
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <AuthSidePanel />

      <div className="flex items-center justify-center px-6 py-16 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-4xl font-bold text-ink authh1">Create Account</h1>
          <p className="mt-2 text-ink/60 authp">
            Sign up for an account, confirm your email address, and choose your subscription plan.
          </p>

          <form className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Phone Number" type="tel" placeholder="+2347010203040" />

            <div className="authformtxtf">
              <label className="mb-1.5 block text-sm font-semibold text-ink">Country</label>
              <select className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2">
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <Field label="Password" type="password" placeholder="••••••••" />
            <Field label="Confirm Password" type="password" placeholder="••••••••" />

            <button
              type="submit"
              className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg authformtxtfbutton"
            >
              Register
            </button>

            <label className="flex items-start gap-3 text-xs text-ink/60 agreetandctxt">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-forest-800 agreetandc"
              />
              I agree to the Terms and Conditions and understand that Winning Insight is only a
              predictor. It does not guarantee winnings and I will play responsibly.
            </label>
          </form>

          <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-ink/40 authformnewaccount">
            <span className="h-px flex-1 bg-ink/10" />
            Already have an account?
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <Link
            to="/login"
            className="block w-full rounded-md border border-forest-800/30 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-mint-50 authcreateacc"
          >
            Login to your account
          </Link>

          <p className="mt-8 text-center text-xs text-ink/40 authtip">
            Play responsibly, and only with money you can afford to lose.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="authformtxtf">
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
      />
    </div>
  );
}
