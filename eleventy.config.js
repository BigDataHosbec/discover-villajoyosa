module.exports = function (eleventyConfig) {
  // Archivos que se copian tal cual
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("uploads");

  // Archivos que NO forman parte de la web publicada
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("GUIA-PUESTA-EN-MARCHA.md");
  eleventyConfig.ignores.add("MANUAL-DE-USO.html");
  eleventyConfig.ignores.add("admin/**");

  // Fecha en formato español: 15 de mayo de 2026
  eleventyConfig.addFilter("fecha", (valor) => {
    const d = new Date(valor);
    return d.toLocaleDateString("es-ES", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // "En licitación" -> "en-licitacion" (para clases CSS)
  eleventyConfig.addFilter("claseEstado", (s) =>
    String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")
  );

  eleventyConfig.addFilter("porCategoria", (arr, cat) =>
    (arr || []).filter((i) => i.data.categoria === cat)
  );

  const porFecha = (tag) => (api) =>
    api.getFilteredByTag(tag).sort((a, b) => b.date - a.date);

  eleventyConfig.addCollection("noticiasDesc", porFecha("noticias"));
  eleventyConfig.addCollection("empleoDesc", porFecha("empleo"));
  eleventyConfig.addCollection("contratacionDesc", porFecha("contratacion"));
  eleventyConfig.addCollection("documentosDesc", porFecha("documentos"));

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
