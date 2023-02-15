import { useMemo } from "react";
import { useAccount } from "@lib/hooks/useAccount";
import { useAppSelector } from "@lib/hooks/useAppSelector";
import { selectWalletState } from "@lib/states/walletState";

// @ts-ignore
import hashicon from "hashicon";

export const AccountCard = (): JSX.Element | null => {
  const { accountId, accountRS, isWatchOnlyMode } = useAccount();
  const { isWalletConnected } = useAppSelector(selectWalletState);

  const iconUrl = useMemo(() => {
    if (!accountId) return "";
    return hashicon(accountId, { size: 36 }).toDataURL();
  }, [accountId]);

  if (!isWalletConnected) return null;

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex items-center justify-center py-4 px-10 border-2 gap-4 rounded flex-wrap w-auto">
        <img
          src={iconUrl}
          className="rounded-lg w-8 border-1"
          alt="User Avatar"
        />

        {accountRS && <span className="font-bold">{accountRS}</span>}
      </div>

      {isWatchOnlyMode && (
        <div
          className="bg-blue-100 rounded-lg py-5 px-6 text-base text-blue-700 inline-flex items-center"
          role="alert"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="info-circle"
            className="w-4 h-4 mr-2 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            ></path>
          </svg>
          Detected a <b className="ml-1">watch-only account</b>, you will not be
          able to make transactions
        </div>
      )}
    </div>
  );
};
