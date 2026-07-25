export const validateApiUrl = (value: unknown, dev: boolean): string | null => {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value);
    const localDev = dev && url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if (url.protocol !== "https:" && !localDev) return null;
    return url.origin;
  } catch {
    return null;
  }
};
