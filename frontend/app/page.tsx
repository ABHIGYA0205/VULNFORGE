import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/ui/StatCard";
import {
  Activity,
  ShieldAlert,
  ScanSearch,
  Server,
} from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Welcome back. Your vulnerability scanner is ready.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Scans"
            value="0"
          />

          <StatCard
            title="Running"
            value="0"
          />

          <StatCard
            title="Findings"
            value="0"
          />

          <StatCard
            title="Critical"
            value="0"
          />

        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Scanner Status */}

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-xl font-semibold text-white">
              Scanner Status
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Server className="text-green-500" />

                  <span className="text-zinc-300">
                    Docker
                  </span>

                </div>

                <span className="text-green-500">
                  Online
                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <ScanSearch className="text-yellow-500" />

                  <span className="text-zinc-300">
                    Nmap
                  </span>

                </div>

                <span className="text-zinc-400">
                  Idle
                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Activity className="text-blue-500" />

                  <span className="text-zinc-300">
                    Nuclei
                  </span>

                </div>

                <span className="text-zinc-400">
                  Idle
                </span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <ShieldAlert className="text-red-500" />

                  <span className="text-zinc-300">
                    SQLMap
                  </span>

                </div>

                <span className="text-zinc-400">
                  Idle
                </span>

              </div>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-xl font-semibold text-white">
              Recent Activity
            </h2>

            <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-zinc-700">

              <div className="text-center">

                <ScanSearch
                  size={48}
                  className="mx-auto text-zinc-600"
                />

                <p className="mt-4 text-lg text-zinc-400">
                  No scans yet
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Start your first scan from the New Scan page.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}