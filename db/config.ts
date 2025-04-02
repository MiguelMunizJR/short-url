import { column, defineDb, defineTable } from 'astro:db';

const shortendURLTable = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    url: column.text({ optional: false }),
    hash_url: column.text({  optional: false }),
    clicks: column.number({ default: 0 }),
    createdAt: column.number(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    shortendURLTable
  }
});
