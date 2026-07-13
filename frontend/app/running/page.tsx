"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";
import api from "@/app/lib/api";

export default function RunningPage() {

    const router = useRouter();

    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const res = await api.get("/running");

                setJobs(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchJobs();

        const interval = setInterval(fetchJobs, 1000);

        return () => clearInterval(interval);

    }, []);

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold mb-8">
                Running Scans
            </h1>

            {jobs.length === 0 ? (

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">

                    <p className="text-zinc-400">
                        No running scans.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {jobs.map(job => (

                        <div
                            key={job.id}
                            onClick={() => router.push(`/running/${job.id}`)}
                            className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-green-500 transition"
                        >

                            <div className="flex justify-between">

                                <h2 className="text-2xl font-semibold">
                                    {job.target}
                                </h2>

                                <span className="text-green-400">
                                    {job.progress}%
                                </span>

                            </div>

                            <p className="mt-3 text-zinc-400">
                                Current Tool: {job.current_tool}
                            </p>

                            <div className="mt-5 h-3 rounded bg-zinc-800">

                                <div
                                    className="h-3 rounded bg-green-500 transition-all"
                                    style={{
                                        width: `${job.progress}%`
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </MainLayout>

    );

}