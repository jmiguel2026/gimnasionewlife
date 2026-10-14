# Titán Gym Trujillo – Landing Page

Página web de una sola página (landing) para un gimnasio en Trujillo, Perú.
Tema oscuro con acentos dorados, 100% responsive.

## Archivos

| Archivo      | Contenido                                                        |
|--------------|------------------------------------------------------------------|
| `index.html` | Estructura de la página (Hero, Nosotros, Planes, Ubicación, Footer) |
| `style.css`  | Estilos, animaciones y diseño responsive                         |
| `script.js`  | WhatsApp, menú móvil, animaciones al hacer scroll                |
| `README.md`  | Documentación del proyecto                                       |

Los archivos deben estar en la **misma carpeta**.

## Cómo usarla

1. Abre la carpeta en Visual Studio Code.
2. Abre `index.html` con doble clic en tu navegador (o con Live Server).
3. Requiere conexión a internet para cargar fuentes de Google, fotos de Unsplash y el mapa.

## Qué personalizar

- **Número de WhatsApp:** en `script.js` (conectado al: `51926498836`).
- **Mensaje del botón flotante:** en `script.js`, dentro de la función de WhatsApp.
- **Datos del local:** en `index.html` (dirección, horarios y mapa).
- **Planes:** en la sección `#planes` de `index.html` mediante el atributo `data-plan`.
- **Colores:** en `style.css` dentro del bloque `:root` (`--gold`, `--bg`, etc.).
- **Redes sociales:** enlaces a Facebook, Instagram y TikTok en el footer.

## Funciones

- Botón flotante de WhatsApp con mensaje automático.
- Cada tarjeta de plan redirige a WhatsApp con el plan seleccionado.
- Menú hamburguesa adaptable para celulares.
- Animaciones suaves de interacción.