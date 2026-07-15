# Guía de puesta en marcha en Cloudflare (una sola vez)

Para quien publique la web por primera vez (Jorge). Después de estos pasos, la
Fundación gestionará todo desde `su-dominio.com/admin` sin tocar código.
Coste: **0 €** (Cloudflare Pages + Workers gratuitos, Web3Forms gratuito),
salvo el dominio. Cloudflare Pages permite builds y ancho de banda de sobra
para una web de este tamaño.

## 1. Subir el proyecto a GitHub

El contenido vive en un repositorio de GitHub: es lo que edita el panel /admin.

1. Crea (o usa) una cuenta en https://github.com
2. Crea un repositorio nuevo, p. ej. `discover-villajoyosa-web` (privado o público).
3. Sube el contenido de esta carpeta:

```bash
cd discover-villajoyosa-web
git init
git add .
git commit -m "Web inicial Fundación Discover Villajoyosa"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/discover-villajoyosa-web.git
git push -u origin main
```

## 2. Publicar en Cloudflare Pages

1. Crea una cuenta en https://dash.cloudflare.com
2. **Workers & Pages → Create → Pages → Connect to Git** y autoriza GitHub.
3. Elige el repositorio y configura el build:
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
4. Pulsa **Save and Deploy**. En 1-2 minutos la web estará en
   `https://tu-proyecto.pages.dev`.

A partir de ahora, **cada cambio publicado desde /admin se despliega solo**.

## 3. Activar el acceso al panel /admin

El panel usa GitHub para identificarse. Hace falta desplegar un pequeño
autenticador (un Worker de Cloudflare) y crear una "OAuth App" en GitHub.
Son 10 minutos, una sola vez:

### 3.1 Desplegar el Worker de autenticación

1. Abre https://github.com/sveltia/sveltia-cms-auth y pulsa el botón
   **Deploy to Cloudflare** de su README (usa tu cuenta de Cloudflare).
2. Al terminar tendrás una URL tipo
   `https://sveltia-cms-auth.TU-SUBDOMINIO.workers.dev`. Apúntala.

### 3.2 Crear la OAuth App en GitHub

1. En GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Rellena:
   - **Application name:** `Panel Fundación Discover Villajoyosa`
   - **Homepage URL:** la URL de tu web (p. ej. `https://tu-proyecto.pages.dev`)
   - **Authorization callback URL:** `https://sveltia-cms-auth.TU-SUBDOMINIO.workers.dev/callback`
3. Crea la app, copia el **Client ID** y genera un **Client Secret** (cópialo también).

### 3.3 Configurar el Worker

1. En Cloudflare: **Workers & Pages → sveltia-cms-auth → Settings → Variables**.
2. Añade estas variables (como *secrets*):
   - `GITHUB_CLIENT_ID` = el Client ID
   - `GITHUB_CLIENT_SECRET` = el Client Secret
   - `ALLOWED_DOMAINS` = tu dominio, p. ej. `tu-proyecto.pages.dev, fundaciondiscovervillajoyosa.com`

### 3.4 Conectar la web con el Worker

Edita `admin/config.yml` (líneas marcadas con `>>> CAMBIAR`):

```yaml
backend:
  name: github
  repo: TU-USUARIO/discover-villajoyosa-web   # tu repositorio real
  branch: main
  base_url: https://sveltia-cms-auth.TU-SUBDOMINIO.workers.dev  # tu Worker
```

Guarda, haz commit y push. Listo: en `https://tu-web/admin` aparecerá
**Sign in with GitHub**.

## 4. Dar acceso a los editores de la Fundación

Cada editor necesita una cuenta gratuita de GitHub (solo para identificarse;
nunca la usarán directamente):

1. Que cada persona se cree una cuenta en https://github.com/signup
2. En el repositorio: **Settings → Collaborators → Add people** → su usuario.
3. Aceptan la invitación que les llega por correo.
4. Ya pueden entrar en `https://tu-web/admin` con "Sign in with GitHub".

Para retirar el acceso a alguien: quitar su usuario de Collaborators.

## 5. Activar el formulario de contacto (Web3Forms, gratis)

1. Entra en https://web3forms.com, introduce el correo de la Fundación
   (donde deben llegar los mensajes) y pulsa **Create Access Key**.
2. Copia la clave recibida.
3. En el panel `/admin` → **Ajustes de la web → Datos de contacto** → pega la
   clave en el campo **"Clave de Web3Forms"** y publica.

Mientras la clave esté vacía, la página de contacto muestra el correo
electrónico en lugar del formulario (no se rompe nada).

## 6. Dominio propio (opcional, recomendado)

1. En Cloudflare Pages: **Custom domains → Set up a custom domain**.
2. Si el dominio está gestionado en Cloudflare, se configura solo; si no,
   te indicará el registro CNAME a crear. HTTPS automático.
3. Recuerda añadir el dominio nuevo a `ALLOWED_DOMAINS` del Worker (paso 3.3).

## 7. Entrega a la Fundación

- Dales `https://su-dominio/admin` y el **MANUAL-DE-USO.html**.
- Deja a alguien de la Fundación como miembro de la cuenta de Cloudflare y
  administrador del repositorio de GitHub para que gestionen accesos sin ti.

## Mantenimiento

Prácticamente ninguno: web estática, sin base de datos ni plugins. Si un
despliegue fallara, en Cloudflare Pages → **Deployments** se puede restaurar
cualquier versión anterior con **Rollback**.

## Probar en local (opcional)

```bash
npm install
npm start        # web en http://localhost:8080
```
