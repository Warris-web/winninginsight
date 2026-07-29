export default function TicketStub({ circled = [6, 17, 33, 41, 48], drawId = "NL-74932-881" }) {
  const rows = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42],
    [43, 44, 45, 46, 47, 48, 49],
  ];

  return (
    <div className="w-full max-w-md -rotate-2 rounded-sm bg-[#f3ede0] p-5 font-body text-[#2b2b26] shadow-2xl">
      <div className="flex items-start justify-between border-b border-dashed border-black/30 pb-2 text-[11px] uppercase tracking-wide">
        <span className="font-display text-base font-bold tracking-tight">National Lottery</span>
        <span className="text-right leading-tight">
          Official Ticket<br />Draw Info 1, 2024
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[13px] font-semibold">
        {rows.flat().map((n) => (
          <span
            key={n}
            className={`rounded-full py-0.5 ${circled.includes(n) ? "ring-2 ring-forest-700" : ""}`}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] tracking-widest text-black/50">
        <span>{drawId}</span>
        <span>PRICE £2.50</span>
      </div>
      <div className="mt-2 h-8 w-full bg-[repeating-linear-gradient(90deg,#2b2b26_0,#2b2b26_2px,transparent_2px,transparent_4px)]" />
    </div>
  );
}
