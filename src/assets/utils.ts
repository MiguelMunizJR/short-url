import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notyfInstance = () => {
  return new Notyf({
    duration: 4000,
    dismissible: true,
    ripple: true,
  });
};

export const isRelativeTime = (
  timestamp: number,
  isRelativeTime: boolean
): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1,
  };

  if (isRelativeTime) {
    if (seconds < 5) return "✅ Creado justo ahora";

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);

      if (interval >= 1) {
        const textUnit =
          interval === 1 ? unit : unit === "mes" ? "meses" : `${unit}s`;

        return `✅ Creado hace ${interval} ${textUnit}`;
      }
    }

    return "✅ Creado justo ahora";
  } else {
    // if (seconds <= 0) return "⌛ Expirado";
    // for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    //   const interval = Math.floor(seconds / secondsInUnit);

    //   if (interval >= 1) {
    //     const unitText = interval === 1 ? unit : `${unit}s`;

    //     return `⌛ Expira en ${interval} ${unitText}`;
    //   }
    // }

    // return "⌛ Expira en unos segundos";

    return "⌛ Expira en ..."
  }
};

export const countClicks = (clicks: number): string => {
  if (!clicks) return "🌐 0 Clicks";
  return `🌐 ${clicks} Clicks`;
};

