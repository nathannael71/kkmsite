module.exports = function (eleventyConfig) {
  // Pass through static files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");

  // Custom collections if needed
  eleventyConfig.addCollection("teamMembers", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/_data/team/*.json");
  });

  eleventyConfig.addCollection("programs", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/_data/programs/*.json");
  });

  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/_data/articles/*.json");
  });

  eleventyConfig.addCollection("timelineEvents", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/_data/timeline/*.json");
  });

  eleventyConfig.addCollection("galleryItems", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/_data/gallery/*.json");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
