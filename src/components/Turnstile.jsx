import { useEffect, useRef } from "react";

let scriptPromise;
function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = resolve;
      s.onerror = () => { scriptPromise = null; reject(new Error("turnstile")); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function Turnstile({ siteKey, onToken, onError, resetKey = 0, action = "register" }) {
  const box = useRef(null);
  const widget = useRef(null);
  const cb = useRef({ onToken, onError });
  cb.current = { onToken, onError };

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !box.current || widget.current !== null) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          callback: (t) => cb.current.onToken(t),
          "expired-callback": () => cb.current.onToken(""),
          "error-callback": () => cb.current.onToken(""),
        });
      })
      .catch(() => cb.current.onError && cb.current.onError());
    return () => {
      cancelled = true;
      if (widget.current !== null && window.turnstile) {
        try { window.turnstile.remove(widget.current); } catch (e) {}
        widget.current = null;
      }
    };
  }, [siteKey, action]);

  useEffect(() => {
    if (resetKey && widget.current !== null && window.turnstile) {
      window.turnstile.reset(widget.current);
      cb.current.onToken("");
    }
  }, [resetKey]);

  return <div ref={box} />;
}
