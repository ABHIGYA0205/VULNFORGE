"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import api from "../lib/api";

export default function DashboardPage() {

  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await api.get("/dashboard");

        setDashboard(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchDashboard();

  }, []);

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-xl bg-zinc-900 p-6 border border-zinc-800">

          <p className="text-zinc-400">
            Total Scans
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {dashboard?.total ?? 0}
          </h2>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6 border border-zinc-800">

          <p className="text-zinc-400">
            Running
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-400">
            {dashboard?.running ?? 0}
          </h2>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6 border border-zinc-800">

          <p className="text-zinc-400">
            Completed
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-400">
            {dashboard?.completed ?? 0}
          </h2>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6 border border-zinc-800">

          <p className="text-zinc-400">
            Critical
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-500">
            {dashboard?.critical ?? 0}
          </h2>

        </div>

      </div>

      {/* Recent Scans */}

      <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Scans
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800">

              <th className="text-left py-3">
                Target
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Progress
              </th>

            </tr>

          </thead>

          <tbody>

            {dashboard?.recent?.length ? (

              dashboard.recent.map((scan: any) => (

                <tr
                  key={scan.id}
                  className="border-b border-zinc-800"
                >

                  <td className="py-4">
                    {scan.target}
                  </td>

                  <td>

                    <span
                      className={
                        scan.status === "completed"
                          ? "text-green-400"
                          : scan.status === "running"
                          ? "text-blue-400"
                          : "text-red-400"
                      }
                    >
                      {scan.status}
                    </span>

                  </td>

                  <td>

                    {scan.progress}%

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={3}
                  className="py-8 text-center text-zinc-400"
                >

                  No scans yet.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}