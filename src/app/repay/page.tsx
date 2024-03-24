"use client";
import React, { useEffect, useState } from "react";
import Stats from "./components/Stats";
import { toast } from "react-toastify";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { useVault } from "@/components/ContractInteraction";
//add hooks here

export default function Repay() {
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);

  const { contract: Vault } = useVault(); 
      const { 
        data: repayData,
        isLoading: repayLoading,
        error: repayError,
      } = useContractRead(Vault, "getUserData");
      console.log(repayData);

let userTotalDebt = "Loading..."; // Default value or placeholder
let userTotalRepaid = "Loading..."; // Default value or placeholder
let userTotalYield = "Loading..."; // Default value or placeholder

//debt
if (repayData){
    let userDataArray = Object.entries(repayData);
    // Ensure that the index exists before trying to access it
    if (userDataArray.length > 8 && userDataArray[6]) {
        userTotalDebt = userDataArray[6][1] as string; // Type assertion to convert to string
    } else {
        userTotalDebt = "Unavailable"; // Placeholder if the data isn't available
    }
}

//repay
if (repayData){
  let userDataArray = Object.entries(repayData);
  // Ensure that the index exists before trying to access it
  if (userDataArray.length > 8 && userDataArray[9]) {
    userTotalRepaid = userDataArray[9][1] as string; // Type assertion to convert to string
    // get the userDataArray[6][1] and divide by 2
    userTotalRepaid = (userDataArray[9][1] as number / 2).toString(); // Convert the value to a string
  } else {
    userTotalRepaid = "Unavailable"; // Placeholder if the data isn't available
  }
}

//yield
if (repayData){
    let userDataArray = Object.entries(repayData);
    // Ensure that the index exists before trying to access it
    if (userDataArray.length > 8 && userDataArray[9]) {
        userTotalYield = userDataArray[9][1] as string; // Type assertion to convert to string
    } else {
        userTotalYield = "Unavailable"; // Placeholder if the data isn't available
    }
}
  return (
    <>
      <main className="flex flex-col items-center justify-between p-12">
        <h1 className="font-bold text-2xl">Self-Repaying Loans</h1>

        <div className="my-10 border rounded-xl border-slate-500 flex flex-col lg:flex-row p-10">
          <Stats
            title1="Total Loans"
            value1={userTotalDebt.toString()}
            desc1="Active"
            title2="Total Repaid"
            value2={userTotalRepaid.toString()}
            desc2="Loans"
            title3="Total Yield"
            value3={userTotalYield.toString()}
            desc3="Made"
          />
        </div>

        <div className="gap-4 flex flex-col lg:flex-row">
          {/* add additional components here */}
        </div>
      </main>
    </>
  );
}
