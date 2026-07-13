type Props = {
  summary: any;
};

export default function AISummaryCard({ summary }: Props) {
  if (!summary) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-2xl font-semibold">
          AI Security Summary
        </h2>

        <p className="text-zinc-400">
          AI is generating the report...
        </p>
      </div>
    );
  }

  const color =
    summary.risk === "High"
      ? "bg-red-900 text-red-400"
      : summary.risk === "Medium"
      ? "bg-yellow-900 text-yellow-400"
      : "bg-green-900 text-green-400";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold">
        AI Security Summary
      </h2>

      <span className={`rounded-lg px-4 py-2 font-semibold ${color}`}>
        {summary.risk} Risk
      </span>

      <div className="mt-6 whitespace-pre-wrap text-zinc-300 leading-8">
        {summary.summary}
      </div>

    </div>
  );
}