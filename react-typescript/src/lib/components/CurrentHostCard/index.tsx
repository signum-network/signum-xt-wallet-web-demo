import { useAppSelector } from "@lib/hooks/useAppSelector";
import { selectWalletState } from "@lib/states/walletState";

export const CurrentHostCard = (): JSX.Element | null => {
  const { isWalletConnected, walletNodeHost } =
    useAppSelector(selectWalletState);

  if (!isWalletConnected) return null;

  return (
    <div className="flex items-center p-4 border-2 gap-4 rounded flex-wrap">
      Current Host:
      <span className="font-bold">{walletNodeHost}</span>
    </div>
  );
};
