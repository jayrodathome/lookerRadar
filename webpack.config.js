// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",                   // removes the warning
  entry: "./src/radar_chart.js",        // ← point to your actual source file
  output: {
    filename: "radar_chart.js",         // this will land in docs/
    path: path.resolve(__dirname, "docs")
  }
};
