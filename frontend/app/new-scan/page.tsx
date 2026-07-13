"use client";

import { useState, } from "react";
import MainLayout from "@/components/layout/MainLayout";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import {
    Globe,
    Play,
    ScanSearch,
    Shield,
} from "lucide-react";

export default function ScanPage() {

    const router = useRouter();
    const [target, setTarget] = useState("");
    const [profile, setProfile] = useState("quick");
    const [loading, setLoading] = useState(false);

    async function startScan() {
        if (!target.trim()) {
            alert("Please enter a target.");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/scan", {
                target,
                profile,
            });

            console.log(res.data);

            router.push(`/running/${res.data.scan_id}`);
        } catch (err) {
            console.error(err);
            alert("Unable to start scan.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}

                <div>
                    <h1 className="text-4xl font-bold text-white">
                        New Scan
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Launch a vulnerability assessment against your authorized target.
                    </p>
                </div>

                {/* Main Card */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                    {/* Target */}

                    <div>

                        <label className="flex items-center gap-2 text-zinc-300 font-semibold">

                            <Globe size={18} />

                            Target URL / IP

                        </label>

                        <input
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="http://localhost:3000"
                            className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-4 text-white outline-none focus:border-green-500"
                        />

                    </div>

                    {/* Profiles */}

                    <div className="mt-10">

                        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">

                            <Shield size={18} />

                            Scan Profile

                        </h2>

                        <div className="grid md:grid-cols-3 gap-5 mt-5">

                            <button
                                onClick={() => setProfile("quick")}
                                className={`rounded-xl border p-5 text-left transition ${profile === "quick"
                                        ? "border-green-500 bg-green-500/10"
                                        : "border-zinc-700 bg-zinc-950 hover:border-green-500"
                                    }`}
                            >
                                <h3 className="font-semibold text-white">
                                    Quick Scan
                                </h3>

                                <p className="mt-2 text-sm text-zinc-400">
                                    Fast reconnaissance using Nmap and WhatWeb.
                                </p>
                            </button>

                            <button
                                onClick={() => setProfile("full")}
                                className={`rounded-xl border p-5 text-left transition ${profile === "full"
                                        ? "border-green-500 bg-green-500/10"
                                        : "border-zinc-700 bg-zinc-950 hover:border-green-500"
                                    }`}
                            >
                                <h3 className="font-semibold text-white">
                                    Full Scan
                                </h3>

                                <p className="mt-2 text-sm text-zinc-400">
                                    Runs all enabled scanners and generates a report.
                                </p>
                            </button>

                            <button
                                onClick={() => setProfile("custom")}
                                className={`rounded-xl border p-5 text-left transition ${profile === "custom"
                                        ? "border-green-500 bg-green-500/10"
                                        : "border-zinc-700 bg-zinc-950 hover:border-green-500"
                                    }`}
                            >
                                <h3 className="font-semibold text-white">
                                    Custom
                                </h3>

                                <p className="mt-2 text-sm text-zinc-400">
                                    Choose exactly which scanners to execute.
                                </p>
                            </button>

                        </div>

                    </div>

                    {/* Button */}

                    <button
                        onClick={startScan}
                        disabled={loading}
                        className="mt-10 flex items-center gap-3 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                    >
                        <Play size={18} />

                        {loading ? "Starting Scan..." : "Start Scan"}
                    </button>

                </div>

                {/* Information */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                    <div className="flex items-center gap-3">

                        <ScanSearch className="text-green-500" />

                        <h2 className="text-xl font-semibold text-white">
                            Scan Information
                        </h2>

                    </div>

                    <ul className="mt-5 space-y-3 text-zinc-400">

                        <li>• The scan runs only against targets you specify.</li>

                        <li>• Results are stored locally.</li>

                        <li>• Docker will execute the scanner environment.</li>

                        <li>• Reports can be exported after completion.</li>

                    </ul>

                </div>

            </div>
        </MainLayout>
    );
}