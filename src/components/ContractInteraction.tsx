import { useContract } from "@thirdweb-dev/react";

export const useVault = () => {
  return useContract("0x86e3469212d175CBD16438A94e5d4A69A64ddf32", "Vault");
};
