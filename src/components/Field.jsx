import { useState } from "react";

export const inputClass =
  "w-full rounded-md border border-forest-600/20 bg-white px-4 py-3 text-sm outline-none ring-forest-600/40 transition focus:ring-2";

export default function Field({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div className="authformtxtf">
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <div className="relative">
        <input {...props} type={isPw && show ? "text" : type} className={inputClass + (isPw ? " pr-16" : "")} />
        {isPw && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-forest-800"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
