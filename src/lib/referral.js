const KEY = "li_referral_code";
const clean = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 30);

export function rememberReferralCode() {
  try {
    const url = new URL(window.location.href);
    const fromUrl = clean(url.searchParams.get("ref") || url.searchParams.get("referral") || url.searchParams.get("referral_code"));
    if (fromUrl) {
      sessionStorage.setItem(KEY, fromUrl);
      localStorage.setItem(KEY, fromUrl);
      ["ref", "referral", "referral_code"].forEach((k) => url.searchParams.delete(k));
      const q = url.searchParams.toString();
      window.history.replaceState({}, document.title, url.pathname + (q ? "?" + q : "") + url.hash);
      return fromUrl;
    }
  } catch (e) {}
  return getReferralCode();
}

export function getReferralCode() {
  try { const s = sessionStorage.getItem(KEY); if (s) return clean(s); } catch (e) {}
  try { return clean(localStorage.getItem(KEY)); } catch (e) {}
  return "";
}
