// Use library for generating the icon
// @ts-ignore
import hashicon from "hashicon";

export function getAccountAvatar() {
  if (!window.walletConnection) return;
  return hashicon(window.walletConnection.accountId, { size: 36 }).toDataURL();
}
