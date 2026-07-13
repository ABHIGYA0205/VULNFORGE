type Props = {
  vulnerabilities: any[];
};

export default function VulnerabilitiesCard({
  vulnerabilities,
}: Props) {

  if (!vulnerabilities || vulnerabilities.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Vulnerabilities
        </h2>

        <p className="text-zinc-400">
          No vulnerabilities detected.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Vulnerabilities
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-zinc-700">

            <th className="text-left py-3">Severity</th>

            <th className="text-left">Finding</th>

            <th className="text-left">Template</th>

          </tr>

        </thead>

        <tbody>

          {vulnerabilities.map((vuln: any, index: number) => {

  const severity = (vuln.severity || "unknown").toLowerCase();

  return (

    <tr
      key={index}
      className="border-b border-zinc-800"
    >

      <td className="py-3">

        <span
          className={
            severity === "critical"
              ? "text-red-600 font-bold"
              : severity === "high"
              ? "text-red-400 font-bold"
              : severity === "medium"
              ? "text-orange-400 font-bold"
              : severity === "low"
              ? "text-yellow-400 font-bold"
              : "text-blue-400 font-bold"
          }
        >
          {severity.toUpperCase()}
        </span>

      </td>

      <td>{vuln.name || vuln.template}</td>

      <td>{vuln.template || "-"}</td>

    </tr>

  );

})}

        </tbody>

      </table>

    </div>
  );
}