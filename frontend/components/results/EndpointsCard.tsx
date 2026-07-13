type Props = {
  endpoints: any[];
};

export default function EndpointsCard({ endpoints }: Props) {

  return (

    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Discovered Endpoints
      </h2>

      {endpoints.length === 0 ? (

        <p className="text-zinc-400">
          No endpoints found.
        </p>

      ) : (

        <div className="space-y-2">

          {endpoints.map((item: any, index: number) => (

            <div
              key={index}
              className="rounded-lg bg-zinc-800 px-4 py-3 font-mono text-sm break-all"
            >
              {item.url}
            </div>

          ))}

        </div>

      )}

    </div>

  );

}