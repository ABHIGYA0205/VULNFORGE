"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Radar,
  Activity,
  FileText,
  History,
  Settings,
  Shield,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Scan",
    href: "/new-scan",
    icon: Radar,
  },
  {
    name: "Running",
    href: "/running",
    icon: Activity,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-zinc-950 text-white border-r border-zinc-800">

      <div className="flex items-center gap-3 p-6 border-b border-zinc-800">

        <Shield className="text-green-500" size={28} />

        <span className="text-2xl font-bold">
          VulnForge
        </span>

      </div>

      <nav className="mt-6 space-y-2">

        {items.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (

            <Link
              key={item.name}
              href={item.href}
              className={`mx-3 flex items-center gap-3 rounded-xl px-4 py-3 transition-all
              ${
                active
                  ? "bg-green-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >

              <Icon size={20} />

              <span>{item.name}</span>

            </Link>

          );

        })}

      </nav>

    </aside>
  );
}