import { useAccount } from "@lib/hooks/useAccount";
import { useAppSelector } from "@lib/hooks/useAppSelector";
import { selectWalletState } from "@lib/states/walletState";
import { SendMessageButton } from "./components/SendMessageButton";
import { SendEncryptedMessageButton } from "./components/SendEncryptedMessageButton";

export const SendMessagesBox = (): JSX.Element | null => {
  const { isWatchOnlyMode } = useAccount();
  const { isWalletConnected } = useAppSelector(selectWalletState);

  if (!isWalletConnected || isWatchOnlyMode) return null;

  return (
    <div className="flex items-start px-4 gap-10 rounded flex-wrap">
      <SendMessageButton />
      <SendEncryptedMessageButton />
    </div>
  );
};
