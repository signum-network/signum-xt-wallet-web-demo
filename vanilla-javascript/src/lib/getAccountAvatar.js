// Use library for generating the icon
import hashicon from "hashicon";

export function getAccountAvatar() {
  if (!window.walletConnection) return;
  return hashicon(window.walletConnection.accountId, { size: 36 }).toDataURL();
}
