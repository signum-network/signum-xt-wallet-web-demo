import "./style.css";
import "./lib/wallet";
import "./lib/domEventsListener";
import {
  connectWalletButton,
  disconnectWalletButton,
  requiredNetworkLabel,
  xtWalletStoreUrlAnchor,
} from "./lib/domElements";
import { xtWalletStoreUrl } from "./lib/xtWalletStoreUrl";
import "./lib/sendMessages";

// Try to let user know which Network the dApp is requiring
requiredNetworkLabel.innerText =
  window.network === "Signum" ? "Mainnet" : "Testnet";

// Try to connect to XT Wallet
connectWalletButton.addEventListener("click", () =>
  window.dispatchEvent(new Event("wallet-connect"))
);

// Try to disconnect to XT Wallet
disconnectWalletButton.addEventListener("click", () =>
  window.dispatchEvent(new Event("wallet-disconnect"))
);

// Assign XT Wallet Store URL (This is just used for the XT Wallet <a></a> element)
xtWalletStoreUrlAnchor.setAttribute("href", xtWalletStoreUrl);
