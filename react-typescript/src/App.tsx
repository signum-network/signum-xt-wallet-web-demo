import { Provider as ReduxProvider } from "react-redux";
import { store } from "@lib/states/store";
import { AppInitializer } from "@lib/components/AppInitializer";
import { AppContextProvider } from "@lib/contexts/AppContext";

import { ConnectionManager } from "@lib/components/ConnectionManager";
import { AccountCard } from "@lib/components/AccountCard";
import { CurrentHostCard } from "@lib/components/CurrentHostCard";
import { SendMessagesBox } from "@lib/components/SendMessagesBox";
import { SignTransactionModal } from "@lib/components/SignTransactionModal";
import { Footer } from "@lib/components/Footer";

export default function App() {
  return (
    <AppContextProvider>
      <ReduxProvider store={store}>
        <AppInitializer />
        <SignTransactionModal />

        <main className="flex h-screen flex-col items-center justify-center py-8 text-center gap-6">
          <h1 className="text-black text-5xl font-black">
            Welcome to
            <a
              href="https://signum.network/"
              target="_blank"
              className="text-blue-500 bg-clip-text underline ml-2"
            >
              Signum!
            </a>
          </h1>

          <ConnectionManager />

          <AccountCard />

          <CurrentHostCard />

          <SendMessagesBox />

          <Footer />
        </main>
      </ReduxProvider>
    </AppContextProvider>
  );
}
