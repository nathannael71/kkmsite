module.exports = function(eleventyConfig) {
  // Passthrough folders
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("content");

  // Enable JSON file parsing
  eleventyConfig.addDataExtension("json", contents => JSON.parse(contents));

  // COLLECTION: About
  eleventyConfig.addCollection("aboutItems", function(collectionApi) {
    const items = collectionApi.getFilteredByGlob("content/sections/about/*.json");
    console.log("About Items found:", items.length); // Debug ke console
    return items;
  eleventyConfig.addWatchTarget("content/sections/about");
  });

  // COLLECTION: Lainnya
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
  eleventyConfig.ignores = eleventyConfig.ignores || [];
  eleventyConfig.ignores = eleventyConfig.ignores.filter(i => i !== "**/*.json"); // pastikan JSON tidak diabaikan
  // Final return
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html", "md", "json"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
