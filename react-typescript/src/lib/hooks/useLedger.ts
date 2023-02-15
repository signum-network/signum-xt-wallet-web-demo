import { useMemo } from "react";
import { LedgerClientFactory } from "@signumjs/core";
import { selectWalletNodeHost } from "@lib/states/walletState";
import { useAppSelector } from "./useAppSelector";

export const useLedger = () => {
  const nodeHost = useAppSelector(selectWalletNodeHost);

  return useMemo(() => {
    if (!nodeHost) return null;
    console.debug("Connected to new host", nodeHost);
    return LedgerClientFactory.createClient({ nodeHost });
  }, [nodeHost]);
};
