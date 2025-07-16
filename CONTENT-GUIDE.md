# Content Management Guide

Your Astro portfolio site is now fully dynamic and content-driven! Here's how to customize everything:

## 🎯 Site Configuration (`/src/content/config/site-config.md`)

```yaml
---
siteName: "Your Name"
siteTitle: "Your Name - Your Title"
heroName: "Your Name"
email: "your.email@example.com"
phone: "+1 234 567 8900"
footerText: "&copy; 2024 Your Name, All Rights Reserved."
portfolioDescription: "Your portfolio description here..."
blogDescription: "Your blog section description..."
contactTitle: "Get In Touch"
contactDescription: "Ready to work together? Let's create something amazing!"

# Add unlimited social links with any icons
socialLinks:
  - name: "GitHub"
    url: "https://github.com/yourusername"
    icon: "bi-github"
  - name: "LinkedIn"
    url: "https://linkedin.com/in/yourusername"
    icon: "bi-linkedin"
  - name: "Dribbble"
    url: "https://dribbble.com/yourusername"
    icon: "bi-dribbble"
  - name: "Behance"
    url: "https://behance.net/yourusername"
    icon: "bi-behance"
---
```

## 👤 Personal Info (`/src/content/personal/personal-info.md`)

```yaml
---
name: "Your Name"
title: "Your Professional Title"
biography: "Your personal biography here..."
skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"]
avatar: "/path/to/your/photo.jpg"

# Add unlimited custom stats with any title and value
stats:
  - title: "Projects Completed"
    value: 150
  - title: "Years Experience"
    value: "8+"
  - title: "Happy Clients"
    value: 200
  - title: "Coffee Cups"
    value: "2.5K"
  - title: "Lines of Code"
    value: "100K+"
  - title: "Awards Won"
    value: 25
---
```

## 📁 Portfolio Projects (`/src/content/portfolio/your-project.md`)

```yaml
---
title: "Your Project Name"
description: "Brief project description"
image: "/assets/images/your-project.jpg"
category: "Web Development"
categories: ["Web Dev", "UI/UX", "Branding"]

# All fields below are optional - they only show if provided
client: "Client Name"              # Optional
services: ["Design", "Development"] # Optional
duration: "6 weeks"               # Optional  
projectLink: "https://project.com" # Optional
gallery: ["/img1.jpg", "/img2.jpg"] # Optional
videoUrl: "https://youtube.com/..." # Optional
technologies: ["React", "Node.js"]  # Optional
completionDate: "March 2024"       # Optional
featured: true
order: 1
---

# Project Details

Write your full project description here using Markdown...

## Features

- Feature 1
- Feature 2
- Feature 3
```

## 📝 Blog Posts (`/src/content/blog/your-post.md`)

```yaml
---
title: "Your Blog Post Title"
description: "Brief post description"
publishDate: 2024-11-25

# All fields below are optional - they only show if provided
category: "Development"           # Optional
author: "Author Name"            # Optional
image: "/assets/images/post.jpg" # Optional  
tags: ["tag1", "tag2", "tag3"]   # Optional
featured: true
---

# Your Blog Post

Write your blog content here using Markdown...
```

## 🎨 Services (`/src/content/services/service-name.md`)

```yaml
---
title: "Service Name"
description: "Service description"
icon: "bi-code-slash"  # Bootstrap icon class
order: 1
---
```

## ✨ Key Features

✅ **Fully Dynamic**: All content managed through Markdown files
✅ **Conditional Rendering**: Missing fields don't show empty UI sections  
✅ **Unlimited Customization**: Add as many stats, social links, etc. as you want
✅ **No Code Changes**: Update content without touching any code
✅ **SEO Friendly**: Dynamic meta tags and page titles
✅ **Type Safe**: Schema validation ensures data integrity

## 🚀 Adding New Content

1. **New Portfolio Project**: Create `new-project.md` in `/src/content/portfolio/`
2. **New Blog Post**: Create `new-post.md` in `/src/content/blog/` 
3. **New Service**: Create `new-service.md` in `/src/content/services/`

The site automatically picks up new files and generates pages!

## 🎯 Pro Tips

- Use any Bootstrap icon class for social links and services
- Images should be placed in `/public/assets/images/`
- Order fields control the display sequence
- Featured content appears on the homepage
- All optional fields are truly optional - they won't show if missing
