export const money = (a) =>
  Number(a || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const durationLabel = (d) => {
  d = String(d || "").toLowerCase();
  return d ? d[0].toUpperCase() + d.slice(1) : "";
};
export const pad = (n) => String(n).padStart(2, "0");
