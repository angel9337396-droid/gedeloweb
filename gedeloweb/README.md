# Gedelo

Sitio web estático de Gedelo para presentar servicios de diseño web y sistemas comerciales.

## Estructura

```text
Gedelo/
├── assets/       # Logotipo y recursos gráficos
├── css/          # Estilos y animaciones
├── js/           # Interacciones de la página
├── index.html    # Página principal
├── .gitignore    # Archivos locales que no se publican
└── README.md
```

La página carga sus archivos con rutas relativas (`css/styles.css`, `js/main.js` y `assets/`), así que conserva esta estructura al subirla.

## Publicar en GitHub

Sube el contenido de esta carpeta al nivel principal del repositorio. Al abrir el repositorio, `index.html` debe aparecer junto a `assets/`, `css/` y `js/`; no debe quedar dentro de otra carpeta `Gedelo/`.

No subas `.vscode/`, `difjs/` ni `desktop.ini`: son configuraciones/archivos locales y no se necesitan para que funcione el sitio publicado. Se conservan en tu computadora.

## Publicar en Vercel

Importa el repositorio de GitHub y configura **Root Directory** como la carpeta principal del repositorio (la que contiene `index.html`). Para este sitio estático no hace falta un comando de compilación ni instalar dependencias. Después del despliegue, comprueba que estas direcciones carguen correctamente:

- `/`
- `/css/styles.css`
- `/js/main.js`
- `/assets/gedelo-mark.png`
