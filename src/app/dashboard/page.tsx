"use client"
import Stats from "./components/Stats";
import Card from "./components/Card";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";

import DisclaimerModal from "./components/DisclamerModal";

export default function Dashboard() {

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <DisclaimerModal
        title="⚠️ Disclaimer"
        description="At CrossYield, we prioritize security through a multitude of measures, including audits, real-time monitoring and robust security protocols. Despite these efforts, it's important to recognize that yield farming entails a level of risk due to potential undiscovered vulnerabilities. Exercise caution and engage only with funds that you can afford to lose. This message is not financial advice."
      />
      <Stats
        title1="Total Deposits"
        value1="$1,000,000"
        desc1="Total value of assets locked in vaults"
        title2="Total Debts"
        value2="$500,000"
        desc2="Total value of debts owed"
        title3="Total Yield"
        value3="$50,000"
        desc3="Total value of yield generated"
      />
      <div className="flex flex-col md:flex-row gap-4 my-10">
        <Card
          title="WETH"
          description="Deposit your assets into the vaults"
          imageUrl="/weth.jpeg"
          statsTitle="Current Projected Yield"
          statsValue="15%"
        />
        {/* CC YUDHISH & YEECHIAN: Can add another strategy here, just uncomment the component below */}
        {/* <Card
          title="DAI"
          description="Deposit your assets into the vaults"
          imageUrl="/dai.jpeg"
          buttonLabel="View Information"
          statsTitle="Current Projected Yield"
          statsValue="6%"
          url="/vaults"
        /> */}
      </div>
    </main>
  );
}
