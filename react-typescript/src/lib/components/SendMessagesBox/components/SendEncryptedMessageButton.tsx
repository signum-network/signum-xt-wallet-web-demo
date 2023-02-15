import { useCallback, useState } from "react";
import { Address } from "@signumjs/core";

import { useLedger } from "@lib/hooks/useLedger";
import { useAccount } from "@lib/hooks/useAccount";
import { useAppContext } from "@lib/hooks/useAppContext";
import { useExtensionWallet } from "@lib/hooks/useExtensionWallet";

export const SendEncryptedMessageButton = (): JSX.Element => {
  const [isSending, setIsSending] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const ledger = useLedger();
  const wallet = useExtensionWallet();

  const { publicKey } = useAccount();
  const {
    Ledger: { Explorer },
  } = useAppContext();

  const sendTestEncryptedMessage = useCallback(async () => {
    if (!ledger || !wallet || !wallet.connection) return;

    try {
      setIsSending(true);

      setTransactionId("");

      const address = Address.fromPublicKey(publicKey); // Send encrypted message to (ourselves) self-account

      const { transactionId } = await wallet.sendEncryptedMessage({
        message: "This message is encrypted",
        recipientPublicKey: address.getPublicKey(),
      });

      setTransactionId(transactionId);

      alert("Successfully sent encrypted message");
    } catch (e: any) {
      console.error(e);
      alert(`Error: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  }, [ledger, wallet]);

  return (
    <div className="flex flex-col gap-4">
      <button
        disabled={isSending}
        onClick={sendTestEncryptedMessage}
        className="px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-lg leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        {isSending ? "Sending message..." : "🔒 Send Encrypted Message"}
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
