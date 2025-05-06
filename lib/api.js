import { client } from './sanity';
import { groq } from 'next-sanity';

// Hero Section
export async function getHeroSection() {
  const query = groq`*[_type == "hero"][0]`;
  const hero = await client.fetch(query);
  return hero;
}

// About Section
export async function getAboutSection() {
  const query = groq`*[_type == "about"][0]`;
  const about = await client.fetch(query);
  return about;
}

// Programs
export async function getPrograms() {
  const query = groq`*[_type == "program"] | order(order asc)`;
  const programs = await client.fetch(query);
  return programs;
}

// Team Members
export async function getTeamMembers() {
  const query = groq`*[_type == "teamMember"] | order(order asc)`;
  const team = await client.fetch(query);
  return team;
}

// Articles (with pagination)
export async function getArticles({ limit = 10, offset = 0, category = null }) {
  let query = groq`*[_type == "article"]`;
  
  if (category) {
    query += groq` && references(*[_type=="category" && slug.current == "${category}"]._id)`;
  }
  
  query += groq` | order(publishedAt desc) [${offset}...${offset + limit}] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;
  
  const articles = await client.fetch(query);
  return articles;
}

// Total article count (for pagination)
export async function getArticleCount(category = null) {
  let query = groq`count(*[_type == "article"`;
  
  if (category) {
    query += groq` && references(*[_type=="category" && slug.current == "${category}"]._id)`;
  }
  
  query += groq`])`;
  
  const count = await client.fetch(query);
  return count;
}

// Single Article
export async function getArticleBySlug(slug) {
  const query = groq`*[_type == "article" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    body,
    publishedAt,
    mainImage,
    "author": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;
  
  const article = await client.fetch(query);
  return article;
}

// Categories
export async function getCategories() {
  const query = groq`*[_type == "category"] | order(title asc)`;
  const categories = await client.fetch(query);
  return categories;
}

// Timeline
export async function getTimeline() {
  const query = groq`*[_type == "timeline"] | order(order asc)`;
  const timeline = await client.fetch(query);
  return timeline;
}

// Gallery Items (with pagination)
export async function getGalleryItems({ limit = 10, offset = 0, category = null }) {
  let query = groq`*[_type == "galleryItem"]`;
  
  if (category) {
    query += groq` && references(*[_type=="category" && slug.current == "${category}"]._id)`;
  }
  
  query += groq` | order(date desc) [${offset}...${offset + limit}] {
    _id,
    title,
    slug,
    description,
    date,
    image,
    "categories": categories[]->title
  }`;
  
  const gallery = await client.fetch(query);
  return gallery;
}

// Total gallery item count (for pagination)
export async function getGalleryItemCount(category = null) {
  let query = groq`count(*[_type == "galleryItem"`;
  
  if (category) {
    query += groq` && references(*[_type=="category" && slug.current == "${category}"]._id)`;
  }
  
  query += groq`])`;
  
  const count = await client.fetch(query);
  return count;
}

// Single Gallery Item
export async function getGalleryItemBySlug(slug) {
  const query = groq`*[_type == "galleryItem" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    description,
    date,
    image,
    "categories": categories[]->title
  }`;
  
  const galleryItem = await client.fetch(query);
  return galleryItem;
}

// Location Section
export async function getLocation() {
  const query = groq`*[_type == "location"][0]`;
  const location = await client.fetch(query);
  return location;
}

// Site Settings
export async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]`;
  const settings = await client.fetch(query);
  return settings;
}
