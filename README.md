# Web de la Fundación Discover Villajoyosa

Sitio web estático construido con [Eleventy](https://www.11ty.dev/) y editable
sin conocimientos técnicos mediante [Sveltia CMS](https://sveltiacms.app/) (panel en `/admin`).
Pensado para publicarse en **Cloudflare Pages**.

## Estructura

- `index.njk`, `fundacion.njk`, `noticias.njk`, `contacto.njk`, `transparencia/` — páginas del sitio
- `content/noticias/` — noticias (una por archivo, editables desde /admin)
- `content/transparencia/` — empleo, contratación y documentos (editables desde /admin)
- `_data/` — textos de portada, datos de contacto y Patronato (editables desde /admin)
- `uploads/` — PDFs e imágenes subidos desde el panel
- `admin/` — panel de administración (Sveltia CMS)
- `css/`, `img/` — diseño e identidad visual

## Desarrollo local

```bash
npm install
npm start        # servidor local en http://localhost:8080
npm run build    # genera la web en _site/
```

## Puesta en marcha y edición de contenidos

- **GUIA-PUESTA-EN-MARCHA.md** — cómo publicar la web en Cloudflare Pages (una sola vez).
- **MANUAL-DE-USO.html** — manual para el personal de la Fundación (abrir en el navegador).
