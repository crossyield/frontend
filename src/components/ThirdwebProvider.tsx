"use client";

export { ThirdwebProvider } from "@thirdweb-dev/react";

import {
  metamaskWallet,
  localWallet,
  embeddedWallet,
  smartWallet,
  walletConnect,
  SmartWalletConfigOptions,
} from "@thirdweb-dev/react";

const smartWalletOptions: SmartWalletConfigOptions = {
  factoryAddress: "0x9ae32F0650c658520b87416955940ED4aC22FDC7",
  gasless: true,
};

const embeddedSmartWalletConfig = smartWallet(
  embeddedWallet({
    auth: {
      options: ["email", "google", "apple", "facebook"],
    },
  }),
  smartWalletOptions
);

const localSmartWalletConfig = smartWallet(localWallet(), smartWalletOptions);

const metamaskSmartWalletConfig = smartWallet(
  metamaskWallet(),
  smartWalletOptions
);

// const metamaskSmartWalletConfig = metamaskWallet();

const walletConnectSmartWalletConfig = smartWallet(
  walletConnect(),
  smartWalletOptions
);

localSmartWalletConfig.meta.name = "Smart Wallet";
embeddedSmartWalletConfig.meta.name = "Embedded Wallet";

export {
  embeddedSmartWalletConfig,
  localSmartWalletConfig,
  metamaskSmartWalletConfig,
  walletConnectSmartWalletConfig,
};
