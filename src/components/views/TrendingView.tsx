import React, { useState } from "react";
import { GainersLosersGrid, GainerLoser } from "../ui/GainersLosersGrid";
import { SettingsSection } from "../ui/SettingsComponents";
import { Wallet } from "lucide-react";
import { Card } from "../ui/Card";
import { TrendingTable } from "../ui/TrendingTable";

/* -------------------------------------------------------------------------- */
/*                               Settings View                                */
/* -------------------------------------------------------------------------- */

export const SettingsView = () => {
    const [slippage, setSlippage] = useState("0.5%");
    const [gasPriority, setGasPriority] = useState("Fast");
    const [twoFactor, setTwoFactor] = useState(false);
    const [timeout, setTimeoutVal] = useState("1h");
    const [theme, setTheme] = useState("Dark");
    const [desktopNotifs, setDesktopNotifs] = useState(true);

    return (
        <div className="p-8 max-w-4xl mx-auto flex flex-col gap-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                    Settings
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                    Manage your terminal preferences and account security
                </p>
            </div>

            <SettingsSection
                title="Wallet & Network"
                description="Manage your connected wallet and active network."
            >
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                            <Wallet size={24} />
                        </div>

                        <div>
                            <div className="text-sm font-medium text-white mb-1">
                                Connected Address
                            </div>

                            <div className="text-xs font-mono text-zinc-400 bg-[#1A1B1E] px-3 py-1.5 rounded-md border border-[#2A2B2E] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                0x71...3F4B
                            </div>
                        </div>
                    </div>
                </div>
            </SettingsSection>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                           Sparkline Generator                              */
/* -------------------------------------------------------------------------- */

const generateSparkline = (
    trend: "up" | "down" | "flat"
): number[] => {
    let current = 100;

    return Array.from({ length: 20 }).map(() => {
        const change = (Math.random() - 0.5) * 10;
        const direction =
            trend === "up" ? 2 :
            trend === "down" ? -2 :
            0;

        current = current + change + direction;

        return Math.max(0, current);
    });
};

/* -------------------------------------------------------------------------- */
/*                              Types Definition                              */
/* -------------------------------------------------------------------------- */

type TrendingToken = {
    id: string;
    symbol: string;
    name: string;
    price: number;
    volChange: number;
    sentiment: number;
    sparkline: number[];
};

/* -------------------------------------------------------------------------- */
/*                             Mock Trending Data                             */
/* -------------------------------------------------------------------------- */

const MOCK_TRENDING_TOKENS: TrendingToken[] = [
    { id: "t1", symbol: "SOL", name: "Solana", price: 145.2, volChange: 45.2, sentiment: 88, sparkline: generateSparkline("up") },
    { id: "t2", symbol: "DOGE", name: "Dogecoin", price: 0.154, volChange: 124.5, sentiment: 92, sparkline: generateSparkline("up") },
    { id: "t3", symbol: "LINK", name: "Chainlink", price: 18.4, volChange: 12.4, sentiment: 65, sparkline: generateSparkline("flat") },
    { id: "t4", symbol: "ARB", name: "Arbitrum", price: 1.15, volChange: -15.4, sentiment: 45, sparkline: generateSparkline("down") },
    { id: "t5", symbol: "AVAX", name: "Avalanche", price: 38.5, volChange: 5.2, sentiment: 58, sparkline: generateSparkline("up") },
    { id: "t6", symbol: "TON", name: "Toncoin", price: 6.8, volChange: 84.1, sentiment: 75, sparkline: generateSparkline("up") },
];

/* -------------------------------------------------------------------------- */
/*                       Dummy Gainers & Losers (Required)                    */
/* -------------------------------------------------------------------------- */

const MOCK_GAINERS: GainerLoser[] = [];
const MOCK_LOSERS: GainerLoser[] = [];

/* -------------------------------------------------------------------------- */
/*                               Trending View                                */
/* -------------------------------------------------------------------------- */

export const TrendingView = () => {
    const [sortField, setSortField] =
        useState<"volChange" | "sentiment">("volChange");

    const sortedTokens = [...MOCK_TRENDING_TOKENS].sort(
        (a, b) => b[sortField] - a[sortField]
    );

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[400px]">

                <GainersLosersGrid
                    gainers={MOCK_GAINERS}
                    losers={MOCK_LOSERS}
                />

                <Card>
                    <TrendingTable tokens={sortedTokens} />
                </Card>

            </div>
        </div>
    );
};
