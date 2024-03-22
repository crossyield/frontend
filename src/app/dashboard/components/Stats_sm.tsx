import React from "react";

type StatsSmProps = {
  title: string;
  value: string;
};

const StatSm = ({ title, value }: StatsSmProps) => {
  return (
    <div className="stat flex flex-col items-center justify-center">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

const StatsSm = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="stats shadow justify-center items-center">{children}</div>
  );
};

export { StatsSm, StatSm };
