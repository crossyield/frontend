"use client";
import Stats from "./components/Stats";
import Card from "./components/Card";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { useVault } from "@/components/ContractInteraction";
import DisclaimerModal from "./components/DisclamerModal";

export default function Dashboard() {
    const { contract: Vault } = useVault(); 
      const { 
        data: userData,
        isLoading: totalDepositsLoading,
        error: totalDepositsError,
      } = useContractRead(Vault, "getUserData");
      console.log(userData);

let userTotalCollateral = "Loading..."; // Default value or placeholder
let userTotalDebt = "Loading..."; // Default value or placeholder
let userTotalYield = "Loading..."; // Default value or placeholder


//debt
if (userData){
    let userDataArray = Object.entries(userData);
    // Ensure that the index exists before trying to access it
    if (userDataArray.length > 8 && userDataArray[6]) {
        userTotalDebt = userDataArray[6][1] as string; // Type assertion to convert to string
    } else {
        userTotalDebt = "Unavailable"; // Placeholder if the data isn't available
    }

}
//collateral
if (userData) {
    let userDataArray = Object.entries(userData);
    // Ensure that the index exists before trying to access it
    if (userDataArray.length > 8 && userDataArray[8]) {
        userTotalCollateral = userDataArray[8][1] as string; // Type assertion to convert to string
    } else {
        userTotalCollateral = "Unavailable"; // Placeholder if the data isn't available
    }

}


// yield
if (userData){
    let userDataArray = Object.entries(userData);
    // Ensure that the index exists before trying to access it
    if (userDataArray.length > 8 && userDataArray[9]) {
        userTotalYield = userDataArray[9][1] as string; // Type assertion to convert to string
    } else {
        userTotalYield = "Unavailable"; // Placeholder if the data isn't available
    }
}

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <DisclaimerModal
        title="⚠️ Disclaimer"
        description="At CrossYield, we prioritize security through a multitude of measures, including audits, real-time monitoring and robust security protocols. Despite these efforts, it's important to recognize that yield farming entails a level of risk due to potential undiscovered vulnerabilities. Exercise caution and engage only with funds that you can afford to lose. This message is not financial advice."
      />
    <Stats
        title1="Total Deposits"
        value1={userTotalCollateral.toString()}
        desc1="Total value of assets locked in vaults"
        title2="Total Debts"
        value2={userTotalDebt.toString()}
        desc2="Total value of debts owed"
        title3="Total Yield"
        value3={userTotalYield.toString()}
        desc3="Total value of yield generated"
    />
      <div className="flex flex-col md:flex-row gap-4 my-10">
        <Card
          title="WETH"
          description="Deposit your assets into the vaults"
          imageUrl="/vault.png"
          statsTitle="Current Projected Yield"
          statsValue="15%"
        />
      </div>
    </main>
  );
}
