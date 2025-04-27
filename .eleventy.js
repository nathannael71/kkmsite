module.exports = function(eleventyConfig) {
  // Salin asset statis
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  
  // Tambahkan passthrough untuk node_modules yang dibutuhkan oleh CMS
  eleventyConfig.addPassthroughCopy({
    "node_modules/netlify-cms-app/dist": "node_modules/netlify-cms-app/dist"
  });

  // Transformasi dan filter yang sudah ada
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Bypass untuk non-HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    
    // Mengembalikan konten tanpa minifikasi
    return content;
  });

  eleventyConfig.addFilter("formatDate", function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  // Return konfigurasi Eleventy
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
