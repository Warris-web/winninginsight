const tones = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-forest-600/30 bg-mint-100 text-forest-900",
  info: "border-ink/10 bg-mint-50 text-ink/70",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
};
export default function Notice({ type = "info", children }) {
  if (!children) return null;
  return (
    <p role={type === "error" ? "alert" : "status"} className={`rounded-md border px-4 py-3 text-sm ${tones[type] || tones.info}`}>
      {children}
    </p>
  );
}
