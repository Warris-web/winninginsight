import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import { inputClass } from "../components/Field";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function ForumTopic() {
  const { topicId } = useParams();
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState(null);

  const load = useCallback(async () => {
    const r = await api("/forum/topics/" + Number(topicId));
    if (!r.ok) return setError(r.message || "Could not load topic");
    setError(""); setData(r);
  }, [topicId]);
  useEffect(() => { load(); }, [load]);

  const reply = async (e) => {
    e.preventDefault();
    setMsg({ type: "info", text: "Posting reply..." });
    const r = await api("/forum/comments/create", { body: { topic_id: Number(topicId), body } });
    setMsg({ type: r.ok ? "success" : "error", text: r.message || (r.ok ? "Reply posted." : "Could not post reply.") });
    if (r.ok) { setBody(""); load(); }
  };
  const react = async () => {
    const r = await api("/forum/topics/react", { body: { topic_id: Number(topicId), reaction: "like" } });
    if (!r.ok) setMsg({ type: "error", text: r.message || "Could not react" });
    load();
  };

  const t = data?.topic || {};
  return (
    <AppLayout>
      <Link to="/forum" className="text-sm font-semibold text-forest-800 hover:underline">← Back to forum</Link>
      <div className="mt-4"><Notice type="error">{error}</Notice></div>
      {data && (
        <article className="mt-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700">{t.category_name}</span>
          <h1 className="mt-2 font-display text-3xl font-bold">{t.title}</h1>
          <p className="mt-1 text-sm text-ink/50">By {t.nickname || "user"}</p>
          <p className="mt-5 whitespace-pre-wrap leading-relaxed text-ink/75">{t.body}</p>
          {isLoggedIn && <button onClick={react} className="mt-5 rounded-md border border-forest-800/30 px-4 py-2 text-sm font-semibold hover:bg-mint-50">React</button>}

          <h2 className="mt-10 font-display text-xl font-bold">Replies</h2>
          <div className="mt-4 space-y-3">
            {(data.comments || []).map((c, i) => (
              <div key={c.id || i} className="rounded-xl bg-mint-100 p-4">
                <p className="whitespace-pre-wrap text-ink/80">{c.body}</p>
                <p className="mt-2 text-xs text-ink/50">By {c.nickname || "user"} · {c.created_at}</p>
              </div>
            ))}
            {!(data.comments || []).length && <p className="text-sm text-ink/50">No replies yet.</p>}
          </div>

          {isLoggedIn ? (
            <form onSubmit={reply} className="mt-6 space-y-3">
              <textarea className={inputClass + " min-h-28"} placeholder="Write a reply" value={body} onChange={(e) => setBody(e.target.value)} />
              <button className="rounded-md bg-forest-900 px-6 py-3 text-sm font-semibold text-white">Post reply</button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-ink/55"><Link to="/login" className="font-semibold text-forest-800 underline">Login</Link> to reply or react.</p>
          )}
          <div className="mt-3"><Notice type={msg?.type}>{msg?.text}</Notice></div>
        </article>
      )}
    </AppLayout>
  );
}
