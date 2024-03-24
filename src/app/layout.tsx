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
  ScrollSepoliaTestnet,
  ThundercoreTestnet,
  OpSepoliaTestnet,
  PolygonZkevmCardonaTestnet,
  Sepolia
} from "@thirdweb-dev/chains";
import Header from "@/components/Header";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            Sepolia,
            LineaTestnet,
            ScrollSepoliaTestnet,
            PolygonZkevmCardonaTestnet,
            ThundercoreTestnet,
            OpSepoliaTestnet,
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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
