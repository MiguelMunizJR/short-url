import type { APIRoute } from "astro";
import type { ShortenedURLInterface } from "./shorten";

const db: ShortenedURLInterface[] = [];

export const GET: APIRoute = async ({ params, redirect }) => {
  try {
    const url_id = params.url_id as string;

    //? Verificar si la url ya existe en la base de datos 
    const shortenedURL: ShortenedURLInterface | undefined = db.find(
      (shortenedUrl) => {
        if (shortenedUrl.hash_url === url_id) {
          return shortenedUrl;
        }
      }
    );

    if (!shortenedURL) {
      return new Response("URL not found", { status: 404 });
    }

    return redirect(shortenedURL.url, 301);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
