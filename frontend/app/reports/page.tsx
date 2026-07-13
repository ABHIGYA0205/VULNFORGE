"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";
import api from "@/app/lib/api";

export default function ReportsPage() {

    const router = useRouter();

    const [reports, setReports] = useState<any[]>([]);

    const loadReports = async () => {
        const res = await api.get("/reports");
        setReports(res.data);
    };


    useEffect(() => {
    loadReports();
    }, []);

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold mb-8">
                Reports
            </h1>

            {reports.length === 0 ? (

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">

                    No reports available.

                </div>

            ) : (

                <div className="space-y-5">

                    {reports.map(report => (

                        <div
                            key={report.id}
                            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        {report.target}
                                    </h2>

                                    <p className="text-zinc-400 mt-2">
                                        {report.status}
                                    </p>

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => router.push(`/running/${report.id}`)}
                                        className="rounded-lg bg-green-600 px-4 py-2"
                                    >
                                        Open
                                    </button>

                                    <button
                                        onClick={() => {

                                            window.open(
                                                `http://localhost:8000/reports/${report.id}/json`,
                                                "_blank"
                                            );

                                        }}
                                        className="rounded-lg bg-zinc-700 px-4 py-2"
                                    >
                                        JSON
                                    </button>
                                    <div className="flex gap-3">


            <button
                onClick={async () => {

                    if (!confirm("Delete this report?"))
                        return;

                    await api.delete(`/reports/${report.id}`);

                    loadReports();

                }}
                className="rounded-lg bg-red-600 px-4 py-2"
            >
                Delete
            </button>

        </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </MainLayout>

    );

}