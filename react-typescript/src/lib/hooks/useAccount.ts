import { useMemo } from "react";
import { Address } from "@signumjs/core";
import { useAppContext } from "@lib/hooks/useAppContext";
import { useAppSelector } from "@lib/hooks/useAppSelector";
import { selectWalletState } from "@lib/states/walletState";

interface AccountData {
  accountId: string;
  accountRS: string;
  publicKey: string;
  isWatchOnlyMode: boolean;
}

const InitialAccountData: AccountData = {
  accountId: "",
  accountRS: "",
  publicKey: "",
  isWatchOnlyMode: false,
};

export const useAccount = (): AccountData => {
  const { Ledger } = useAppContext();
  const { walletPublicKey, isWalletConnected, watchOnly } =
    useAppSelector(selectWalletState);

  const address = useMemo(() => {
    if (!walletPublicKey || !isWalletConnected) return null;

    try {
      return Address.fromPublicKey(walletPublicKey, Ledger.AddressPrefix);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [isWalletConnected, walletPublicKey, Ledger.AddressPrefix]);

  if (!address) return InitialAccountData;

  return {
    accountId: address.getNumericId(),
    accountRS: address.getReedSolomonAddress(),
    publicKey: address.getPublicKey(),
    isWatchOnlyMode: watchOnly,
  };
};
