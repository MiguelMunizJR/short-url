import type { APIRoute } from "astro";
import { db, eq, shortendURLTable } from "astro:db";
import crypto from "crypto";

export interface ShortenedURLInterface {
  id: string;
  url: string;
  hash_url: string;
  clicks: number;
  createdAt: number;
}

const formatURL = (url: string) => {
  if (!url) return "";

  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const createRandomHash = (): string =>
  crypto.randomBytes(4).toString("hex").substring(0, 6);

const buildShortUrl = (request: Request, hash: string): URL => {
  const baseUrl = new URL(request.url);
  return new URL(`${baseUrl.origin}/${hash}`);
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const inputURL = formData.get("inputURL")?.toString().trim();

    if (!inputURL) {
      return new Response("URL is required", { status: 400 });
    }

    // Formateamos el inputURL y le agregamos protocolo si no existe
    const formatedURL = formatURL(inputURL || "");

    if (!formatedURL) {
      return new Response("Invalid URL format", { status: 400 });
    }

    // Verificar URL existente
    const [existingEntry] = await db
      .select()
      .from(shortendURLTable)
      .where(eq(shortendURLTable.url, formatedURL))
      .limit(1);

    if (existingEntry) {
      return new Response(
        JSON.stringify({
          shortUrl: buildShortUrl(request, existingEntry.hash_url),
          ...existingEntry,
        }),
        { status: 200 }
      );
    }

    const newEntry: ShortenedURLInterface = {
      id: crypto.randomUUID(),
      url: formatedURL,
      hash_url: createRandomHash(),
      clicks: 0,
      createdAt: Date.now(),
    };

    await db.insert(shortendURLTable).values(newEntry);

    return new Response(
      JSON.stringify({
        shortUrl: buildShortUrl(request, newEntry.hash_url),
        ...newEntry,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error shortening URL:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
