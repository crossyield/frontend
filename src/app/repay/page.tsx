"use client";
import React, { useEffect, useState } from "react";
import { StatSm } from "./components/Stats_sm";

//add hooks here

export default function Repay() {
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <h1 className="font-bold text-2xl">Repay Your Debts</h1>

      <div className="my-10 border rounded-xl border-slate-500 flex flex-col lg:flex-row p-10">
        <StatSm title="Total Debts" value="$500,000" />
        <StatSm title="Total Yield" value="$50,000" />
      </div>

      <div className="gap-4 flex flex-col lg:flex-row">
        {/* add additional components here */}
      </div>
    </main>
  );
}
