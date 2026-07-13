type Props = {
  headers: Record<string, string | null>;
};

export default function HeadersCard({ headers }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold">
        Security Headers
      </h2>

      <div className="space-y-3">

        {Object.entries(headers).map(([key, value]) => (

          <div
            key={key}
            className="flex justify-between border-b border-zinc-800 pb-3"
          >

            <span>{key}</span>

            {value ? (
              <span className="text-green-400">
                Present
              </span>
            ) : (
              <span className="text-red-400">
                Missing
              </span>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}