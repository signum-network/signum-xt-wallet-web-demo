import { useState } from "react";
import { Footer } from "./lib/components/Footer";

export default function App() {
  const [count, setCount] = useState(0);

  return (
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

      <Footer />
    </main>
  );
}
