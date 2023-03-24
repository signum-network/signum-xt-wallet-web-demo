import { RootState } from "../store";
import { WalletState } from "./slice";

export const selectWalletState = (state: RootState): WalletState =>
  state.wallet;

export const selectIsWalletConnected = (state: RootState): boolean =>
  state.wallet.isWalletConnected;

export const selectWatchOnly = (state: RootState): boolean =>
  state.wallet.watchOnly;

export const selectWalletNodeHost = (state: RootState): string =>
  state.wallet.walletNodeHost;

export const selectWalletPublicKey = (state: RootState): string =>
  state.wallet.walletPublicKey;

export const selectWalletError = (state: RootState): string =>
  state.wallet.walletPublicKey;

export const selectIsOpenSignTransactionModal = (state: RootState): boolean =>
  state.wallet.isOpenSignTransactionModal;
