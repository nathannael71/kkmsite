import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'your-project-id', // Replace with your actual project ID
  dataset: 'production',
  apiVersion: '2023-10-25',
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper function for generating image URLs with Sanity Image Pipeline
export const urlFor = (source) => {
  return imageUrlBuilder(client).image(source);
};
