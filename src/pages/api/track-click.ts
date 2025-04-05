import type { APIRoute } from "astro";
import { db, eq, shortendURLTable } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const { hashURL } = await request.json();

  if (!hashURL) {
    return new Response("Short URL or clicks are required", { status: 400 });
  }

  try {
    //? Compobamos que exista
    const [existingEntry] = await db
      .select()
      .from(shortendURLTable)
      .where(eq(shortendURLTable.hash_url, hashURL));

    if (!existingEntry) {
      return new Response("URL not found", { status: 404 });
    }

    const res = await db
      .update(shortendURLTable)
      .set({ clicks: existingEntry.clicks + 1 })
      .where(eq(shortendURLTable.hash_url, hashURL));

    if (res?.affectedRows === 0) {
      return new Response("Click not tracked", { status: 404 });
    }

    return new Response("Click tracked", { status: 200 });
  } catch (error) {
    console.error("Error tracking click:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
