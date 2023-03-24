import { xtWalletStoreUrl } from "@lib/utils/xtWalletStoreUrl";

export const Footer = (): JSX.Element => (
  <footer className="flex flex-row items-center gap-4 mb-6 text-2xl font-bold text-gray-500 border-t-2 p-4">
    <a href="https://signum.network/" target="_blank">
      <img
        src="/powered-by-signum.svg"
        width="125"
        alt="Powered by Signum Logo"
      />
    </a>

    <span> + </span>
    <a href="https://docs.signum.network/signum/signumjs" target="_blank">
      <img src="/signumjs.svg" width="50" alt="SignumJS Logo" />
    </a>

    <span> + </span>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img
        src="/typescript.svg"
        width="50"
        alt="Typescript Logo"
        className="rounded"
      />
    </a>

    <span> + </span>
    <a href="https://reactjs.org/" target="_blank">
      <img src="/react.svg" width="50" alt="SignumJS Logo" />
    </a>

    <span> + </span>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="/vite.svg" width="50" alt="Powered by Signum Logo" />
    </a>

    <span> + </span>
    <a
      href="https://github.com/signum-network/signum-xt-wallet-web-demo"
      target="_blank"
    >
      <img src="/github-mark.svg" width="50" alt="Github Repository" />
    </a>

    <span> + </span>
    <a href={xtWalletStoreUrl} target="_blank">
      <img src="/xt-wallet-logo.png" width="75" alt="Signum XT Wallet Logo" />
    </a>
  </footer>
);
