import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import hmeimg from "../assets/img/hmeimg1.png";

export default function Home() {
  return (
    <div className="herohme min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="flex-1 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-4 md:grid-cols-2 md:px-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl txthmebi">
            Data Backed Daily Lotto Prediction Pools
          </h1>

          <p className="mt-4 max-w-md text-base text-white/80 md:text-lg txthmebip">
            Subscribe by country and get all prediction tiers for all available
            games in that country.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/create-account"
              className="winingbtn1"
            >
              Get Started
            </Link>

            <Link
              to="/prediction-history"
              className="winingbtn2"
            >
              See Past Results
            </Link>
          </div>

          <p className="mt-8 max-w-md text-xs leading-relaxed text-white/60 disclamerp">
            Disclaimer: Winning Insight provides prediction pools only.
            Predictions are not guaranteed winning numbers. Play responsibly
            and only with money you can afford to lose.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className=""
        >
          <img
            src={hmeimg}
            alt="Winning Insight"
            className=""
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-7xl px-6 py-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/70 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} Winning Insight. We don't promise
            wins—we deliver expert analysis to help your decisions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>

            <Link
              to="/forum"
              className="transition-colors hover:text-white"
            >
              Forum
            </Link>

            <Link
              to="/prediction-history"
              className="transition-colors hover:text-white"
            >
              Prediction History
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}