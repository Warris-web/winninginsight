export default function Pagination({ pagination, onPage }) {
  if (!pagination) return null;
  const page = Number(pagination.page || 1);
  const total = Math.max(1, Number(pagination.total_pages || 1));
  const rows = Number(pagination.total_rows || 0);
  if (!rows) return <p className="mt-6 text-sm text-ink/50">No records found.</p>;
  const btn = "rounded-md border border-[#AEBDB8] bg-[#E7EFEC] px-4 py-2 text-sm font-medium text-[#303A38] transition hover:bg-[#DCE7E2] disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/60">
      <span>Showing {pagination.start_row} to {pagination.end_row} of {rows}</span>
      <button className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
      <span className="font-semibold text-ink">Page {page} of {total}</span>
      <button className={btn} disabled={page >= total} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
