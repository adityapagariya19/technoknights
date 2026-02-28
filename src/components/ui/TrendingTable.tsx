import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import { Users, TrendingUp } from "lucide-react";

interface TrendingToken {
    id: string;
    symbol: string;
    name: string;
    price: number;
    volChange: number;
    sentiment: number;
    sparkline: number[];
}

interface TrendingTableProps {
    tokens: TrendingToken[];
}

export const TrendingTable = ({ tokens }: TrendingTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
                <thead className="text-zinc-500 uppercase">
                    <tr>
                        <th className="px-6 py-3">Token</th>
                        <th className="px-6 py-3 text-right">Price</th>
                        <th className="px-6 py-3 text-right">24h</th>
                        <th className="px-6 py-3 text-right">Sentiment</th>
                        <th className="px-6 py-3 text-right w-48">7d Trend</th>
                    </tr>
                </thead>

                <tbody>
                    {tokens.map((token) => {
                        const isPositive =
                            token.sparkline[token.sparkline.length - 1] >=
                            token.sparkline[0];

                        const strokeColor = isPositive
                            ? "#10b981"
                            : "#ef4444";

                        const gradientId = `trendGrad-${token.id}`;

                        return (
                            <motion.tr
                                key={token.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="border-b border-[#1F2125]"
                            >
                                {/* Token */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Users size={16} />
                                        <div>
                                            <div className="font-medium text-white">
                                                {token.symbol}
                                            </div>
                                            <div className="text-zinc-500 text-xs">
                                                {token.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4 text-right font-mono">
                                    ${token.price}
                                </td>

                                {/* 24h Change */}
                                <td className="px-6 py-4">
                                    <div
                                        className={`flex items-center justify-end gap-1.5 font-medium ${
                                            token.volChange >= 0
                                                ? "text-emerald-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        <TrendingUp
                                            size={14}
                                            className={
                                                token.volChange < 0
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        />
                                        {token.volChange > 0 ? "+" : ""}
                                        {token.volChange.toFixed(1)}%
                                    </div>
                                </td>

                                {/* Sentiment */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <span className="text-zinc-300 font-mono text-sm w-8 text-right">
                                            {token.sentiment}%
                                        </span>

                                        <div className="w-24 h-1.5 bg-[#1A1B1E] rounded-full overflow-hidden border border-[#2A2B2E]">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${token.sentiment}%`,
                                                    backgroundColor:
                                                        token.sentiment > 70
                                                            ? "#10b981"
                                                            : token.sentiment >
                                                              40
                                                            ? "#fbbf24"
                                                            : "#ef4444",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </td>

                                {/* 7d Trend */}
                                <td className="px-6 py-2 w-48 h-16 pointer-events-none">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart
                                            data={token.sparkline.map(
                                                (val, i) => ({
                                                    time: i,
                                                    price: val,
                                                })
                                            )}
                                        >
                                            <defs>
                                                <linearGradient
                                                    id={gradientId}
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor={strokeColor}
                                                        stopOpacity={0.4}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor={strokeColor}
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <YAxis
                                                hide
                                                domain={[
                                                    "dataMin - dataMin * 0.05",
                                                    "dataMax + dataMax * 0.05",
                                                ]}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="price"
                                                stroke={strokeColor}
                                                fillOpacity={1}
                                                fill={`url(#${gradientId})`}
                                                strokeWidth={2}
                                                isAnimationActive={false}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
