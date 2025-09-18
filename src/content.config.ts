// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    // accept DD/MM/YYYY and turn it into a JS Date
    pubDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .transform((str) => {
        const [day, month, year] = str.split("/").map(Number);
        return new Date(year, month - 1, day);
      }),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog };
