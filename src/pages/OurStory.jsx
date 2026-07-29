import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const timeline = [
  {
    year: "2005 — The Beginning",
    body: [
      "The journey started in 2005 with basic mathematical methods. At that time, the work was mostly manual: observing past results, testing simple number behaviour and trying to understand whether some patterns were more useful than others.",
      "Those early methods were not enough. The problem was larger than simple arithmetic or casual observation. It required deeper structure, better testing, stronger programming and a willingness to keep improving the model over many years.",
    ],
  },
  {
    year: "The Foundation",
    body: [
      "The product is rooted in mathematical thinking. The lead research direction came from a background in Pure and Applied Mathematics, strengthened by many years of software development and practical experience building systems.",
      "Programming made it possible to test ideas faster. Machine learning knowledge helped the research move from small manual experiments into a full product that can compare signals, test historical performance and organise prediction pools at scale.",
    ],
  },
  {
    year: "The Team",
    body: [
      "Winning Insight represents the work of five mathematicians who believe that lotto prediction should be studied carefully, not guessed casually. The work is not built on one lucky formula. It is the result of repeated testing, rejection, improvement and refinement.",
      "We deliberately do not disclose the internal details of how the system works. What users see is the finished signal output, not the research engine behind it.",
    ],
    badges: ["M1", "M2", "M3", "M4", "M5"],
  },
  {
    year: "Champion Profiles and Signals",
    body: [
      "Each game is treated carefully. The system looks for the best working profile for that game based on historical behaviour and testing. We call this the champion profile because it is the profile currently performing best under our internal evaluation process.",
      "Our signals are designed to help users understand the strength of the current prediction pool. A signal is not a promise. It is a research-backed indicator from the model at that point in time.",
    ],
    quote: '"A signal is not a promise."',
  },
  {
    year: "A Work in Progress",
    body: [
      "Winning Insight is a continuous research project. We are not promising a win, and we do not present any prediction as a sure thing. The models available today are the best ones we have approved for now, and we will keep improving them as the research continues.",
    ],
    current: true,
  },
];

export default function OurStory() {
  return (
    <div>
      <div className="headernav">
        <Navbar />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700 ourstoryh"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-5xl ourstoryh1"
        >
          A long research journey into lotto prediction intelligence.
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/65 ourstoryhp">
          Winning Insight grew from a simple belief held by a group of mathematicians: lotto
          numbers may be random, but historical behaviour, structure, rhythm and repeated signals
          can still be studied with discipline.
        </p>

        <div className="relative mt-16 border-l border-forest-700/20 pl-10 borderstoryleft">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative pb-14 last:pb-0"
            >
              <span
                className={`absolute -left-[45px] top-1.5 h-3 w-3 rounded-full ${
                  item.current ? "border-2 border-forest-700 bg-white borderstorylefttxt" : "bg-forest-700 borderstoryleftactive"
                }`}
              />
              <h3 className="font-display text-xl font-bold text-forest-800 ourstorytxth">{item.year}</h3>
              {item.body.map((p, j) => (
                <p key={j} className="mt-3 leading-relaxed text-ink/70 ourstorytxthp">
                  {p}
                </p>
              ))}
              {/* {item.badges && (
                <div className="mt-5 flex gap-3">
                  {item.badges.map((b) => (
                    <span
                      key={b}
                      className="grid h-11 w-11 place-items-center rounded-lg bg-mint-100 font-display text-sm font-bold text-forest-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )} */}
              {item.badges && (
                <div className="mt-8 flex flex-wrap gap-7">
                  {item.badges.map((_, index) => {
                    const styles = [
                      {
                        transform: "rotate(0deg)",
                        borderRadius: "10px 8px 10px 10px",
                      },
                      {
                        transform: "rotate(-1.8deg)",
                        borderRadius: "8px 10px 9px 11px",
                      },
                      {
                        transform: "rotate(1.2deg)",
                        borderRadius: "9px 9px 10px 8px",
                      },
                      {
                        transform: "rotate(0.4deg)",
                        borderRadius: "10px 8px 8px 10px",
                      },
                      {
                        transform: "rotate(1.8deg)",
                        borderRadius: "8px 10px 10px 9px",
                      },
                    ];

                    return (
                      <div
                        key={index}
                        style={styles[index]}
                        className="
                          flex h-24 w-24 items-center justify-center
                          border-2 border-[#87978F]
                          bg-[#E8F0EF]
                          shadow-[0_2px_0_rgba(0,0,0,0.08)]
                          transition-all duration-300
                          hover:rotate-0 hover:-translate-y-1 hover:shadow-md bagescardtxtun
                        "
                      >
                        <span className="font-display font-bold text-[2.2rem] text-[#123D37] leading-none bagescardtxtunn">
                          M
                          <sub
                            className="
                              relative
                              text-[0.65rem]
                              font-semibold
                              align-baseline
                              bottom-[-0.45rem]
                              left-[1px] bagescardtxtuns
                            "
                          >
                            {index + 1}
                          </sub>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {item.quote && (
                <blockquote className="mt-5 rounded-xl bg-mint-100 px-6 py-5 font-display text-xl font-bold text-ink signalstory">
                  {item.quote}
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>

        <hr className="mt-4 border-ink/10" />
        <p className="mt-8 text-sm text-ink/60 storypredict">
          Predictions are only guidance. Play responsibly and only with money you can afford to
          lose.
        </p>
        <Link
          to="/prediction-history"
          className="mt-6 inline-block rounded-md bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white transition-transform storypredictbtn"
        >
          Judge us by our record →
        </Link>
      </section>

      <Footer tagline="We don't promise wins, we deliver expert analysis to help your decisions." />
    </div>
  );
}
