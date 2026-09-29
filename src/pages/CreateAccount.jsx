import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthSidePanel from "../components/AuthSidePanel";
import { api, setToken } from "../services/api";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    nickname: "",
    country_id: "1",
    password: "",
    password_confirm: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countries, setCountries] = useState([
    { id: "1", name: "Nigeria" },
    { id: "2", name: "Ghana" },
    { id: "3", name: "Kenya" },
    { id: "4", name: "South Africa" },
    { id: "5", name: "United Kingdom" },
    { id: "6", name: "United States" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.email || !formData.phone || !formData.nickname || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await api("/auth/register", {
        email: formData.email,
        phone: formData.phone,
        nickname: formData.nickname,
        country_id: formData.country_id,
        password: formData.password,
        password_confirm: formData.password_confirm,
        terms_accepted: 1,
        responsible_play_accepted: 1,
      });

      if (response.ok && response.token) {
        setToken(response.token);
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-mint-50 p-6 authform">
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Field
              label="Phone Number"
              type="tel"
              placeholder="+2347010203040"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Field
              label="Nickname"
              type="text"
              placeholder="Your display name"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />

            <div className="authformtxtf">
              <label className="mb-1.5 block text-sm font-semibold text-ink">Country</label>
              <select
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Field
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
            />

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {success && <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-forest-900 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 authformtxtfbutton"
            >
              {loading ? "Creating account..." : "Register"}
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
        required
        className="w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2"
      />
    </div>
  );
}
