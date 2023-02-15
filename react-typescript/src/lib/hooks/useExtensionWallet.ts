import { useContext } from "react";
import { AppContext } from "@lib/contexts/AppContext";

export const useExtensionWallet = () => {
  const { Wallet } = useContext(AppContext);
  return Wallet.Extension;
};
