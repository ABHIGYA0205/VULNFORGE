"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import api from "@/app/lib/api";

export default function SettingsPage() {

    const [threads, setThreads] = useState(50);
    const [timeout, setTimeout] = useState(10);
    const [wordlist, setWordlist] = useState("common.txt");
    const [aiEnabled, setAiEnabled] = useState(true);

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res = await api.get("/settings");

            setThreads(res.data.threads);
            setTimeout(res.data.timeout);
            setWordlist(res.data.wordlist);
            setAiEnabled(res.data.ai_enabled);

        } catch (err) {

            console.error(err);

        }

    };

    const saveSettings = async () => {

        try {

            await api.put("/settings", {
                threads,
                timeout,
                wordlist,
                ai_enabled: aiEnabled,
            });

            alert("Settings Saved");

        } catch (err) {

            console.error(err);

            alert("Failed to save settings");

        }

    };

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold mb-8">
                Settings
            </h1>

            <div className="space-y-6 max-w-3xl">

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

                    <label className="block text-lg mb-3">
                        Scanner Threads
                    </label>

                    <input
                        type="number"
                        value={threads}
                        onChange={(e) => setThreads(Number(e.target.value))}
                        className="w-full rounded-lg bg-zinc-800 p-3"
                    />

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

                    <label className="block text-lg mb-3">
                        Timeout (seconds)
                    </label>

                    <input
                        type="number"
                        value={timeout}
                        onChange={(e) => setTimeout(Number(e.target.value))}
                        className="w-full rounded-lg bg-zinc-800 p-3"
                    />

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

                    <label className="block text-lg mb-3">
                        FFUF Wordlist
                    </label>

                    <select
                        value={wordlist}
                        onChange={(e) => setWordlist(e.target.value)}
                        className="w-full rounded-lg bg-zinc-800 p-3"
                    >
                        <option>common.txt</option>
                        <option>raft-small.txt</option>
                        <option>raft-medium.txt</option>
                        <option>directory-list-2.3-medium.txt</option>
                    </select>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex justify-between items-center">

                    <span className="text-lg">
                        AI Summary
                    </span>

                    <input
                        type="checkbox"
                        checked={aiEnabled}
                        onChange={() => setAiEnabled(!aiEnabled)}
                        className="h-5 w-5"
                    />

                </div>

                <button
                    onClick={saveSettings}
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
                >
                    Save Settings
                </button>

            </div>

        </MainLayout>

    );

}