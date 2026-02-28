import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Activity, TrendingUp, Settings } from "lucide-react";

export type TabType = "dashboard" | "activity" | "trending" | "settings";

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

const tabs: { id: TabType; icon: React.ElementType }[] = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "activity", icon: Activity },
  { id: "trending", icon: TrendingUp },
  { id: "settings", icon: Settings },
];

export default function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0B] border-r border-[#141414] p-6">
      <nav className="flex flex-col gap-4">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChangeTab(id)}
            className={`p-3 rounded-xl transition-all ${
              activeTab === id
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-zinc-600 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>
    </aside>
  );
}
