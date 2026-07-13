type Props = {
  host: string;
  ip: string;
  server: string;
  title: string;
  status: number;
  ports: number;
};

export default function OverviewCard({
  host,
  ip,
  server,
  title,
  status,
  ports,
}: Props) {
  const rows = [
    { label: "Host", value: host },
    { label: "IP", value: ip },
    { label: "Server", value: server },
    { label: "Title", value: title },
    { label: "HTTP Status", value: status },
    { label: "Open Ports", value: ports },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Overview
      </h2>

      <div className="space-y-4">

        {rows.map((row) => (

          <div
            key={row.label}
            className="flex justify-between border-b border-zinc-800 pb-3"
          >

            <span className="text-zinc-400">
              {row.label}
            </span>

            <span className="text-white font-medium">
              {row.value || "-"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}