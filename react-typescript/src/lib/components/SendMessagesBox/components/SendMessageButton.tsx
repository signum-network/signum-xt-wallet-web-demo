import { useCallback, useState } from "react";
import { UnsignedTransaction } from "@signumjs/core";
import { Amount } from "@signumjs/util";

import { useLedger } from "@lib/hooks/useLedger";
import { useAccount } from "@lib/hooks/useAccount";
import { useAppContext } from "@lib/hooks/useAppContext";
import { useExtensionWallet } from "@lib/hooks/useExtensionWallet";
import {
  signStartWalletEvent,
  signEndWalletEvent,
} from "@lib/utils/manageWalletSignTrasactionEvent";

export const SendMessageButton = (): JSX.Element => {
  const [isSending, setIsSending] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const ledger = useLedger();
  const wallet = useExtensionWallet();

  const { publicKey, accountId } = useAccount();
  const {
    Ledger: { Explorer },
  } = useAppContext();

  const sendTestMessage = useCallback(async () => {
    if (!ledger || !wallet || !wallet.connection) return;

    try {
      setIsSending(true);

      setTransactionId("");

      const { unsignedTransactionBytes } = (await ledger.message.sendMessage({
        message: "This is a test message from the XT Demo React dApp",
        feePlanck: Amount.fromSigna(0.01).getPlanck(),
        messageIsText: true,
        senderPublicKey: publicKey,
        recipientId: accountId, // Send message to (ourselves) self-account
      })) as UnsignedTransaction;

      signStartWalletEvent();

      const { transactionId } = await wallet.confirm(unsignedTransactionBytes);

      setTransactionId(transactionId);

      alert("Successfully sent");
    } catch (e: any) {
      console.error(e);
      alert(`Error: ${e.message}`);
    } finally {
      signEndWalletEvent();
      setIsSending(false);
    }
  }, [ledger, wallet]);

  return (
    <div className="flex flex-col gap-4">
      <button
        disabled={isSending}
        onClick={sendTestMessage}
        className="px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-lg leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        {isSending ? "Sending message..." : "Send a Test Message"}
      </button>

      {transactionId && (
        <a
          href={`${Explorer}tx/${transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4 underline"
        >
          See in Explorer
        </a>
      )}
    </div>
  );
};
