import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import forum1 from "../assets/img/Rectangle.png";
import forum from "../assets/img/Rectangle46.png";
import forum2 from "../assets/img/Rectangle463.png";

const CATEGORIES = ["All Categories", "Product Updates", "Community", "Interviews"];

const POSTS = [
  {
    title: "Latest updates on the all new and improved lottery games",
    body: "Stay informed with the latest news, feature updates, and expert tips to enhance your lottery experience. Discover new game strategies and upcoming changes to maximize your chances.",
    author: "Akinbode Adebayo",
    date: "15th May 2026",
    category: "Product Updates",
    tone: "from-amber-100 to-rose-100",
    img: forum
  },
  {
    title: "Exciting enhancements to the mobile lottery app",
    body: "Explore the revamped mobile interface, offering easier navigation and personalized notifications. Get real-time updates on draws and results directly on your device.",
    author: "Clara Johnson",
    date: "22nd May 2026",
    category: "Product Updates",
    tone: "from-orange-100 to-red-100",
    img: forum1
  },
  {
    title: "New community initiatives to support players",
    body: "Join our latest community outreach programs aimed at educating players about responsible gaming. Participate in workshops and events designed to promote a safe gaming environment.",
    author: "Robert Lee",
    date: "29th May 2026",
    category: "Community",
    tone: "from-amber-100 to-rose-100",
    img: forum
  },
  {
    title: "Exclusive interviews with lottery winners",
    body: "Read inspiring stories from recent winners who share their experiences and strategies that led them to success. Learn from their journeys and gain insights into winning the lottery.",
    author: "Samantha Green",
    date: "5th June 2026",
    category: "Interviews",
    tone: "from-slate-100 to-slate-200",
    img: forum2
  },
];

export default function Forum() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filtered = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          (category === "All Categories" || p.category === category) &&
          p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  return (
    <div>
      <div className="headeranothertop">
        <Navbar />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10 forumheader">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-bold text-white"
          >
            Forum
          </motion.h1>
          <p className="mt-4 max-w-lg text-white/80">
            Every prediction is graded against the official draw and published the next day.
            Nothing appears before the result is available.
          </p>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-10 widforumtp">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-md bg-mint-100 px-4 py-3 text-sm outline-none placeholder:text-ink/40 sm:max-w-xs forumcatsearch"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md bg-mint-100 px-4 py-3 text-sm outline-none forumcatsearch"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 space-y-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.06 }}
              className="grid gap-6 rounded-xl bg-mint-100 p-4 sm:grid-cols-[220px_1fr] foruarticle"
            >
              <img src={post.img} className={`h-40 rounded-lg bg-gradient-to-br sm:h-full imgforumwh`} />
              <div className="py-1">
                {/* <span className="text-xs font-bold uppercase tracking-widest text-forest-700">
                  {post.category}
                </span> */}
                <h2 className="mt-2 font-display text-2xl font-bold text-ink forumarticleh">{post.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/65 forumarticlep">{post.body}</p>
                <p className="mt-4 text-sm text-ink/50 forumarticlename">
                  {post.author} – {post.date}
                </p>
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-ink/50">No posts match your search.</p>
          )}
        </div>
      </section>

      <Footer tagline="We don't promise wins. We publish our results." />
    </div>
  );
}
