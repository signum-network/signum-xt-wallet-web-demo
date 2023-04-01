import { Address } from "@signumjs/core";
import { Networks } from "./networks";

export function getReedSolomonAddress(publicKey) {
  return Address.fromPublicKey(
    publicKey,
    window.network === Networks.MainNet ? "S" : "TS"
  ).getReedSolomonAddress();
}
