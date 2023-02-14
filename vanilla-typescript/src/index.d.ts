import { Address, Api } from "@signumjs/core";
import { GenericExtensionWallet, WalletConnection } from "@signumjs/wallets";

export {};

declare global {
  interface Window {
    wallet: GenericExtensionWallet;
    walletConnection: WalletConnection?;
    ledger: Api?;
    network: string;
  }
}
