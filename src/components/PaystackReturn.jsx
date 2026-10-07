import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const KEY = "li_pending_paystack_ref";

/** Picks up ?reference= / ?trxref= / ?paystack_reference= on ANY route and verifies it once logged in. */
export default function PaystackReturn() {
  const { isLoggedIn } = useAuth();
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const p = new URLSearchParams(search);
    const ref = p.get("paystack_reference") || p.get("reference") || p.get("trxref");
    if (ref) sessionStorage.setItem(KEY, ref);
  }, [search]);

  useEffect(() => {
    const ref = sessionStorage.getItem(KEY);
    if (!ref || !isLoggedIn) return;
    sessionStorage.removeItem(KEY);
    api("/user/subscriptions/paystack/verify", { body: { reference: ref } }).then((r) => {
      navigate("/subscriptions", {
        replace: true,
        state: { flash: { type: r.ok ? "success" : "error", text: r.message || (r.ok ? "Payment verified." : "Payment could not be verified.") } },
      });
    });
  }, [isLoggedIn, search, navigate]);

  return null;
}
