import { Amount } from "@signumjs/util";
import { sendMessageButton, sendEncryptedMessageButton } from "./domElements";

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

    const tx = await window.wallet.confirm(unsignedTransactionBytes);
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

    const { unsignedTransactionBytes } =
      // TODO: Assign senderAgreementKey
      // @ts-ignore
      await window.ledger.message.sendEncryptedMessage({
        senderPublicKey: walletConnection.publicKey,
        recipientId: walletConnection.accountId,
        recipientPublicKey: walletConnection.publicKey, // Send to self
        message: "This message is encrypted",
        feePlanck: Amount.fromSigna("0.02").getPlanck(),
      });

    const tx = await window.wallet.confirm(unsignedTransactionBytes);
  } catch (error: any) {
    console.log(error);
    alert(error.message);
  }
});

function confirmedTransactionFeedback(tx: string) {}
