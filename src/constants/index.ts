import { FaDiscord, FaYoutube } from "react-icons/fa";

export const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "El mundo", href: "#world" },
  { label: "Códice", href: "#codex" },
  { label: "Eventos", href: "#events" },
  { label: "Comenzar", href: "#start" },
  { label: "Comunidad", href: "#community" },
] as const;

export const CTA_LINKS = {
  download: null,
  account: null,
  discord: null,
} as const;

export const LINKS = {
  discord: "https://discord.com",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://discord.com",
    icon: FaDiscord,
  },
  {
    href: "https://youtube.com",
    icon: FaYoutube,
  },
] as const;

export const SERVER_INFO = {
  name: "ROSE VAINE",
  subtitle: "Interlude Custom",
  chronicle: "Interlude",
  loginHost: "127.0.0.1",
  loginPort: 2106,
  type: "PvP",
  maxOnline: 3000,
} as const;

// Extraídos de game/config/rates.properties (BRProject, instancia local, fuente de verdad).
export const SERVER_RATES = [
  { label: "Experiencia (XP)", value: "x15" },
  { label: "Puntos de habilidad (SP)", value: "x15" },
  { label: "Adena", value: "x1.5" },
  { label: "Drop de ítems", value: "x1.5" },
  { label: "Spoil", value: "x1.5" },
  { label: "Hierbas", value: "x0.8" },
  { label: "Quest (XP/SP/Adena/drop)", value: "x1 (retail)" },
  { label: "XP/SP en party", value: "x1.5" },
  { label: "Raid Boss (XP/SP/drop)", value: "x1 (retail)" },
  { label: "Cuenta Premium", value: "x2 sobre todo lo anterior" },
] as const;

// Extraídos de game/config/events.properties.
// "activo": confirmado por el administrador como en ejecución ahora mismo.
// "en_revision": el código existe y no tiene flag de desactivado, pero todavía no fue confirmado en juego.
// "proximamente": el motor existe en el código pero está explícitamente desactivado (Enabled = False).
export const SERVER_EVENTS = [
  { name: "Olympiad", status: "activo", note: "Combates 1v1/2v2 semanales, ranking de Héroes" },
  { name: "Torneo de pesca", status: "activo", note: "Premios de hasta 800.000 adena" },
  { name: "Seven Signs & Festival", status: "en_revision", note: "Configuración presente, pendiente de confirmar en juego" },
  { name: "Four Sepulchers", status: "en_revision", note: "Configuración presente, pendiente de confirmar en juego" },
  { name: "Dimension Rift", status: "en_revision", note: "Configuración presente, pendiente de confirmar en juego" },
  { name: "Lotería del servidor", status: "en_revision", note: "Configuración presente, pendiente de confirmar en juego" },
  { name: "Cofre de las Sombras", status: "en_revision", note: "Configuración presente, pendiente de confirmar en juego" },
  { name: "Capture the Flag (CTF)", status: "proximamente", note: "Motor de evento presente, desactivado en la configuración actual" },
  { name: "Deathmatch", status: "proximamente", note: "Motor de evento presente, desactivado en la configuración actual" },
  { name: "Last Man Standing", status: "proximamente", note: "Motor de evento presente, desactivado en la configuración actual" },
  { name: "Team vs Team (TvT)", status: "proximamente", note: "Motor de evento presente, desactivado en la configuración actual" },
] as const;

// Snapshot general extraído de players.properties, mods.properties, protection.properties, siege.properties.
export const SERVER_OVERVIEW = [
  { label: "Crónica", value: "Interlude" },
  { label: "Movimiento", value: "Estilo L2OFF (motor propio, en revisión)" },
  { label: "Multibox", value: "Permitido, sin límite fijo por IP" },
  { label: "Buff slots", value: "25 (MaxBuffsAmount)" },
  { label: "Penalidad de grado", value: "Activa (no se usa equipo S en nivel 1)" },
  { label: "Ventanas por PC", value: "Máximo 2 (control por HWID)" },
  { label: "PvP flag (vs inocente)", value: "40 segundos" },
  { label: "PvP flag (vs PvP)", value: "20 segundos" },
  { label: "Karma: puede usar tiendas", value: "No" },
  { label: "Karma: puede usar Gatekeeper", value: "No" },
  { label: "Asedio: duración", value: "120 minutos" },
  { label: "Asedio: nivel mínimo de clan", value: "4" },
  { label: "Asedio: clanes por bando", value: "Hasta 10 atacantes / 10 defensores" },
] as const;

// Sistemas confirmados por código/config (game/config/mods.properties, project.properties, geoengine.properties).
// runtimeVerified queda en false hasta que se pruebe cada sistema dentro del juego.
export const SERVER_SYSTEMS = [
  { title: "Motor de movimiento estilo L2OFF", body: "Pathfinding y movimiento optimizados (Catmull-Rom, cache L2BR) para reducir bloqueos y atravesar menos paredes.", runtimeVerified: false },
  { title: "AutoFarm configurable", body: "Sistema propio de zonas y rutas de auto-farmeo, con límites de área, tiempo y objetivo por jugador.", runtimeVerified: false },
  { title: "Offline Farm (.away)", body: "Seguí farmeando mientras estás desconectado, con límites de cuentas simultáneas por IP.", runtimeVerified: false },
  { title: "Buff Shop", body: "Vendele tus buffs a otros jugadores con .sellbuff / .sellbuffs, hasta 25 buffs en venta a la vez.", runtimeVerified: false },
  { title: "Skill Shop", body: "Compra skills permanentes y profecías con Adena y un ítem especial de progresión.", runtimeVerified: false },
  { title: "OfflineShop / OfflineCraft", body: "Tienda y crafteo sin estar conectado.", runtimeVerified: false },
  { title: "Banco de Adena", body: "Comandos .bank / .deposit / .withdraw para guardar Adena en barras de oro.", runtimeVerified: false },
  { title: "Casa de subastas", body: "Sistema de auction propio para vender ítems entre jugadores.", runtimeVerified: false },
  { title: "Kamaloka instanciada", body: "Dungeon instanciado con dificultad ajustada para solo o party.", runtimeVerified: false },
  { title: "BattleBoss (Rumble)", body: "Evento de jefe con registro, cinemática y recompensas.", runtimeVerified: false },
  { title: "Agathion", body: "Mascotas especiales tipo pet-buff.", runtimeVerified: false },
  { title: "DressMe", body: "Outfits cosméticos para tu personaje.", runtimeVerified: false },
  { title: "Roulette y Capsule Box", body: "Sistemas de premios tipo caja sorpresa.", runtimeVerified: false },
  { title: "Torneos PvP", body: "Sistema propio de torneos entre jugadores.", runtimeVerified: false },
  { title: "Protección HWID", body: "Control por hardware ID: límite de ventanas por PC y baneos anti multi-cuenta.", runtimeVerified: false },
  { title: "Anti-zerg en raids (BossZerg)", body: "Limita el abuso de raids con múltiples cuentas o clanes sobrecargados.", runtimeVerified: false },
] as const;
