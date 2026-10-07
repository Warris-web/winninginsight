const API_BASE = (import.meta.env.VITE_API_BASE || "https://lotteryintel247.com/api").replace(/\/$/, "");
const KEY = "li_token";

export const getToken = () => localStorage.getItem(KEY) || "";
export const setToken = (v) => (v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY));

export async function api(path, { method, body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (getToken()) headers.Authorization = "Bearer " + getToken();
  const opts = { headers, method: method || (body !== undefined ? "POST" : "GET") };
  if (body !== undefined) opts.body = JSON.stringify(body);

  let res, data;
  try {
    res = await fetch(API_BASE + path, opts);
    data = await res.json();
  } catch (e) {
    return { ok: false, message: "Could not connect to the server. Please try again." };
  }
  if (res.status === 401) {
    setToken("");
    window.dispatchEvent(new Event("li:unauthorized"));
  }
  if (!data || typeof data !== "object") return { ok: false, message: "Invalid server response." };
  return data;
}
