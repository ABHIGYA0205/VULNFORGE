type Props = {
    data: any;
};

export default function SSLCard({ data }: Props) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="text-2xl font-semibold mb-6">
                SSL Certificate
            </h2>

            <div className="space-y-4">

                <div>
                    <p className="text-zinc-400">Subject</p>
                    <p>{data.subject || "-"}</p>
                </div>

                <div>
                    <p className="text-zinc-400">Issuer</p>
                    <p>{data.issuer || "-"}</p>
                </div>

                <div>
                    <p className="text-zinc-400">Expires</p>
                    <p>{data.expires || "-"}</p>
                </div>

                <div>

                    <p className="text-zinc-400 mb-2">
                        Supported Protocols
                    </p>

                    <div className="space-y-2">

                        {(data.protocols || []).map((p: string, i: number) => (

                            <div
                                key={i}
                                className="rounded bg-zinc-800 p-2 font-mono text-sm"
                            >
                                {p}
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}