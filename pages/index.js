import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// API functions
import { 
  getHeroSection, 
  getAboutSection, 
  getPrograms, 
  getTeamMembers, 
  getArticles, 
  getTimeline, 
  getGalleryItems, 
  getLocation, 
  getSiteSettings 
} from '../lib/api';

// Components
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProgramsSection from '../components/home/ProgramsSection';
import TeamSection from '../components/home/TeamSection';
import ArticlesSection from '../components/home/ArticlesSection';
import TimelineSection from '../components/home/TimelineSection';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';
import LocationSection from '../components/home/LocationSection';
import ScrollToTopButton from '../components/shared/ScrollToTopButton';

export default function Home({ 
  hero, 
  about, 
  programs, 
  teamMembers, 
  articles, 
  timeline, 
  galleryItems, 
  location, 
  settings 
}) {
  return (
    <Layout settings={settings}>
      <Head>
        <title>Karir dan Karya Mahasiswa | BEM KM UNY</title>
        <meta name="description" content="Departemen Karir dan Karya Mahasiswa BEM KM Universitas Negeri Yogyakarta - Empowering students through career development and creative outlets" />
        <meta name="keywords" content="BEM KM UNY, Karir Mahasiswa, Karya Mahasiswa, UNY, Universitas Negeri Yogyakarta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <ProgramsSection data={programs} />
        <TeamSection data={teamMembers} />
        <ArticlesSection data={articles} />
        <TimelineSection data={timeline} />
        <GallerySection data={galleryItems} />
        <ContactSection data={settings?.contactInfo} />
        <LocationSection data={location} />
      </main>

      <ScrollToTopButton />

      {/* GSAP for animations */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      
      {/* SwiperJS for carousels */}
      <Script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js" strategy="afterInteractive" />
    </Layout>
  );
}

export async function getStaticProps() {
  const hero = await getHeroSection();
  const about = await getAboutSection();
  const programs = await getPrograms();
  const teamMembers = await getTeamMembers();
  const articles = await getArticles({ limit: 4 });
  const timeline = await getTimeline();
  const galleryItems = await getGalleryItems({ limit: 6 });
  const location = await getLocation();
  const settings = await getSiteSettings();

  return {
    props: {
      hero: hero || null,
      about: about || null,
      programs: programs || [],
      teamMembers: teamMembers || [],
      articles: articles || [],
      timeline: timeline || [],
      galleryItems: galleryItems || [],
      location: location || null,
      settings: settings || null
    },
    revalidate: 60, // Revalidate at most once per minute
  };
}
