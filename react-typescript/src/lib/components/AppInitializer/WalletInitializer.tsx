import { useEffect } from "react";
import {
  ExtensionWalletError,
  GenericExtensionWallet,
  WalletConnection,
} from "@signumjs/wallets";

import { useAppContext } from "@lib/hooks/useAppContext";
import {
  requestWalletConnection,
  requestWalletDisconnection,
} from "@lib/manageWalletConnection";
import { actions, selectIsWalletConnected } from "@lib/states/walletState";
import { useAppDispatch } from "@lib/hooks/useAppDispatch";
import { useAppSelector } from "@lib/hooks/useAppSelector";

// This is the wallet service which will listen to any events from the Extension Wallet
// Connection, Unlinked account, Changed node/network, Changed account, Removed permissions
export const WalletInitializer = () => {
  const dispatch = useAppDispatch();
  const { Ledger, Wallet, appName } = useAppContext();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  function onWalletConnected(connection: WalletConnection) {
    dispatch(actions.setIsWalletConnected(true));
    dispatch(actions.setWalletNodeHost(connection.currentNodeHost));
    dispatch(actions.setWatchOnly(connection.watchOnly));
    dispatch(actions.setWalletPublicKey(connection.publicKey || ""));
  }

  useEffect(() => {
    let listener: any = null;

    function handleDisconnectWallet() {
      listener && listener.unlisten();
      dispatch(actions.setIsWalletConnected(false));
      dispatch(actions.setWatchOnly(false));
      dispatch(actions.setWalletNodeHost(""));
      dispatch(actions.setWalletPublicKey(""));
      Wallet.Extension = new GenericExtensionWallet();
    }

    function onNetworkChange(args: any) {
      dispatch(actions.setWalletNodeHost(args.networkHost));

      if (args.networkName === Ledger.Network) {
        if (!isWalletConnected) requestWalletConnection();
      } else {
        alert(
          "Wallet has changed to another network which is not compatible with this dApp, you must use the following Network: " +
            Ledger.Network
        );

        requestWalletDisconnection();
      }
    }

    function onAccountChange(args: any) {
      dispatch(actions.setWalletPublicKey(args.accountPublicKey));
      dispatch(actions.setWatchOnly(args.watchOnly));
    }

    function onPermissionOrAccountRemoval() {
      alert("Wallet removed this DApps permission");
      handleDisconnectWallet();
    }

    function handleExtensionErrors(e: ExtensionWalletError) {
      alert(e.message);
      actions.setWalletError(e);
    }

    async function handleConnectWallet() {
      if (isWalletConnected) return;

      try {
        const connection = await Wallet.Extension.connect({
          appName,
          networkName: Ledger.Network,
        });

        onWalletConnected(connection);

        listener = connection.listen({
          onNetworkChanged: onNetworkChange,
          onAccountChanged: onAccountChange,
          onPermissionRemoved: onPermissionOrAccountRemoval,
          onAccountRemoved: onPermissionOrAccountRemoval,
        });
      } catch (e: any) {
        handleExtensionErrors(e);
      }
    }

    window.addEventListener("connect-wallet", handleConnectWallet);
    window.addEventListener("disconnect-wallet", handleDisconnectWallet);

    return () => {
      listener && listener.unlisten();
      window.removeEventListener("connect-wallet", handleConnectWallet);
      window.removeEventListener("disconnect-wallet", handleDisconnectWallet);
    };
  }, [Wallet.Extension]);

  return null;
};
