import { useEffect, useState } from "react";
import { SERVER_EVENTS, SERVER_INFO } from "@/constants";
import { validateApiUrl } from "@/lib/api-url";

interface ServerStatusResponse { loginServer: "online" | "offline"; gameServer: "online" | "offline"; }

const configuredApiUrl = validateApiUrl(import.meta.env.VITE_API_URL, import.meta.env.DEV);

export const ServerStatus = ({ apiUrl = configuredApiUrl }: { apiUrl?: string | null }) => {
  const [status, setStatus] = useState<ServerStatusResponse | null>(null);
  const [failed, setFailed] = useState(apiUrl === null);
  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();
    let disposed = false;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 5000);
    fetch(`${apiUrl}/api/public/server-status`, { signal: controller.signal, credentials: "omit" })
      .then((response) => {
        if (!response.ok) throw new Error("bad response");
        return response.json() as Promise<ServerStatusResponse>;
      })
      .then((data) => { if (!disposed) setStatus(data); })
      .catch(() => { if (!disposed && (timedOut || !controller.signal.aborted)) setFailed(true); })
      .finally(() => window.clearTimeout(timeout));
    return () => { disposed = true; window.clearTimeout(timeout); controller.abort(); };
  }, [apiUrl]);
  const online = status?.loginServer === "online" && status.gameServer === "online";
  const state = failed ? "No disponible" : status ? (online ? "Online" : "Offline") : "Consultando…";
  const activeEvent = SERVER_EVENTS.find(({ status: eventStatus }) => eventStatus === "activo");
  const facts = [
    ["Estado", state],
    ["Crónica", SERVER_INFO.chronicle],
    ["Rates", "XP x15 · SP x15"],
    ["Próximo evento activo", activeEvent?.name ?? "Sin confirmar"],
  ] as const;
  return (
    <section id="world" className="border-y border-white/10 bg-obsidian-soft py-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-white/10 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
        {facts.map(([label, value]) => (
          <div key={label} className="min-h-32 px-5 py-6">
            <span className="font-sans text-xs tracking-[0.08em] text-[#d7c58f]">{label}</span>
            <strong className="mt-3 block font-display text-lg text-ivory">{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};
