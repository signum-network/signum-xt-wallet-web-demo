import { useAppContext } from "@lib/hooks/useAppContext";
import { useAppSelector } from "@lib/hooks/useAppSelector";
import { selectWalletState } from "@lib/states/walletState";
import {
  requestWalletConnection,
  requestWalletDisconnection,
} from "@lib/manageWalletConnection";

export const ConnectionManager = (): JSX.Element => {
  const { Ledger } = useAppContext();
  const { isWalletConnected } = useAppSelector(selectWalletState);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <p className="text-2xl block">
        {isWalletConnected && "Congratulations, you are connected 🎉"}
        {!isWalletConnected && "You are not connected to XT Wallet"}
      </p>

      <p className="px-4 text-xl py-2  self-center rounded-full text-gray-500 bg-gray-200 font-semibold flex align-center w-max transition duration-300 ease">
        Network Required:
        <span className="ml-2">
          {Ledger.Network === "Signum-TESTNET" ? "Testnet" : "Mainnet"}
        </span>
      </p>

      {!isWalletConnected && (
        <button
          onClick={requestWalletConnection}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      )}

      {isWalletConnected && (
        <button
          onClick={requestWalletDisconnection}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect Wallet
        </button>
      )}
    </div>
  );
};
