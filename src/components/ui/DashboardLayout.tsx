import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: any;
  setActiveTab: (tab: any) => void;
  walletConnected: boolean;
  setWalletConnected: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function DashboardLayout({
  children,
  activeTab,
  setActiveTab,
  walletConnected,
  setWalletConnected,
  searchQuery,
  setSearchQuery,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-300 font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Main Content */}
      <main className="pl-64">
        <Header
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {children}
      </main>
    </div>
  );
}
