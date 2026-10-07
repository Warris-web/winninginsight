import AppLayout from "../components/AppLayout";

export default function Terms() {
  return (
    <AppLayout title="Terms and Conditions" subtitle="Please read these terms carefully.">
      <div className="max-w-3xl space-y-4 leading-relaxed text-ink/75">
        <p>Winning Insight provides prediction pools only. Predictions are not guaranteed winning numbers. Play responsibly and only with money you can afford to lose.</p>
        {/* TODO: paste the full legal text from your existing terms.html here */}
      </div>
    </AppLayout>
  );
}
