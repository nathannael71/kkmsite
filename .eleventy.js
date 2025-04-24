module.exports = function(eleventyConfig) {
  // Pass-through file copy untuk assets dan admin panel
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");

  // Untuk memproses konten JSON
  eleventyConfig.addDataExtension("json", contents => JSON.parse(contents));

  // Collection untuk setiap bagian (pakai JSON)
  eleventyConfig.addCollection("aboutItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/about/*.json");
  });

  eleventyConfig.addCollection("programItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/programs/*.json");
  });

  eleventyConfig.addCollection("teamMembers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/team/*.json");
  });

  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/articles/*.json");
  });

  eleventyConfig.addCollection("timelineEvents", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/timeline/*.json");
  });

  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/gallery/*.json");
  });

  eleventyConfig.addCollection("contactInfo", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/contact/*.json");
  });

  eleventyConfig.addCollection("locationData", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/location/*.json");
  });

  eleventyConfig.addCollection("header", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/header.json");
  });

  eleventyConfig.addCollection("footer", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/sections/footer.json");
  });

  // Konfigurasi utama Eleventy
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "json"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
