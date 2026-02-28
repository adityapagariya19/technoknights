import React from "react";
import { Card } from "./Card"; // Correct import of your Card component

interface StatCardProps {
  title: string;
  value: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card className="p-4">
    <div>
      <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
        {title}
      </p>
      <h3 className="text-2xl font-bold text-white tracking-tight">
        {value}
      </h3>
    </div>
  </Card>
);
