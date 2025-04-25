module.exports = function(eleventyConfig) {
  // Passthrough copy buat asset dan admin
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("admin");

  // Tambahkan watcher supaya JSON kebaca otomatis
  eleventyConfig.addWatchTarget("content/sections/about");

  // Proses file .json sebagai data
  eleventyConfig.addDataExtension("json", contents => JSON.parse(contents));

  // Koleksi dinamis
  eleventyConfig.addCollection("aboutItems", function(collectionApi) {
    const items = collectionApi.getFilteredByGlob("content/sections/about/*.json");
    console.log("About Items found:", items.length);
    return items;
  });

  eleventyConfig.addCollection("programItems", c => c.getFilteredByGlob("content/sections/programs/*.json"));
  eleventyConfig.addCollection("teamMembers", c => c.getFilteredByGlob("content/sections/team/*.json"));
  eleventyConfig.addCollection("articles", c => c.getFilteredByGlob("content/sections/articles/*.json"));
  eleventyConfig.addCollection("timelineEvents", c => c.getFilteredByGlob("content/sections/timeline/*.json"));
  eleventyConfig.addCollection("galleryItems", c => c.getFilteredByGlob("content/sections/gallery/*.json"));
  eleventyConfig.addCollection("contactInfo", c => c.getFilteredByGlob("content/sections/contact/*.json"));
  eleventyConfig.addCollection("locationData", c => c.getFilteredByGlob("content/sections/location/*.json"));
  eleventyConfig.addCollection("header", c => c.getFilteredByGlob("content/sections/header.json"));
  eleventyConfig.addCollection("footer", c => c.getFilteredByGlob("content/sections/footer.json"));

  // Return config Eleventy
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html", "json"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
