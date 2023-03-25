// This is going to be used always when a user will sign a transaction
// This function is just for showing the "Please sign the message in your wallet to continue" Modal

// Start Signing Transaction
export const signStartWalletEvent = () =>
  window.dispatchEvent(new Event("wallet-sign-start"));

// End Signing Transaction
export const signEndWalletEvent = () =>
  window.dispatchEvent(new Event("wallet-sign-end"));
