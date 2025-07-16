import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Site configuration collection
const siteConfig = defineCollection({
  loader: glob({ pattern: 'site-config.md', base: './src/content/config' }),
  schema: z.object({
    siteName: z.string(),
    siteTitle: z.string(),
    siteDescription: z.string(),
    siteKeywords: z.string(),
    heroName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    footerText: z.string(),
    portfolioDescription: z.string(),
    blogDescription: z.string().optional(),
    contactTitle: z.string().optional(),
    contactDescription: z.string().optional(),
    socialLinks: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      icon: z.string(),
    })),
  }),
});

// Personal info collection
const personalInfo = defineCollection({
  loader: glob({ pattern: 'personal-info.md', base: './src/content/personal' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    biography: z.string(),
    skills: z.array(z.string()),
    avatar: z.string(),
    stats: z.array(z.object({
      title: z.string(),
      value: z.union([z.string(), z.number()]),
    })),
  }),
});

// Services collection
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

// Portfolio collection
const portfolio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    categories: z.array(z.string()).optional(),
    category: z.string().optional(), // Keep for backward compatibility
    url: z.string().url().optional(),
    link: z.string().url().optional(), // Alternative link field
    featured: z.boolean().default(false),
    order: z.number().optional(),
    // Additional fields for single project page
    client: z.string().optional(),
    services: z.array(z.string()).optional(),
    duration: z.string().optional(),
    projectLink: z.string().url().optional(),
    gallery: z.array(z.string()).optional(),
    videoUrl: z.string().url().optional(),
    technologies: z.array(z.string()).optional(),
    completionDate: z.string().optional(),
  }),
});

// Awards collection
const awards = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/awards' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

// Testimonials collection
const testimonials = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    company: z.string(),
    avatar: z.string(),
    testimonial: z.string(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

// Blog collection
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    author: z.string().optional(),
    publishDate: z.date(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

// Clients collection
const clients = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  siteConfig,
  personalInfo,
  services,
  portfolio,
  awards,
  testimonials,
  blog,
  clients,
};
