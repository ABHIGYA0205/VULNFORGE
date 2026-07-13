type Props = {
  data: any;
};

export default function HttpCard({ data }: Props) {
  const rows = [
    { label: "Status", value: data.status },
    { label: "Title", value: data.title },
    { label: "Server", value: data.server },
    { label: "IP", value: data.ip },
    { label: "Response Time", value: data.response_time },
    { label: "Content Length", value: data.content_length },
    { label: "Content Type", value: data.content_type },
    { label: "CDN", value: data.cdn || "None" },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold">HTTP Information</h2>

      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between border-b border-zinc-800 pb-3"
          >
            <span className="text-zinc-400">{row.label}</span>
            <span className="font-medium text-white">
              {row.value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}