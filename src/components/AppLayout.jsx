import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ title, subtitle, action, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-forest-900"><Navbar /></div>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 md:px-10">
        {(title || action) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 max-w-2xl text-ink/60">{subtitle}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
