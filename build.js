// build.js
// Reconstruye manifest.json escaneando la carpeta assets/.
// Cada subcarpeta de assets/ (excepto "brand") es una categoría del catálogo.
// Nombra los archivos como "CODIGO - Descripcion.png" (la descripción es lo que
// se usa para buscar en el sitio). Si no hay " - ", se usa el nombre del
// archivo completo como descripción.
//
// Se ejecuta automáticamente en cada deploy (ver netlify.toml), así que basta
// con subir una imagen nueva a la carpeta correcta y hacer commit/push.

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, "assets");
const IGNORED_FOLDERS = new Set(["brand"]);
const VALID_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function parseFilename(filename) {
  const ext = path.extname(filename);
  const stem = filename.slice(0, -ext.length);
  const sepMatch = stem.match(/^(.*?)\s*-\s*(.*)$/);
  if (sepMatch) {
    return { code: sepMatch[1].trim(), desc: sepMatch[2].trim() };
  }
  return { code: stem.trim(), desc: stem.trim() };
}

function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error("No existe la carpeta assets/, nada que construir.");
    fs.writeFileSync(path.join(ROOT, "manifest.json"), "[]");
    return;
  }

  const categoryFolders = fs
    .readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !IGNORED_FOLDERS.has(d.name))
    .map((d) => d.name);

  // primera pasada: detectar códigos repetidos entre categorías
  const codeToCategories = {};
  const rawItems = [];

  categoryFolders.forEach((cat) => {
    const dir = path.join(ASSETS_DIR, cat);
    const files = fs
      .readdirSync(dir)
      .filter((f) => VALID_EXT.has(path.extname(f).toLowerCase()))
      .sort();

    files.forEach((file) => {
      const { code, desc } = parseFilename(file);
      rawItems.push({ code, desc, category: cat, file: `assets/${cat}/${file}` });
      (codeToCategories[code] = codeToCategories[code] || new Set()).add(cat);
    });
  });

  const manifest = rawItems.map((it) => {
    const collides = codeToCategories[it.code].size > 1;
    const id = collides ? `${it.category}-${it.code}` : it.code;
    return { id, name: it.desc, category: it.category, file: it.file };
  });

  fs.writeFileSync(
    path.join(ROOT, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`manifest.json generado con ${manifest.length} stickers de ${categoryFolders.length} categorías.`);
}

main();
