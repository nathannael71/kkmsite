import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* SwiperJS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
      </Head>
      <body className="bg-white dark:bg-apple-darkgray text-apple-darkgray dark:text-white transition-colors duration-500 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
