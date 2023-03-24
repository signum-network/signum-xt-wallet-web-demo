// Connect wallet
export const requestWalletConnection = () => {
  window.dispatchEvent(new Event("connect-wallet"));
};

// Disconnect wallet
export const requestWalletDisconnection = () => {
  window.dispatchEvent(new Event("disconnect-wallet"));
};
