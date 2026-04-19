import { defineCollection, defineConfig } from "@content-collections/core";
import GithubSlugger from "github-slugger";
import { z } from "zod";

const docs = defineCollection({
  name: "docs",
  directory: "src/collections/legal",
  include: "**/*.mdx",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
  }),
  transform: (doc) => {
    const segments = {
      es: "legal",
      en: "legal",
      pt: "legal",
      fr: "legal",
      it: "legal",
      de: "legal",
    } as Record<string, string>;

    const [locale, slug] = doc._meta.path.split("/");
    const pathname = `/${segments[locale]}/${slug}`;

    return { ...doc, locale, pathname, slug };
  },
});

const tutorials = defineCollection({
  name: "tutorials",
  directory: "src/collections/tutorials",
  include: "**/*.mdx",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    short: z.string().optional(),
    description: z.string(),
    category: z.string(),
    content: z.string(),
    author: z.string().optional().default("Inmoedit"),
    avatar: z.string().optional(),
    date: z.string().optional(),
  }),
  transform: (tutorial) => {
    const segments = {
      es: "tutoriales",
      en: "tutorials",
      pt: "tutoriais",
      fr: "tutoriels",
      it: "tutorial",
      de: "anleitungen",
    } as Record<string, string>;

    const [locale, slug] = tutorial._meta.path.split("/");
    const pathname = `/${segments[locale]}/${slug}`;

    const words = tutorial.content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: { depth: number; text: string; slug: string }[] = [];
    const slugger = new GithubSlugger();
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(tutorial.content)) !== null) {
      const text = match[2]
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/_([^_]+)_/g, "$1")
        .replace(/`([^`]*)`/g, "$1");
      headings.push({
        depth: match[1].length,
        text,
        slug: slugger.slug(text),
      });
    }

    return { ...tutorial, locale, pathname, slug, readingTime, headings };
  },
});

const landings = defineCollection({
  name: "landings",
  directory: "src/collections/landings",
  include: "**/*.json",
  parser: "json",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    short: z.string().optional(),
    category: z.string().optional(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      images: z
        .array(
          z.object({
            label: z.string(),
            before: z.string(),
            after: z.string(),
            "before-alt": z.string(),
            "after-alt": z.string(),
            icon: z.string(),
          }),
        )
        .optional(),
    }),
    sections: z.array(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("features"),
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              icon: z.string(),
              button: z.string(),
            }),
          ),
        }),
        z.object({
          type: z.literal("banner"),
          title: z.string(),
          description: z.string(),
          button: z.string(),
        }),
        z.object({
          type: z.literal("faqs"),
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({ title: z.string(), description: z.string() }),
          ),
        }),
        z.object({
          type: z.literal("guides"),
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              href: z.string(),
              icon: z.string(),
            }),
          ),
        }),
        z.object({
          type: z.literal("comparison"),
          title: z.string(),
          description: z.string(),
          competitor: z.string(),
          rows: z.array(
            z.object({
              feature: z.string(),
              inmoedit: z.union([z.boolean(), z.string()]),
              competitor: z.union([z.boolean(), z.string()]),
            }),
          ),
        }),
        z.object({
          type: z.literal("youtube"),
          title: z.string(),
          description: z.string(),
          videoId: z.string(),
        }),
        z.object({
          type: z.literal("examples"),
          title: z.string(),
          description: z.string(),
          items: z.array(
            z.discriminatedUnion("media", [
              z.object({
                media: z.literal("comparison"),
                title: z.string(),
                description: z.string(),
                before: z.string(),
                after: z.string(),
                "before-alt": z.string(),
                "after-alt": z.string(),
              }),
              z.object({
                media: z.literal("image"),
                title: z.string(),
                description: z.string(),
                src: z.string(),
                alt: z.string(),
              }),
              z.object({
                media: z.literal("video"),
                title: z.string(),
                description: z.string(),
                src: z.string(),
                poster: z.string().optional(),
              }),
            ]),
          ),
        }),
      ]),
    ),
  }),
  transform: (landing) => {
    const [locale, ...segments] = landing._meta.path.split("/");
    const route = segments.join("/");
    const slug = segments[segments.length - 1];
    const pathname = `/${route}`;

    return { ...landing, locale, pathname, slug, route };
  },
});

export default defineConfig({
  collections: [docs, tutorials, landings],
});
