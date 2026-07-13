"use client";

type Props = {
  active: string;
  onChange: (tab: string) => void;
};

const tabs = [
  "Overview",
  "Ports",
  "Technologies",
  "HTTP",
  "Headers",
  "SSL",
  "Directories",
  "Endpoints",   
  "Vulnerabilities",
  "AI Summary"
];

export default function ResultTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-2">

      {tabs.map((tab) => (

        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-lg px-4 py-2 whitespace-nowrap transition ${
            active === tab
              ? "bg-green-600 text-white"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          {tab}
        </button>

      ))}

    </div>
  );
}