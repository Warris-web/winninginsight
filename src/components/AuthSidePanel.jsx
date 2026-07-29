import { Link } from "react-router-dom";
import { ArrowLeft, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import LotteryBall from "./LotteryBall";
import TicketStub from "./TicketStub";
import logo from "../assets/img/logol.png";
import floating from "../assets/img/Floating_lottery_ticket_and_balls_202607061029.png"
import {  useNavigate } from 'react-router-dom';


export default function AuthSidePanel() {
  const numbers = [6, 14, 21, 33, 40, 48];
  const navigate = useNavigate();


  return (
    <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-forest-grid px-8 py-10 md:min-h-screen md:px-14 md:py-12 pb0">
      <div className="flex items-center justify-between">
        <Link
          to="#"
          onClick={(e) => {
              e.preventDefault(); // Prevents navigating to '#'
              navigate(-1);       // Triggers history back movement
            }}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span className="">
         <Link to="/">
            <img  className="logoauth" src={logo} />
         </Link>
        </span>
      </div>

      <div className="my-10 flex flex-col items-center gap-8">
        {/* <div className="flex flex-wrap justify-center gap-3">
          {numbers.map((n, i) => (
            <LotteryBall key={n} number={n} size={54} float delay={i * 0.15} />
          ))}
        </div> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }} className="authimgfloat"
        >
          <img  className="authimgfloatimg" src={floating} />
          {/* <TicketStub /> */}
        </motion.div>
      </div>

      <div className="text-white">
        <h2 className="font-display text-3xl font-bold sideauthh2">Predict with confidence</h2>
        <p className="mt-3 max-w-sm text-white/80 sideauthp">
          Subscribe by country and get all prediction tiers for all available games in that country.
        </p>
      </div>

      <p className="mt-10 text-xs text-white/60 sideauthyear">
        © {new Date().getFullYear()} Winning Insight. We don't promise wins, we deliver expert
        analysis to help your decisions.
      </p>
    </div>
  );
}
