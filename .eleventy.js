module.exports = function(eleventyConfig) {
  // Pass-through file copy for static assets
  eleventyConfig.addPassthroughCopy("public");
  
  // Add collections for each editable section
  eleventyConfig.addCollection("aboutItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/about/*.json");
  });
  
  eleventyConfig.addCollection("programItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/programs/*.json");
  });
  
  eleventyConfig.addCollection("teamMembers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/team/*.json");
  });
  
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/articles/*.json");
  });
  
  eleventyConfig.addCollection("timelineEvents", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/timeline/*.json");
  });
  
  eleventyConfig.addCollection("galleryItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/gallery/*.json");
  });
  
  // Add shortcodes, filters, etc. here if needed
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
