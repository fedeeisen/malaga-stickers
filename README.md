# Málaga Stickers — guía rápida

## Qué es cada archivo
- `index.html` — el sitio en sí.
- `assets/iconos/`, `assets/frases/` — las imágenes del catálogo, organizadas por categoría (una carpeta = una categoría).
- `assets/brand/logo.png` — el logo del sitio.
- `manifest.json` — lista de todos los stickers. **Se genera automáticamente**, no se edita a mano.
- `categories.json` — el nombre "bonito" de cada categoría (carpeta → texto que se ve en el sitio).
- `build.js` — script que escanea `assets/` y regenera `manifest.json`.
- `netlify.toml` — le dice a Netlify que ejecute `build.js` antes de publicar.

## Cómo publicar el sitio (una sola vez)

**Paso 1 — Crear una cuenta en GitHub** (gratis): https://github.com/signup

**Paso 2 — Crear un repositorio nuevo**
1. En GitHub, botón "New repository".
2. Nómbralo, por ejemplo, `malaga-stickers`. Puede ser privado o público, da igual.
3. Crea el repositorio (sin plantillas, vacío).

**Paso 3 — Subir esta carpeta al repositorio**
1. Dentro del repositorio recién creado, click en "uploading an existing file" (o "Add file" → "Upload files").
2. Arrastra **todo el contenido** de esta carpeta (`index.html`, `assets/`, `manifest.json`, `categories.json`, `build.js`, `netlify.toml`) — no la carpeta en sí, sino lo que hay dentro.
3. Commit.

**Paso 4 — Crear cuenta en Netlify** (gratis): https://app.netlify.com/signup — puedes registrarte directamente con tu cuenta de GitHub.

**Paso 5 — Conectar el repositorio**
1. En Netlify: "Add new site" → "Import an existing project" → "Deploy with GitHub".
2. Elige el repositorio `malaga-stickers`.
3. Netlify detecta automáticamente el `netlify.toml` (build command `node build.js`, publish `.`). Dale a "Deploy".
4. En 1-2 minutos tendrás una URL en vivo tipo `algo-al-azar.netlify.app`.
5. Opcional: en "Site settings" → "Change site name" para elegir una URL más linda, o conectar tu propio dominio si tienes uno.

## Cómo agregar stickers nuevos (sin ayuda, cuando quieras)

1. Entra a tu repositorio en github.com.
2. Ve a `assets/iconos/` o `assets/frases/` (o crea una carpeta nueva dentro de `assets/` si quieres una categoría nueva).
3. "Add file" → "Upload files" → sube la imagen.
4. **Nombra el archivo como `CODIGO - Descripcion.png`** — por ejemplo `L170 - MOCHILA.png`. El código es solo para identificarlo (no se repite dentro de la misma carpeta), la descripción es lo que se usa para buscar en el sitio.
5. Commit. Netlify detecta el cambio, corre `build.js` automáticamente y en 1-2 minutos el sticker ya está publicado — no hace falta tocar `manifest.json` a mano, se regenera solo.

### Si prefieres una categoría nueva
Crea una carpeta nueva dentro de `assets/` (ej. `assets/animales/`) y sube ahí tus imágenes con el mismo formato de nombre. Aparecerá en el sitio como una pestaña más. Si quieres un título más prolijo que el nombre de la carpeta, edita `categories.json` y agrega, por ejemplo, `"animales": "Animales"`.

## Importante — derechos de autor
Todo lo que subas a `assets/` queda publicado en el sitio bajo tu responsabilidad. Evita personajes con copyright (Disney, Marvel, Nintendo, Simpsons, etc.), logos de marcas, o el nombre/imagen de personas famosas — es el mismo criterio que se usó para filtrar el catálogo original.

## Alternativa sin GitHub
Si en algún momento preferís que yo revise y sume las imágenes en vez de hacerlo vos mismo, seguís pudiendo mandármelas directamente acá en el chat como hiciste hasta ahora, y yo genero el sitio actualizado para que lo subas de nuevo a Netlify (arrastrando la carpeta a https://app.netlify.com/drop, sin necesidad de GitHub).
