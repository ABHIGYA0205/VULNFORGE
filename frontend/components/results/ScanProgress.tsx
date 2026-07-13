type Props = {
  currentTool: string;
  progress: number;
};

const tools = [
  "Nmap",
  "WhatWeb",
  "HTTPX",
  "Headers",
  "FFUF",
  "Katana",
  "Nuclei",
];

export default function ScanProgress({
  currentTool,
  progress,
}: Props) {

  const currentIndex = tools.indexOf(currentTool);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          Scan Progress
        </h2>

        <span className="text-green-400 font-semibold">
          {progress}%
        </span>

      </div>

      <div className="space-y-4">

        {tools.map((tool, index) => {

          let icon = "⏳";
          let color = "text-zinc-500";

          if (index < currentIndex) {
            icon = "✅";
            color = "text-green-400";
          } else if (index === currentIndex) {
            icon = "🔄";
            color = "text-yellow-400";
          }

          if (currentTool === "Done") {
            icon = "✅";
            color = "text-green-400";
          }

          return (
            <div
              key={tool}
              className="flex justify-between items-center"
            >
              <span>{tool}</span>

              <span className={color}>
                {icon}
              </span>
            </div>
          );
        })}

      </div>

      <div className="mt-6 h-3 rounded-full bg-zinc-800">

        <div
          className="h-3 rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}