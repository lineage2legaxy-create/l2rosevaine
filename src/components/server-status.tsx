import { useEffect, useState } from "react";

import { SERVER_INFO } from "@/constants";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

type ServerStatusResponse = {
  loginServer: "online" | "offline";
  gameServer: "online" | "offline";
};

const toneDot: Record<string, string> = {
  pending: "bg-amethyst-soft",
  neutral: "bg-ivory-muted",
  online: "bg-online-green",
  offline: "bg-alert-red",
};

export const ServerStatus = () => {
  const [status, setStatus] = useState<ServerStatusResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/public/server-status`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json() as Promise<ServerStatusResponse>;
      })
      .then((data) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isUp = status && status.loginServer === "online" && status.gameServer === "online";

  const serverCard = failed
    ? { value: "No disponible", tone: "offline" as const }
    : status
      ? isUp
        ? { value: "Online", tone: "online" as const }
        : { value: "Offline", tone: "offline" as const }
      : { value: "Consultando...", tone: "pending" as const };

  const STATUS_CARDS = [
    { label: "Servidor", value: serverCard.value, tone: serverCard.tone },
    { label: "Jugadores", value: "Proximamente", tone: "neutral" as const },
    { label: "Cronica", value: SERVER_INFO.chronicle, tone: "neutral" as const },
    { label: "Rates", value: "XP x15 · SP x15", tone: "neutral" as const },
  ];

  return (
    <section
      id="status"
      className="relative w-full border-y border-amethyst/10 bg-obsidian-soft px-6 py-16 sm:px-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-card border border-amethyst/10 bg-amethyst/10 md:grid-cols-4">
        {STATUS_CARDS.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-2 bg-obsidian-soft px-6 py-7"
          >
            <span className="font-sans flex items-center gap-2 text-[11px] tracking-[0.08em] text-ivory-muted uppercase">
              <span
                className={`h-1.5 w-1.5 rounded-full ${toneDot[card.tone]}`}
              />
              {card.label}
            </span>
            <span className="font-display text-xl text-ivory">
              {card.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
