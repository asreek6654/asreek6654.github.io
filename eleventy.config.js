import YAML from "yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", contents => YAML.parse(contents));
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("byYear", papers => {
    const years = [...new Set(papers.map(paper => Number(paper.year)))].sort((a, b) => b - a);
    return years.map(year => ({ year, papers: papers.filter(paper => Number(paper.year) === year) }));
  });
  eleventyConfig.addFilter("selected", papers => papers.filter(paper => paper.selected));
  eleventyConfig.addCollection("navigation", collection => collection.getAll()
    .filter(page => page.data.nav)
    .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100)));

  return {
    dir: { input: "src", output: "dist" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.SITE_PATH_PREFIX || "/"
  };
}
