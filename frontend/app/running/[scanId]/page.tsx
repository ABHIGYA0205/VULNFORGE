"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";
import OverviewCard from "@/components/results/OverviewCard";
import PortsTable from "@/components/results/PortsTable";
import ResultTabs from "@/components/results/ResultTabs";
import TechnologiesCard from "@/components/results/TechnologiesCard";
import HttpCard from "@/components/results/HttpCard";
import HeadersCard from "@/components/results/HeadersCard";
import DirectoriesCard from "@/components/results/DirectoriesCard";
import VulnerabilitiesCard from "@/components/results/VulnerabilitiesCard";
import EndpointsCard from "@/components/results/EndpointsCard";
import ScanProgress from "@/components/results/ScanProgress";
import AISummaryCard from "@/components/results/AISummaryCard";
import api from "../../lib/api";
import SSLCard from "@/components/results/SSLCard";

export default function RunningPage() {
  const { scanId } = useParams();

  const [job, setJob] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Overview");


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/scan/${scanId}`);
        setJob(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchJob();

    const interval = setInterval(fetchJob, 1000);

    return () => clearInterval(interval);
  }, [scanId]);

  if (!job) {
    return (
      <MainLayout>
        <h1 className="text-3xl">Loading...</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold">Running Scan</h1>

      {/* Progress Card */}

      <div className="mt-8">
        <ScanProgress
          currentTool={job.current_tool}
          progress={job.progress}
        />
      </div>

      {/* Results */}



      <div className="mt-8">

        <ResultTabs
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6">

          {/* Overview */}

          {activeTab === "Overview" && (

            job.results?.nmap ? (

              <OverviewCard
                host={job.target}
                ip={job.results.whatweb?.ip || job.results.httpx?.ip || "-"}
                server={job.results.whatweb?.server || job.results.httpx?.server || "-"}
                title={job.results.whatweb?.title || job.results.httpx?.title || "-"}
                status={job.results.httpx?.status || job.results.whatweb?.status || "-"}
                ports={job.results.nmap?.ports?.length || 0}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-zinc-400">
                  Nmap is scanning...
                </p>
              </div>

            )

          )}

          {/* Ports */}

          {activeTab === "Ports" && (

            job.results?.nmap ? (

              <PortsTable ports={job.results.nmap.ports} />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Ports</h2>
                <p className="text-zinc-400">
                  Nmap is scanning...
                </p>
              </div>

            )

          )}

          {/* Technologies */}

          {activeTab === "Technologies" && (

            job.results?.whatweb ? (

              <TechnologiesCard
                technologies={job.results.whatweb.technologies || []}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
                <p className="text-zinc-400">
                  WhatWeb is analyzing technologies...
                </p>
              </div>

            )

          )}

          {/* HTTP */}

          {activeTab === "HTTP" && (

            job.results?.httpx ? (

              <HttpCard data={job.results.httpx} />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">HTTP</h2>
                <p className="text-zinc-400">
                  HTTPX is collecting HTTP information...
                </p>
              </div>

            )

          )}

          {/* Headers */}

          {activeTab === "Headers" && (

            job.results?.headers ? (

              <HeadersCard headers={job.results.headers} />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Headers</h2>
                <p className="text-zinc-400">
                  Checking security headers...
                </p>
              </div>

            )

          )}
          {activeTab === "AI Summary" && (

            <AISummaryCard
              summary={job.results?.summary}
            />

          )}

          {/* SSL */}

          {activeTab === "SSL" && (

            job.results?.ssl ? (

              <SSLCard
                data={job.results.ssl}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

                <h2 className="text-2xl font-semibold mb-4">
                  SSL
                </h2>

                <p className="text-zinc-400">
                  SSLScan is analyzing the certificate...
                </p>

              </div>

            )

          )}

          {/* Endpoints */}

          {activeTab === "Endpoints" && (

            job.results?.endpoints ? (

              <EndpointsCard
                endpoints={job.results.endpoints}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
                <p className="text-zinc-400">
                  Katana is crawling the website...
                </p>
              </div>

            )

          )}

          {/* Directories */}

          {activeTab === "Directories" && (

            job.results?.directories ? (

              <DirectoriesCard
                directories={job.results.directories}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">Directories</h2>
                <p className="text-zinc-400">
                  FFUF is discovering directories...
                </p>
              </div>

            )

          )}

          {/* Vulnerabilities */}

          {activeTab === "Vulnerabilities" && (

            job.results?.vulnerabilities ? (

              <VulnerabilitiesCard
                vulnerabilities={job.results.vulnerabilities}
              />

            ) : (

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Vulnerabilities
                </h2>

                <p className="text-zinc-400">
                  Nuclei is scanning for vulnerabilities...
                </p>
              </div>

            )

          )}


        </div>

      </div>

    </MainLayout>
  );
}