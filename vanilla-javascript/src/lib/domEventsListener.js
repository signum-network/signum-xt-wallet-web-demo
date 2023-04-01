import {
  connectWalletButton,
  connectionStatusLabel,
  selectedNetworkLabel,
  disconnectWalletButton,
  authenticatedUserBox,
  watchOnlyAccountLabel,
  currentHostLabel,
  accountAddressLabel,
  accountAvatarImage,
  messageButtonContainer,
  successfulTransactionBox,
} from "./domElements";

import { getAccountAvatar } from "./getAccountAvatar";

// Listen to any wallet connection operation
// This snippet serves as reference on how your dApp can react, here the sky is the limit
window.addEventListener("wallet-event", (event) => {
  const { payload, action } = event.detail;

  if (action === "connected") {
    connectionStatusLabel.innerText = "Congratulations, you are connected 🎉";
    accountAddressLabel.innerText = payload.address;
    selectedNetworkLabel.innerText = window.network;
    currentHostLabel.innerText = payload.host;
    authenticatedUserBox.style.display = "flex";
    accountAvatarImage.src = getAccountAvatar();
    connectWalletButton.hidden = true;
    disconnectWalletButton.hidden = false;

    // Events for detecting when account is watch-mode
    messageButtonContainer.style.display = payload.watchOnly ? "none" : "flex";
    watchOnlyAccountLabel.hidden = payload.watchOnly ? false : true;
  }

  if (action === "disconnected") {
    connectionStatusLabel.innerText = "You are not connected to XT Wallet";
    selectedNetworkLabel.innerText = "None";
    authenticatedUserBox.style.display = "none";
    successfulTransactionBox.style.display = "none";
    connectWalletButton.hidden = false;
    disconnectWalletButton.hidden = true;
  }

  if (action === "accountChanged") {
    accountAddressLabel.innerText = payload.address;
    accountAvatarImage.src = getAccountAvatar();

    // Events for detecting when account is watch-mode
    messageButtonContainer.style.display = payload.watchOnly ? "none" : "flex";
    watchOnlyAccountLabel.hidden = payload.watchOnly ? false : true;
  }

  if (action === "networkChanged") {
    selectedNetworkLabel.innerText = payload.networkName;
    currentHostLabel.innerText = window.walletConnection?.currentNodeHost || "";
  }
});
