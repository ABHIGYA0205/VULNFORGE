type Port = {
    port: number;
    protocol: string;
    service: string;
    state: string;
};

type Props = {
    ports: Port[];
};

export default function PortsTable({
    ports
}: Props) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="text-xl font-semibold mb-6">

                Open Ports

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b border-zinc-700">

                        <th className="pb-3">Port</th>

                        <th>Protocol</th>

                        <th>Service</th>

                        <th>State</th>

                    </tr>

                </thead>

                <tbody>

                    {ports.map((port) => (

                        <tr
                            key={port.port}
                            className="border-b border-zinc-800"
                        >

                            <td className="py-4">
                                {port.port}
                            </td>

                            <td>
                                {port.protocol}
                            </td>

                            <td>
                                {port.service}
                            </td>

                            <td>

                                <span className="rounded bg-green-600 px-3 py-1">

                                    {port.state}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}