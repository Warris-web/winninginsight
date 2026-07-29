import { Link } from "react-router-dom";

export default function Footer({ tagline = "We don't promise wins, we deliver expert analysis to help your decisions." }) {
  return (
    <footer className="bg-forest-900 footer">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-xl border border-white/20 px-6 py-4 text-center text-sm text-white/85 footertxt">
          Winning Insight is a prediction support system. It does not guarantee winnings. Play
          responsibly, and only with money you can afford to lose.
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/70 md:flex-row footerlinktop">
          <p className="footertagline">&copy; {new Date().getFullYear()} Winning Insight. {tagline}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors footerlink">Terms</a>
            <Link to="/forum" className="hover:text-white transition-colors footerlink">Forum</Link>
            <Link to="/prediction-history" className="hover:text-white transition-colors footerlink">Prediction history</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
