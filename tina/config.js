import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || "",
token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "public/images/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // Site Settings
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header Settings",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "image", name: "unyLogo", label: "UNY Logo" },
              { type: "image", name: "bemLogo", label: "BEM Logo" },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item.text };
                  },
                },
                fields: [
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "url", label: "URL" },
                  { type: "string", name: "icon", label: "Icon Class", description: "Font Awesome icon class, e.g., fa-home" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Settings",
            fields: [
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "unyLogo", label: "UNY Logo" },
              { type: "image", name: "bemLogo", label: "BEM Logo" },
              {
                type: "object",
                name: "socialMedia",
                label: "Social Media",
                list: true,
                fields: [
                  { type: "string", name: "platform", label: "Platform" },
                  { type: "string", name: "url", label: "URL" },
                  { type: "string", name: "icon", label: "Icon Class", description: "Font Awesome icon class, e.g., fa-instagram" },
                ],
              },
              {
                type: "object",
                name: "quickLinks",
                label: "Quick Links",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "url", label: "URL" },
                ],
              },
              {
                type: "object",
                name: "contactInfo",
                label: "Contact Info",
                fields: [
                  { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "instagram", label: "Instagram" },
                  { type: "string", name: "instagramUrl", label: "Instagram URL" },
                ],
              },
              {
                type: "object",
                name: "legalLinks",
                label: "Legal Links",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "url", label: "URL" },
                ],
              },
              { type: "string", name: "copyright", label: "Copyright Text" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Title", ui: { component: "textarea" } },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "buttonUrl", label: "Button URL" },
              {
                type: "object",
                name: "slides",
                label: "Slides",
                list: true,
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Kontak Kami" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "formAction", label: "Form Action URL" },
              {
                type: "object",
                name: "contactInfo",
                label: "Contact Info",
                fields: [
                  { type: "string", name: "instagram", label: "Instagram" },
                  { type: "string", name: "instagramUrl", label: "Instagram URL" },
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "location",
            label: "Location Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Lokasi Kami" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "locationName", label: "Location Name" },
              { type: "string", name: "fullAddress", label: "Full Address", ui: { component: "textarea" } },
              { type: "string", name: "mapUrl", label: "Map URL", description: "Google Maps embed URL" },
              { type: "string", name: "directionsUrl", label: "Directions URL" },
              {
                type: "object",
                name: "cta",
                label: "CTA",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonUrl", label: "Button URL" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "aboutSettings",
            label: "About Section Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Tentang Kami" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "programsSettings",
            label: "Programs Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Program Kami" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "teamSettings",
            label: "Team Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Tim Kami" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "articlesSettings",
            label: "Articles Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Artikel Terbaru" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "viewAllButtonText", label: "View All Button Text", default: "View All Articles" },
              { type: "string", name: "viewAllButtonUrl", label: "View All Button URL", default: "/articles" },
            ],
          },
          {
            type: "object",
            name: "timelineSettings",
            label: "Timeline Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Timeline Program" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "gallerySettings",
            label: "Gallery Settings",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "sectionLabel", label: "Section Label", default: "Galeri Kegiatan" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "viewAllButtonText", label: "View All Button Text", default: "View Full Gallery" },
              { type: "string", name: "viewAllButtonUrl", label: "View All Button URL", default: "/gallery" },
            ],
          },
        ],
      },
      
      // About Items
      {
        name: "about",
        label: "About Items",
        path: "content/about",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "number", name: "order", label: "Order", default: 1 },
          { type: "string", name: "icon", label: "Icon", description: "Font Awesome icon class, e.g., fa-graduation-cap" },
          { type: "string", name: "iconBg", label: "Icon Background Color", default: "blue-500" },
          { type: "string", name: "contentTitle", label: "Content Title" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        ],
      },
      
      // Programs
      {
        name: "programs",
        label: "Programs",
        path: "content/programs",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Image" },
          { type: "string", name: "status", label: "Status", default: "Coming Soon" },
          { type: "number", name: "order", label: "Order", default: 1 },
        ],
      },
      
      // Team Members
      {
        name: "team",
        label: "Team Members",
        path: "content/team",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "position", label: "Position" },
          { type: "image", name: "photo", label: "Photo" },
          { type: "string", name: "instagram", label: "Instagram", required: false },
          { type: "string", name: "email", label: "Email", required: false },
          { type: "string", name: "linkedin", label: "LinkedIn", required: false },
          { type: "number", name: "order", label: "Order", default: 1 },
        ],
      },
      
      // Articles
      {
        name: "articles",
        label: "Articles",
        path: "content/articles",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "rich-text", name: "content", label: "Content" },
          { type: "image", name: "image", label: "Image" },
          { type: "string", name: "author", label: "Author" },
          { type: "image", name: "authorPhoto", label: "Author Photo" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "slug", label: "Slug" },
          { type: "number", name: "order", label: "Order", default: 1 },
        ],
      },
      
      // Timeline Events
      {
        name: "timeline",
        label: "Timeline Events",
        path: "content/timeline",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "date", label: "Date" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "buttonText", label: "Button Text", default: "Coming Soon" },
          { type: "number", name: "order", label: "Order", default: 1 },
        ],
      },
      
      // Gallery Items
      {
        name: "gallery",
        label: "Gallery Items",
        path: "content/gallery",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "date", label: "Date" },
          { type: "image", name: "image", label: "Image" },
          { type: "number", name: "order", label: "Order", default: 1 },
        ],
      },
    ],
  },
});
