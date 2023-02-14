import {
  connectWalletButton,
  connectionStatusLabel,
  selectedNetworkLabel,
  disconnectWalletButton,
} from "./domElements";

// Listen to any wallet connection operation
window.addEventListener("wallet-event", (event: any) => {
  console.debug(event);

  const { payload, action } = event.detail;

  if (action === "connected") {
    connectionStatusLabel.innerText = "Congratulations, you are connected 🎉";
    selectedNetworkLabel.innerText = window.network;
    connectWalletButton.hidden = true;
    disconnectWalletButton.hidden = false;
  }

  if (action === "disconnected") {
    connectionStatusLabel.innerText = "You are not connected to XT Wallet";
    selectedNetworkLabel.innerText = "None";
    connectWalletButton.hidden = false;
    disconnectWalletButton.hidden = true;
  }

  if (action === "accountChanged") alert("User has chosen another account");

  if (action === "networkChanged") {
    selectedNetworkLabel.innerText = payload.networkName;
  }
});
