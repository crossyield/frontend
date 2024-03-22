import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ThirdwebProvider,
  embeddedSmartWalletConfig,
  localSmartWalletConfig,
  metamaskSmartWalletConfig,
  walletConnectSmartWalletConfig,
} from "../components/ThirdwebProvider";
import {
  LineaTestnet,
  Mumbai,
  OptimismGoerli,
  ScrollSepoliaTestnet,
  ThundercoreTestnet,
} from "@thirdweb-dev/chains";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrossYield",
  description: "Self-Repaying Loans with Cross-Chain Collateralization",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
    { rel: "favicon", url: "favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          supportedChains={[
            LineaTestnet,
            Mumbai,
            OptimismGoerli,
            ScrollSepoliaTestnet,
            ThundercoreTestnet,
          ]}
          theme={"dark"}
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
          autoConnect={true}
          supportedWallets={[
            localSmartWalletConfig,
            embeddedSmartWalletConfig,
            metamaskSmartWalletConfig,
            walletConnectSmartWalletConfig,
          ]}
        >
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
