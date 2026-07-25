import { Events } from "@/components/events";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ServerStatus } from "@/components/server-status";
import { SystemsCodex } from "@/components/systems-codex";
import { EnterWorld } from "@/components/enter-world";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-obsidian">
      <a href="#main-content" className="fixed top-3 left-3 z-[100] -translate-y-20 border border-[#d7c58f] bg-obsidian px-4 py-3 font-sans text-sm text-ivory focus:translate-y-0">
        Saltar al contenido
      </a>
      <Navbar />

      <main id="main-content">
        <Hero />
        <ServerStatus />
        <Features />
        <SystemsCodex />
        <Events />
        <EnterWorld />
      </main>

      <Footer />
    </div>
  );
};
export default App;
