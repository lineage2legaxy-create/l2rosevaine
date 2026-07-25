import { Events } from "@/components/events";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Rates } from "@/components/rates";
import { ServerStatus } from "@/components/server-status";
import { WorldSection } from "@/components/world-section";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-obsidian">
      <Navbar />

      <main>
        <Hero />
        <ServerStatus />
        <Features />
        <WorldSection />
        <Rates />
        <Events />
      </main>

      <Footer />
    </div>
  );
};
export default App;
