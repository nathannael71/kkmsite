module.exports = function(eleventyConfig) {
  // Salin asset statis
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  // Tambahkan transformasi untuk mengatur output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Bypass untuk non-HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    
    // Mengembalikan konten tanpa minifikasi
    return content;
  });

  // Tambahkan filter tanggal
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
