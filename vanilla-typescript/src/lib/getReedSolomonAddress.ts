import { Address } from "@signumjs/core";

// Types of Network to develop on, you decide which network you want to develop...
export const Networks = {
  MainNet: "Signum",
  TestNet: "Signum-TESTNET",
};

export function getReedSolomonAddress(publicKey: string) {
  return Address.fromPublicKey(
    publicKey,
    window.network === Networks.MainNet ? "S" : "TS"
  ).getReedSolomonAddress();
}
