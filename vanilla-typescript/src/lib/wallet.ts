import { LedgerClientFactory } from "@signumjs/core";
import { GenericExtensionWallet } from "@signumjs/wallets";
import { Networks } from "./networks";
import { getReedSolomonAddress } from "./getReedSolomonAddress";

// Here you can assign the dApp name
const appName = "My Amazing App";

// Setting up window global variables
window.wallet = new GenericExtensionWallet();
window.walletConnection = null;
window.ledger = null;

// Here you can assign on which network you want to work
window.network = Networks.TestNet;

let walletListener: any = null;

// This will be the ledger which will be used for interacting with a Signum Node
function createLedgerClient(nodeHost: string) {
  window.ledger = LedgerClientFactory.createClient({
    nodeHost,
  });
}

// This will fire the events that will be listened through the javascript DOM
function dispatchWalletEvent(action: string, data: any) {
  window.dispatchEvent(
    new CustomEvent("wallet-event", {
      detail: {
        action,
        payload: { ...data },
      },
    })
  );
}

// This event will fire when user changes network - Example: Mainnet to Testnet or viceversa
function onNetworkChange(args: any) {
  dispatchWalletEvent("networkChanged", { ...args });

  if (args.networkName === window.network) {
    if (!window.walletConnection) {
      window.dispatchEvent(new Event("wallet-connect"));
    } else {
      createLedgerClient(args.nodeHost);
    }
  } else {
    alert(
      "Wallet has changed to another network which is not compatible with this dApp, you must use the following Network: " +
        window.network
    );

    window.dispatchEvent(new Event("wallet-disconnect"));
  }
}

// This event will fire when user changes account selected in wallet - Example: Change from Account A to Account B
function onAccountChange(args: any) {
  dispatchWalletEvent("accountChanged", {
    ...args,
    address: getReedSolomonAddress(args.accountPublicKey),
  });
}

// This event will fire when user removes permission of this dApp to be connected to extension wallet
function onPermissionOrAccountRemoval(args: any) {
  dispatchWalletEvent("permissionRemoved", { ...args });
  alert("Wallet removed this DApps permission");
  handleDisconnectWallet();
}

// This event will launch when a user is trying to connect to the extension wallet
async function handleConnectWallet() {
  if (window.walletConnection) return;

  try {
    const connection = await window.wallet.connect({
      appName,
      networkName: Networks.TestNet,
    });

    if (walletListener) walletListener.unlisten();

    walletListener = connection.listen({
      onNetworkChanged: onNetworkChange,
      onAccountChanged: onAccountChange,
      onPermissionRemoved: onPermissionOrAccountRemoval,
      onAccountRemoved: onPermissionOrAccountRemoval,
    });

    window.walletConnection = connection;

    createLedgerClient(connection.currentNodeHost);

    dispatchWalletEvent("connected", {
      accountId: connection.accountId,
      publicKey: connection.publicKey,
      address: getReedSolomonAddress(connection.publicKey), // attention: address is not part of the connection!
      host: connection.currentNodeHost,
      watchOnly: connection.watchOnly,
    });
  } catch (e: any) {
    alert(e.message);
  }
}

async function handleDisconnectWallet() {
  window.wallet = new GenericExtensionWallet();
  window.walletConnection = null;
  window.ledger = null;
  dispatchWalletEvent("disconnected", {});
  walletListener.unlisten();
}

export async function initWallet() {
  // Listen to wallet-connect events - this event will fire when user clicks on ``Connect Wallet``
  window.addEventListener(
    "wallet-connect",
    handleConnectWallet.bind(null, appName)
  );

  // Listen to disconnect wallet-connect events - this event will fire when user clicks on ``Sign Out / Disconnect Wallet``
  window.addEventListener("wallet-disconnect", handleDisconnectWallet);
}

initWallet();
