# Mone - Dynamic Portfolio Template

This is a modern, fully customizable personal portfolio website built with Astro and Tailwind CSS. All content is managed through Astro Content Collections using Markdown files, making it easy to update without touching any code.

## ✨ Features

- **Fully Dynamic Content**: All text, images, and data are stored in Markdown files
- **Content Collections**: Well-structured content management with type safety
- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Easy Customization**: Update content by editing Markdown files only
- **Type Safe**: Full TypeScript support with Zod schemas
- **Fast**: Built with Astro for optimal performance

## 📁 Content Structure

All editable content is located in the `src/content/` directory:

```
src/content/
├── config/           # Site configuration
│   └── site-config.md
├── personal/         # Personal information
│   └── personal-info.md
├── services/         # Services offered
│   ├── design.md
│   ├── development.md
│   └── marketing.md
├── portfolio/        # Portfolio projects
│   ├── ecommerce-platform.md
│   ├── mobile-app-design.md
│   └── corporate-website.md
├── awards/           # Awards and achievements
│   ├── best-designer-2024.md
│   ├── true-gem-2023.md
│   └── ...
├── testimonials/     # Client testimonials
│   ├── alexander-warren.md
│   └── sarah-johnson.md
├── blog/            # Blog posts
│   ├── future-of-web-development.md
│   ├── design-systems-component-libraries.md
│   └── ...
└── clients/         # Client logos/links
    ├── techcorp-solutions.md
    ├── creative-agency.md
    └── ...
```

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ✏️ Customizing Content

### Site Configuration
Edit `src/content/config/site-config.md` to update:
- Site name and title
- Contact information
- Social media links
- Portfolio description

### Personal Information
Edit `src/content/personal/personal-info.md` to update:
- Your name and title
- Biography
- Skills list
- Statistics (projects done, years experience, etc.)

### Services
Add/edit files in `src/content/services/` to update your services:
- Service title and description
- Icons and links
- Display order

### Portfolio Projects
Add/edit files in `src/content/portfolio/` to showcase your work:
- Project title and description
- Categories/tags
- Project images
- External links
- Display order

### Awards & Testimonials
Add achievements in `src/content/awards/` and client feedback in `src/content/testimonials/`

### Blog Posts
Add articles in `src/content/blog/` with featured post support

### Client Logos
Add client information in `src/content/clients/` to display logos/links

## 🎨 Customizing Design

The visual design can be customized by editing:
- `src/styles/global.css` - Global styles
- `tailwind.config.js` - Tailwind configuration
- Component files in `src/components/` - Individual components

## 📝 Adding New Content

To add new content items:
1. Create a new Markdown file in the appropriate content directory
2. Follow the existing frontmatter structure
3. Add your content in Markdown format
4. The site will automatically include the new content

## 🔧 Technical Details

- **Framework**: Astro 5.10.0
- **Styling**: Tailwind CSS
- **Content**: Astro Content Collections with Zod schemas
- **Type Safety**: Full TypeScript support
- **Build**: Static site generation

---

**Original Template**: Astro Starter Kit
**Enhanced**: Dynamic content collections implementation

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
