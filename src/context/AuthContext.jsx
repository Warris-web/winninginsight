import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, getToken, setToken } from "../lib/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function userNeedsTerms(user, explicit) {
  if (explicit === true) return true;
  if (!user || typeof user !== "object") return false;
  if (!("terms_accepted_at" in user) && !("responsible_play_accepted_at" in user)) return false;
  return !user.terms_accepted_at || !user.responsible_play_accepted_at;
}

export function AuthProvider({ children }) {
  const [token, setTok] = useState(getToken());
  const [user, setUser] = useState(null);
  const [termsRequired, setTermsRequired] = useState(false);

  const syncUser = useCallback((u, explicit) => {
    if (u) setUser(u);
    setTermsRequired(userNeedsTerms(u, explicit));
  }, []);

  const login = useCallback((tok, u, explicit) => {
    setToken(tok);
    setTok(tok);
    syncUser(u, explicit);
  }, [syncUser]);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST", body: {} });
    setToken("");
    setTok("");
    setUser(null);
    setTermsRequired(false);
  }, []);

  const acceptTerms = useCallback(async () => {
    const r = await api("/user/accept-terms", { method: "POST", body: {} });
    if (r.ok) setTermsRequired(false);
    return r;
  }, []);

  // Forced logout on any 401
  useEffect(() => {
    const h = () => { setTok(""); setUser(null); setTermsRequired(false); };
    window.addEventListener("li:unauthorized", h);
    return () => window.removeEventListener("li:unauthorized", h);
  }, []);

  // After a page refresh the token survives but the user does not: reload it (also re-checks terms)
  useEffect(() => {
    if (token && !user) {
      api("/user/dashboard").then((r) => { if (r.ok) syncUser(r.user, r.terms_required); });
    }
  }, [token, user, syncUser]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, user, termsRequired, login, logout, syncUser, acceptTerms }}>
      {children}
    </AuthContext.Provider>
  );
}
