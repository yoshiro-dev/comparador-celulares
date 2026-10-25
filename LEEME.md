# Comparador de celulares — catálogo JSON

Esta entrega modifica la última versión HTML incluida en el texto adjunto. Conserva formularios, edición, eliminación, favoritos, imágenes, comparativas, exportación CSV e importación/exportación JSON. La migración a React + TypeScript queda para una siguiente etapa.

## Archivos

- `index.html`: estructura de la interfaz.
- `styles.css`: estilos separados.
- `app.js`: lógica de la aplicación y carga asíncrona del catálogo.
- `celulares.json`: catálogo publicado; ya no está incrustado en el HTML o JavaScript.

## Usarlo en tu repositorio

1. Si tienes datos personalizados en la versión anterior, exporta primero su JSON como respaldo.
2. Descomprime el paquete. Coloca estos archivos juntos en la carpeta del proyecto, reemplazando `index.html`.
3. Si tienes un JSON exportado de la versión anterior, úsalo como `celulares.json`. La entrega conserva solamente los tres celulares de ejemplo del texto adjunto; sus especificaciones no se han verificado.
4. Sube los cuatro archivos de la aplicación al repositorio:

```bash
git add index.html styles.css app.js celulares.json
git commit -m "Separo el catálogo JSON y los archivos de la aplicación"
git push
```

GitHub Pages debe estar configurado para publicar esa carpeta. Estas instrucciones no crean ni modifican tu repositorio automáticamente.

## Probar localmente

Abre la carpeta en Visual Studio Code con Live Server, o, si tienes Python instalado, ejecuta desde ella:

```bash
python -m http.server 8000
```

En Windows también puedes usar `py -m http.server 8000`. Abre `http://localhost:8000`. No abras `index.html` con doble clic: los navegadores suelen bloquear la lectura del JSON mediante `fetch` bajo `file://`.

## Publicación y borrador local

Al abrir o recargar la página se solicita `./celulares.json` sin reutilizar la caché del navegador. La versión publicada tiene prioridad: no se sustituye automáticamente por un catálogo antiguo de localStorage.

Los cambios hechos en el formulario, favoritos y comparativas se guardan como borrador local. Para continuar ese borrador después de recargar, pulsa **Recuperar borrador local**. Este botón también reconoce los datos de las versiones anteriores `comparador-celulares-v2` y `comparador-celulares-v1`, siempre que estén en el mismo navegador y origen. Un borrador vacío es válido.

Para publicar cambios:

1. Agrega o edita información en la aplicación.
2. Pulsa **Exportar JSON**.
3. Reemplaza `celulares.json` en tu proyecto con el archivo descargado.
4. Haz commit y push. Cuando termine la publicación de Pages, recarga la aplicación en tus dispositivos.

El JSON exportado incluye celulares, imágenes, favoritos y comparativas. Si lo publicas, esos datos serán visibles para quienes accedan al catálogo. Esto es publicación manual de un catálogo compartido, no sincronización automática ni cuentas privadas.

**Recargar catálogo publicado** vuelve a consultar el servidor; no elimina el último borrador local. Antes de editar un catálogo recién cargado, recupera o exporta cualquier borrador anterior que quieras conservar: cada guardado local reemplaza el borrador previo.

Si la descarga falla o el JSON es inválido, se muestra un error y un botón para reintentar. No se muestra silenciosamente una copia vieja. Aún puedes recuperar tu borrador local.

## Formato del JSON

Se mantiene el formato anterior para facilitar la transición:

```json
{
  "version": 2,
  "celulares": [],
  "comparativas": []
}
```

Cada celular necesita los campos `nombre`, `chip`, `antutu`, `ram`, `almacenamiento`, `pantalla`, `hz`, `bateria`, `carga` y `peso`. `fav` e `imagen` son opcionales. También se aceptan exportaciones de versión 1 y listas directas de celulares. Una versión desconocida, valores inválidos o nombres de celulares duplicados provocan un error explicativo.

Las comparativas conservan `nombre`, `celulares` (lista de nombres) y `fav`. En esta etapa se mantienen las referencias por nombre para respetar el formato anterior.

**Importar JSON** combina los registros con la vista actual y actualiza los celulares de igual nombre, sin distinguir mayúsculas. No reemplaza el archivo publicado. Para sustituir por completo el catálogo, reemplaza el archivo del repositorio directamente.

## Imágenes

Se conservan imágenes incrustadas en formato data URL de respaldos anteriores y del formulario. También puedes poner una ruta como `./imagenes/mi-celular.webp` en `imagen`, crear esa carpeta y subir la foto junto con el proyecto. Las rutas relativas se resuelven respecto a la página. Se aceptan enlaces HTTP/HTTPS; su disponibilidad depende del servidor de origen.

Las imágenes referenciadas por ruta no se incluyen físicamente en el JSON exportado: conserva también la carpeta de imágenes. El importador admite archivos JSON de hasta 20 MB; el espacio disponible en localStorage puede ser menor. Si falla el guardado local, se avisa para que exportes el JSON.

## Verificación de esta entrega

Se verificó la sintaxis JavaScript y se probaron la carga por HTTP, prioridad del JSON sobre datos locales, actualización del catálogo, listas vacías, recuperación de borradores v2, validación de registros, errores HTTP/JSON/red, importación y comparativas con un DOM simulado. La revisión visual en navegador no pudo ejecutarse porque el navegador de pruebas no estaba disponible.
