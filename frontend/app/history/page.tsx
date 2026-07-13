"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";
import api from "@/app/lib/api";

export default function HistoryPage() {

    const router = useRouter();

    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const res = await api.get("/history");

                setJobs(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchHistory();

    }, []);

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold mb-8">
                Scan History
            </h1>

            {jobs.length === 0 ? (

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">

                    <p className="text-zinc-400">
                        No completed scans yet.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {jobs.map(job => (

                        <div
                            key={job.id}
                            onClick={() => router.push(`/running/${job.id}`)}
                            className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-green-500 transition"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        {job.target}
                                    </h2>

                                    <p className="text-zinc-400 mt-2">
                                        Progress: {job.progress}%
                                    </p>

                                </div>

                                <span
                                    className={`rounded-lg px-4 py-2 font-semibold ${
                                        job.status === "completed"
                                            ? "bg-green-900 text-green-400"
                                            : "bg-red-900 text-red-400"
                                    }`}
                                >
                                    {job.status}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </MainLayout>

    );

}