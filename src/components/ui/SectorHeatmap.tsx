import React from "react";
import { motion } from "motion/react";

export interface Sector {
  id: string;
  name: string;
  marketCap: number;
  change: number;
}

interface SectorHeatmapProps {
  sectors: Sector[];
}

export const SectorHeatmap: React.FC<SectorHeatmapProps> = ({ sectors }) => {
  // Layout classes to vary size of heatmap blocks
  const layoutStyles = ["col-span-2 row-span-1", "col-span-3 row-span-2", "col-span-4 row-span-1"];

  return (
    <div className="grid grid-cols-6 gap-4 h-full">
      {sectors.map((sector, index) => {
        const styleClass = layoutStyles[index % layoutStyles.length];

        const isPositive = sector.change >= 0;
        const percentage = Math.abs(sector.change);

        // Set background color based on performance
        const bgColorStyle = isPositive ? "bg-emerald-800" : "bg-red-800";

        return (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${styleClass}`}
            style={{ backgroundColor: bgColorStyle }}
          >
            {/* Inner border overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-white/20 transition-colors z-10" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
              <div className="text-white/90 font-bold group-hover:text-white transition-colors truncate">
                {sector.name}
              </div>

              <div>
                <div className="text-white/60 text-xs font-mono mb-0.5 truncate">
                  ${(sector.marketCap / 1e9).toFixed(1)}B
                </div>
                <div
                  className={`font-mono font-bold text-sm ${
                    isPositive ? "text-emerald-100" : "text-red-100"
                  }`}
                >
                  {isPositive ? "+" : "-"}
                  {percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
