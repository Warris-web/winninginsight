import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkle } from "lucide-react";
import logo from "../assets/img/logo.png";
import background from "../assets/img/BackgroundLines.png";
const links = [
  { to: "/our-story", label: "Our Story" },
  { to: "/prediction-history", label: "Prediction History" },
  { to: "/forum", label: "Forum" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 navlogotop">
        <Link to="/" className="flex items-center gap-2 text-white hlogo">
        <img src={logo} alt="Winning Insight" className="navlogoimg" />
          <span className="">Winning Insight</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors navbarlink ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/login" className="text-sm font-medium text-white/85 hover:text-white transition-colors navbarlink">
            Login
          </Link>
          <Link
            to="/create-account"
            className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-forest-900 transition-transform hover:shadow-lg hover:shadow-black/10 navbarlinksignup"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="mx-6 mb-4 flex flex-col gap-4 rounded-xl bg-forest-800/95 p-6 backdrop-blur md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-white/90 font-medium">
              {l.label}
            </Link>
          ))}
          <hr className="border-white/15" />
          <Link to="/login" onClick={() => setOpen(false)} className="text-white/90 font-medium">Login</Link>
          <Link
            to="/create-account"
            onClick={() => setOpen(false)}
            className="rounded-md bg-white px-5 py-2.5 text-center text-sm font-semibold text-forest-900"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
