import { FC, ReactNode, createContext } from "react";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";
import { Config } from "@lib/config";

export interface AppContextType {
  appName: string;
  Wallet: {
    Extension: GenericExtensionWallet;
    Deeplink: DeeplinkableWallet;
  };
  Ledger: {
    IsTestnet: boolean;
    AddressPrefix: string;
    Network: string;
    Explorer: string;
  };
}

const appConfig: AppContextType = {
  appName: Config.appName,
  Wallet: {
    Extension: new GenericExtensionWallet(),
    Deeplink: new DeeplinkableWallet({ openInBrowser: true }),
  },
  Ledger: {
    IsTestnet: Config.IsTestnet,
    AddressPrefix: Config.IsTestnet ? "TS" : "S",
    Network: Config.Network,
    Explorer: Config.Explorer,
  },
};

export const AppContext = createContext<AppContextType>(appConfig);

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={appConfig}>{children}</AppContext.Provider>
  );
};
