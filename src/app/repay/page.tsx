"use client";
import React, { useEffect, useState } from "react";
import Stats from "./components/Stats";
import { toast } from "react-toastify";
//add hooks here

export default function Repay() {
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);

  // example of using toast, can render if-else statements to render toast.success or toast.error
  const notify = () => toast.success("Repayment Successful!");

  return (
    <>
      <main className="flex flex-col items-center justify-between p-12">
        <h1 className="font-bold text-2xl">Self-Repaying Loans</h1>

        <div className="my-10 border rounded-xl border-slate-500 flex flex-col lg:flex-row p-10">
          <Stats
            title1="Total Loans"
            value1="0"
            desc1="Active"
            title2="Total Repaid"
            value2="0"
            desc2="Loans"
            title3="Total Repayments"
            value3="0"
            desc3="Made"
          />
        </div>

        <div className="gap-4 flex flex-col lg:flex-row">
          {/* add additional components here */}
          <button className="btn btn-primary" onClick={notify}>
            Repay
          </button>
        </div>
      </main>
    </>
  );
}
