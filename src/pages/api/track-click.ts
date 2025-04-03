import type { APIRoute } from "astro";
import { db, eq, shortendURLTable } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { hashURL, clicks } = await request.json();

    if (!hashURL || !clicks === undefined) {
      return new Response("Short URL or clicks are required", { status: 400 });
    }

    //? Actualizar el clickCount
    const res = await db
      .update(shortendURLTable)
      .set({ clicks: clicks + 1 })
      .where(eq(shortendURLTable.hash_url, hashURL));

    if (res?.affectedRows === 0) {
      return new Response("Click not tracked", { status: 404 });
    }

    console.log(res);
    return new Response("Click tracked", { status: 200 });
  } catch (error) {
    console.error("Error tracking click:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
