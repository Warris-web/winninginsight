export const groupObject = (fp, key) => {
  const g = (fp && fp.groups) || {};
  return g[key] || g[key.replace("_", "")] || {};
};
export const groupNumbers = (fp, key) => {
  const g = groupObject(fp, key);
  const n = Array.isArray(g.numbers) ? g.numbers : Array.isArray(g) ? g : [];
  return n.map((x) => (x && typeof x === "object" ? x.number : x)).filter((x) => x !== undefined && x !== null && x !== "");
};
export const groupSignal = (fp, key) => {
  const groups = ((fp && fp.model_rhythm_signal) || {}).groups || {};
  const g = groups[key.replace("_", "")] || groups[key] || {};
  return {
    label: g.display_label || "Not available",
    signal: g.signal || "not-available",
    message: g.message || "",
    dry: g.current_dry_streak || 0,
    median: g.median_dry_before_hit || 0,
    hits: g.last_draw_hits || 0,
  };
};
export const signalTone = (s) => {
  s = String(s || "").toLowerCase().replace(/_/g, "-");
  if (s === "strong" || s === "high") return "border-forest-700/30 bg-mint-100 text-forest-900";
  if (s === "low") return "border-amber-300 bg-amber-50 text-amber-900";
  if (s === "caution") return "border-red-200 bg-red-50 text-red-800";
  return "border-ink/15 bg-white text-ink/60";
};
