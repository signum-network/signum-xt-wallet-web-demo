import { WalletInitializer } from "./WalletInitializer";

// App initializer is used as a component that can listen to any events dispatched by the wallet
// or other service you would like to integrate
export const AppInitializer = () => (
  <>
    <WalletInitializer />
  </>
);
