const fs = require("fs");
const path = require("path");

module.exports = async function () {
  const dir = path.join(__dirname, "..", "content", "sections", "about");
  const files = fs.readdirSync(dir);
  const items = files
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath);
      return JSON.parse(raw);
    });

  return items;
};
