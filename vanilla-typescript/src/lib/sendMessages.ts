import { Amount } from "@signumjs/util";
import {
  sendMessageButton,
  sendEncryptedMessageButton,
  successfulTransactionBox,
} from "./domElements";
import { Networks } from "./networks";

// Send message
sendMessageButton.addEventListener("click", async () => {
  try {
    const { walletConnection } = window;

    if (!window.ledger || !walletConnection)
      throw new Error("Ledger Client not initialized");

    const { unsignedTransactionBytes } =
      await window.ledger.message.sendMessage({
        senderPublicKey: walletConnection.publicKey,
        recipientId: walletConnection.accountId, // send to self
        message:
          "If you can read this message, then you successfully sent the message with XT Vanilla Demo App",
        messageIsText: true,
        feePlanck: Amount.fromSigna("0.01").getPlanck(),
      });

    const { transactionId } = await window.wallet.confirm(
      unsignedTransactionBytes
    );

    confirmedTransactionFeedback(transactionId);
  } catch (error: any) {
    alert(error.message);
  }
});

// Send encrypted message
sendEncryptedMessageButton.addEventListener("click", async () => {
  try {
    const { walletConnection } = window;

    if (!window.ledger || !walletConnection)
      throw new Error("Ledger Client not initialized");

    const { transactionId } = await window.wallet.sendEncryptedMessage({
      message: "This message is encrypted",
      recipientPublicKey: walletConnection.publicKey,
    });

    confirmedTransactionFeedback(transactionId);
  } catch (error: any) {
    alert(error.message);
  }
});

function confirmedTransactionFeedback(transactionId: string) {
  const explorerUrl =
    window.network === Networks.TestNet
      ? "https://t-chain.signum.network"
      : "https://explorer.signum.network";

  successfulTransactionBox.setAttribute(
    "href",
    explorerUrl + "/tx/" + transactionId
  );

  successfulTransactionBox.style.display = "flex";
}
