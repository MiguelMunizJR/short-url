import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notyfInstance = () => {
  return new Notyf({
    duration: 4000,
    dismissible: true,
    ripple: true,
  });
};

export const handleSubmit = async (event: Event) => {
  if (!event) return;
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const API_URL = "/api/shorten";
    let isLoading = true;

    const shortendURLData = await fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        isLoading = false;
      });

    if (!shortendURLData) {
      throw new Error("Failed to generate URL: No data received");
    }

    return shortendURLData;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error occurred during URL generation";

    throw new Error(errorMessage);
  }
};

export const actionsDOM = (documentElements: any, shortendURLData: any) => {
  if (!documentElements || !shortendURLData) return;

  const {
    $displayElement,
    $displayURL,
    $originalURL,
    $createdAt,
    $expireAt,
    $clicks,
    $copyBtn,
    $openUrlBtn,
    $inputURL,
  } = documentElements;
  const { createdAt, clicks, shortUrl, url }: any = shortendURLData;

  const relativeTextTime = isRelativeTime(createdAt, true);
  const expireTextTime = isRelativeTime(createdAt, false);
  const clickMessage = countClicks(clicks);

  // Reset
  $inputURL.value = "";
  $inputURL.setAttribute("disabled", "");

  // Text Content
  $originalURL.textContent = url;
  $displayElement.textContent = shortUrl;
  $createdAt.textContent = relativeTextTime;
  $expireAt.textContent = expireTextTime;
  $clicks.textContent = clickMessage;

  // Animations
  $displayElement.classList.add("animate-fade-in");
  $displayElement.classList.add("text-secondary-light");
  $displayURL.classList.add("h-28");

  // Buttons
  $copyBtn.classList.remove("hidden");
  $openUrlBtn.classList.remove("hidden");

  $inputURL.focus();
  $inputURL.removeAttribute("disabled");
};

export const isLightTheme = (
  $isLight: boolean,
  $displayElement: HTMLElement
) => {
  if (!$isLight || !$displayElement) return;

  if ($isLight) {
    $displayElement?.classList.remove("text-secondary-light");
    $displayElement?.classList.add("text-secondary");
  } else {
    $displayElement?.classList.remove("text-secondary");
    $displayElement?.classList.add("text-secondary-light");
  }
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

    return "⌛ Expira en ...";
  }
};

export const countClicks = (clicks: number): string => {
  if (!clicks) return "🌐 0 Click";
  return `🌐 ${clicks} Click`;
};
