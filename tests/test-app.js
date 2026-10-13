// Basic automated smoke tests using only Node.js built-in modules.
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const dockerfile = fs.readFileSync(path.join(root, "Dockerfile"), "utf8");

assert(html.includes("Smart Agricultural System") || html.includes("AgriSmart"), "App title/content should exist");
assert(html.includes('id="dashboard"'), "Dashboard section should exist");
assert(html.includes('id="crops"'), "Crop health section should exist");
assert(html.includes('id="yield"'), "Yield section should exist");
assert(html.includes('id="farmerForm"'), "Farmer registration form should exist");
assert(html.includes('href="style.css"'), "CSS should be linked");
assert(html.includes('src="script.js"'), "JavaScript should be linked");
assert(css.includes(".stats-grid"), "Dashboard styling should exist");
assert(js.includes("preventDefault"), "Form should prevent default submission");
assert(js.includes("addEventListener"), "Events should use addEventListener");
assert(dockerfile.includes("FROM nginx"), "Dockerfile should use Nginx base image");

console.log("PASS: All AgriSmart smoke tests passed.");
