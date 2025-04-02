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

const createRandomHash = () => {
  return Math.random().toString(36).substring(2, 8)
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    let inputURL = formData.get("inputURL") as string;

    if (!inputURL) {
      return new Response("Url is required", { status: 400 });
    }

    //? Agregar protocolo al url si no existe 💀
    if (!inputURL.includes("http")) inputURL = `https://${inputURL}`;

    //? 💀
    const isValidUrl = inputURL.match(
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    );

    if (!isValidUrl) {
      return new Response("Invalid URL", { status: 400 });
    }

    //? Si existe la url en la base de datos, devolver el hash_url
    const existingHashURL: ShortenedURLInterface[] = await db
      .select()
      .from(shortendURLTable)
      .where(eq(shortendURLTable.url, inputURL));

    if (existingHashURL.length > 0) {
      const { hash_url } = existingHashURL[0];
      const newUrl = new URL(request.url);

      return new Response(
        JSON.stringify({
          shortUrl: `${newUrl.origin}/${hash_url}`,
        }),
        {
          status: 201,
        }
      );
    }

    const hashedURL = createRandomHash();

    const shortenedObject: ShortenedURLInterface = {
      id: crypto.randomUUID(),
      url: inputURL,
      hash_url: hashedURL,
      clicks: 0,
      createdAt: Date.now(),
    };

    //? Guardar la url en la base de datos 💀
    await db.insert(shortendURLTable).values(shortenedObject);
    const newUrl = new URL(request.url);

    return new Response(
      JSON.stringify({
        shortUrl: `${newUrl.origin}/${hashedURL}`,
      }),
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
