import { Amount } from "@signumjs/util";
import {
  sendMessageButton,
  sendEncryptedMessageButton,
  successfulTransactionBox,
  signTransactionModal,
} from "./domElements";
import { Networks } from "./networks";

function showSignTransactionModal() {
  signTransactionModal.style.display = "flex";
}

function hideSignTransactionModal() {
  signTransactionModal.style.display = "none";
}

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

    showSignTransactionModal();

    const { transactionId } = await window.wallet.confirm(
      unsignedTransactionBytes
    );

    confirmedTransactionFeedback(transactionId);
  } catch (error) {
    alert(error.message);
  } finally {
    hideSignTransactionModal();
  }
});

// Send encrypted message
sendEncryptedMessageButton.addEventListener("click", async () => {
  try {
    const { walletConnection } = window;

    if (!window.ledger || !walletConnection)
      throw new Error("Ledger Client not initialized");

    showSignTransactionModal();

    const { transactionId } = await window.wallet.sendEncryptedMessage({
      message: "This message is encrypted",
      recipientPublicKey: walletConnection.publicKey,
    });

    confirmedTransactionFeedback(transactionId);
  } catch (error) {
    alert(error.message);
  } finally {
    hideSignTransactionModal();
  }
});

function confirmedTransactionFeedback(transactionId) {
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
