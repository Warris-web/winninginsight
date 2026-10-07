import { Link, useSearchParams } from "react-router-dom";
import AuthSidePanel from "../components/AuthSidePanel";

export default function RegisterSuccess() {
  const [params] = useSearchParams();
  const email = params.get("email");
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <AuthSidePanel />
      <div className="flex items-center justify-center px-6 py-16 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl font-bold text-ink authh1">Check your email</h1>
          <p className="mt-3 text-ink/70">
            Your account has been created{email ? <> and we sent a verification link to <strong>{email}</strong></> : ""}. Confirm your email address, then log in and choose your subscription plan.
          </p>
          <Link to="/login" className="mt-8 inline-block rounded-md bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white">Go to login</Link>
        </div>
      </div>
    </div>
  );
}
