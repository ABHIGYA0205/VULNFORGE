type Props = {
  directories: any[];
};

export default function DirectoriesCard({
  directories,
}: Props) {

  if (!directories || directories.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Directories
        </h2>

        <p className="text-zinc-400">
          No directories discovered.
        </p>
      </div>
    );
  }

  const grouped = directories.reduce((acc: any, dir: any) => {

    const key = dir.status;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(dir);

    return acc;

  }, {});

  const order = [200, 201, 204, 401, 403, 500, 301, 302, 307, 308];

  const sortedStatuses = Object.keys(grouped).sort((a, b) => {

    const ia = order.indexOf(Number(a));
    const ib = order.indexOf(Number(b));

    if (ia === -1 && ib === -1) return Number(a) - Number(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;

    return ia - ib;

  });

  const getTitle = (status: number) => {

    switch (status) {

      case 200:
        return "🟢 200 OK";

      case 201:
        return "🟢 201 Created";

      case 204:
        return "🟢 204 No Content";

      case 301:
        return "🟡 301 Redirects";

      case 302:
        return "🟡 302 Redirects";

      case 307:
        return "🟡 307 Redirects";

      case 308:
        return "🟡 308 Redirects";

      case 401:
        return "🟠 401 Unauthorized";

      case 403:
        return "🔴 403 Forbidden";

      case 500:
        return "🔥 500 Server Error";

      default:
        return `${status}`;
    }

  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Directories
      </h2>

      <div className="space-y-5">

        {sortedStatuses.map((status) => {

          const items = grouped[status];

          return (

            <details
              key={status}
              open={
                status !== "301" &&
                status !== "302" &&
                status !== "307" &&
                status !== "308"
              }
              className="rounded-lg border border-zinc-800 overflow-hidden"
            >

              <summary className="cursor-pointer bg-zinc-800 px-5 py-4 font-semibold">

                {getTitle(Number(status))} ({items.length})

              </summary>

              <table className="w-full">

                <thead className="bg-zinc-900">

                  <tr className="border-b border-zinc-800">

                    <th className="text-left px-5 py-3">
                      Path
                    </th>

                    <th className="text-left">
                      Status
                    </th>

                    <th className="text-left">
                      Size
                    </th>

                    <th className="text-left">
                      Words
                    </th>

                    <th className="text-left">
                      Lines
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {items.map((dir: any, index: number) => (

                    <tr
                      key={`${dir.path}-${index}`}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40"
                    >

                      <td className="px-5 py-3 font-mono">
                        /{dir.path}
                      </td>

                      <td>

                        <span
                          className={
                            dir.status === 200
                              ? "text-green-400 font-semibold"
                              : dir.status === 301 ||
                                dir.status === 302 ||
                                dir.status === 307 ||
                                dir.status === 308
                              ? "text-yellow-400 font-semibold"
                              : dir.status === 403
                              ? "text-red-400 font-semibold"
                              : dir.status === 401
                              ? "text-orange-400 font-semibold"
                              : dir.status >= 500
                              ? "text-red-500 font-semibold"
                              : "text-blue-400 font-semibold"
                          }
                        >
                          {dir.status}
                        </span>

                      </td>

                      <td>{dir.size}</td>

                      <td>{dir.words}</td>

                      <td>{dir.lines}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </details>

          );

        })}

      </div>

    </div>
  );
}