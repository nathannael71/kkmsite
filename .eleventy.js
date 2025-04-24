module.exports = function(eleventyConfig) {
  // Pass-through file copy untuk assets dan admin
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");
  
  // Collections untuk konten yang bisa diedit
  eleventyConfig.addCollection("aboutItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/about/*.md");
  });
  
  eleventyConfig.addCollection("programItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/programs/*.md");
  });
  
  eleventyConfig.addCollection("teamMembers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/team/*.md");
  });
  
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/articles/*.md");
  });
  
  eleventyConfig.addCollection("timelineEvents", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/timeline/*.md");
  });
  
  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("sections/gallery/*.md");
  });
  
  // Untuk memproses konten dari JSON
  eleventyConfig.addDataExtension("json", contents => {
    return JSON.parse(contents);
  });

  // Konfigurasi dasar Eleventy
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
