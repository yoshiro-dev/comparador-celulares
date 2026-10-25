# Comparador de celulares — versión 3

Aplicación estática completa compatible con GitHub Pages. Esta entrega amplía y corrige la versión HTML anterior. No necesita instalar paquetes ni ejecutar un proceso de compilación para publicarse. La migración a React/TypeScript es una etapa posterior: aquí se actualizan los archivos actuales y el formato de datos.

## Antes de reemplazar archivos

**Exporta tus datos actuales como JSON y conserva una copia fuera de la carpeta del proyecto.** El `celulares.json` incluido contiene solamente los tres ejemplos que venían en el texto adjunto, convertidos al nuevo formato. No conocemos los cambios que hayas hecho posteriormente en tu PC.

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Interfaz principal. |
| `styles.css` | Diseño adaptable a computadora y celular. |
| `app.js` | Interacción, formularios, imágenes y almacenamiento local. |
| `core.js` | Validación, migración, comparación y exportación. |
| `schema.js` | Definiciones que utiliza el formulario para mostrar todos los campos. |
| `celulares.json` | Catálogo publicado en formato v3. |
| `catalogo.schema.json` | Esquema JSON Schema de referencia para editores y herramientas. |
| `plantilla-celular.json` | Ejemplo vacío de un celular con todas sus secciones. No es un catálogo importable por sí solo. |
| `tests/core.test.js` | Pruebas automáticas de datos. |
| `package.json` | Permite ejecutar esas pruebas con Node; no contiene dependencias. |

## Instalar en tu proyecto actual

1. Exporta y respalda el JSON de la aplicación anterior.
2. Descomprime este ZIP directamente en `C:\Users\yrian\comparador-celulares`, reemplazando los archivos anteriores. No debe quedar otra carpeta intermedia antes de `index.html`.
3. Abre la carpeta con Live Server en VS Code. Alternativamente, si tienes Python instalado, ejecuta desde esa carpeta:

```bat
py -m http.server 8000
```

Abre `http://localhost:8000`. No abras el HTML con doble clic: esta versión usa módulos JavaScript y carga archivos JSON mediante HTTP.

4. Importa tu respaldo anterior. Elige **Reemplazar todo** si quieres usar exactamente tus datos y no combinar los ejemplos del paquete.
5. Revisa el aviso de migración, los celulares y las comparativas. Exporta el JSON v3 y úsalo para reemplazar `celulares.json` en la carpeta del proyecto.
6. Publica los archivos:

```bat
cd /d C:\Users\yrian\comparador-celulares
git add index.html styles.css app.js core.js schema.js celulares.json catalogo.schema.json plantilla-celular.json LEEME.md package.json tests/core.test.js
git commit -m "Amplio los atributos y migro el comparador al formato JSON v3"
git push origin main
```

El nombre y correo de Git deben estar configurados, como en el paso del commit anterior. Estos comandos no cambian la configuración de GitHub Pages: se conserva la configuración de publicación que ya uses.

## Lo que incluye

- Identificación por ID permanente; renombrar un celular conserva favoritos y comparativas.
- Diseño, construcción, pantallas múltiples, CPU y grupos de núcleos, GPU, memoria y almacenamiento.
- Cámaras múltiples y sus modos de video, fotografía, batería y carga.
- Redes, SIM/eSIM, conectividad, sensores, audio, software, soporte y seguridad.
- Pruebas con condiciones y resultados; ofertas con moneda, fecha y estado de equipos usados.
- Imagen principal, galería, fuentes y metadatos.
- Notas, etiquetas y favoritos personales separados de la ficha técnica.
- Formulario organizado por secciones desplegables, con botones para añadir y quitar cámaras, pantallas, fuentes, ofertas, etc.
- Editor JSON avanzado para campos adicionales. Pulsa **Cargar en el formulario** y después **Guardar celular**.
- Comparación de 2 a 8 celulares, filtro por sección, búsqueda de atributos, filas sin datos y solo diferencias.
- Comparativas guardadas con los atributos que estaban visibles. Se crean como registros nuevos; no se sobrescriben por tener el mismo nombre.
- Importación v1/v2 y exportación v3, exportación CSV de especificaciones.
- Los campos adicionales importados se conservan al editar; están disponibles en el editor JSON aunque no tengan control específico en el formulario.

## Datos publicados y borrador local

Al abrir se carga `celulares.json` con una petición que evita reutilizar la caché del navegador. Un borrador antiguo no oculta las actualizaciones publicadas.

Las ediciones, favoritos y comparativas se guardan en localStorage cuando confirmas cada acción. Después de recargar, pulsa **Recuperar borrador local** para continuar con esos cambios. Los formularios abiertos sin guardar no forman parte del borrador.

**No hay sincronización automática.** Para que otro equipo vea tus cambios, exporta el JSON, reemplaza el del repositorio y haz commit/push. Recarga la página cuando finalice el despliegue de GitHub Pages.

El borrador es una sola instantánea: una nueva acción guardada reemplaza el anterior. Exporta cualquier copia que quieras conservar. Si el navegador bloquea el almacenamiento o no tiene espacio, la aplicación avisa; exporta antes de cerrar.

La recuperación busca el formato v3 y, si no hay uno válido, los borradores antiguos del mismo navegador y origen. Los datos guardados en GitHub Pages no son accesibles desde localhost ni desde otro navegador por compartir archivos: son orígenes diferentes. En esos casos usa Exportar/Importar.

El JSON completo incluye preferencias y notas. **Si lo publicas, también se publican esos datos.** No es un sistema de cuentas ni un espacio privado.

## Importación y migración

- **Reemplazar todo:** sustituye el catálogo, las preferencias y las comparativas en la vista y el borrador. El archivo del repositorio no se modifica automáticamente.
- **Combinar por ID:** conserva los teléfonos que no están en el archivo importado. Cuando un ID coincide, el registro importado sustituye la ficha anterior completa y sus preferencias. Las comparativas se combinan por su propio ID.
- Un nombre coincidente con ID diferente no se considera el mismo celular: puede representar otra variante.
- Los archivos v1/v2 reciben IDs deterministas derivados de sus nombres. La misma importación repetida no duplica esos registros. Después de migrar, conserva sus IDs v3.
- Al migrar referencias antiguas por nombre, las comparativas que quedaron con menos de dos celulares se omiten y se informa en el aviso.
- Los archivos v3 con referencias inexistentes, IDs repetidos, números fuera de rango o tipos incorrectos se rechazan sin modificar los datos actuales.
- Un catálogo vacío es válido y no se sustituye por ejemplos.
- El importador admite archivos de hasta 25 MB; localStorage puede admitir bastante menos.

## Formato y unidades

La raíz es:

```json
{
  "version": 3,
  "celulares": [],
  "preferencias": {
    "celulares_favoritos": [],
    "notas_por_celular": {},
    "etiquetas_por_celular": {}
  },
  "comparativas": []
}
```

Cada celular necesita `id` y `nombre`. Los demás campos son opcionales y se completan con `null`, listas vacías u objetos con campos vacíos. RAM y almacenamiento están en `memoria`, evitando duplicar los mismos valores en identificación.

- `null`: dato desconocido.
- `false`: ausencia confirmada de una característica.
- `0`: valor numérico real, no un sustituto de «desconocido».
- Los números se guardan sin unidades. Los sufijos indican mm, g, GB, mAh, W, Hz, GHz, nits, MP, etc.
- Fechas: `AAAA-MM-DD`. Un año o mes incierto debe documentarse en notas; no se inventa un día.
- Las listas sencillas del formulario se introducen con un elemento de texto por línea.
- Las pruebas aceptan mediciones adicionales mediante un objeto JSON.
- En ofertas, cada precio tiene su moneda y fecha. No hay conversión automática de monedas.
- `catalogo.schema.json` documenta la estructura. `schema.js` es la versión usada en ejecución; si amplías el esquema manualmente, mantén ambos consistentes.

## Comparaciones y calidad de los datos

No se resaltan ganadores automáticamente: más megapíxeles, mAh o vatios no demuestra por sí solo mejor experiencia. Las versiones de benchmarks y condiciones de medición deben ser comparables.

Las listas de cámaras, pantallas, ofertas y pruebas se alinean por posición (elemento 1, elemento 2…). Ordena elementos equivalentes y revisa su rol antes de interpretar una comparación. No existe una correspondencia automática por focal, tipo de pantalla o tienda.

Las fuentes y fechas se editan dentro de cada celular. Los tres ejemplos y sus puntuaciones heredadas no se verificaron contra fabricantes. Los atributos nuevos quedan en `null` hasta que los completes.

## Imágenes

Puedes pegar una ruta como `./imagenes/equipo.webp` en Multimedia → Imagen principal o añadir entradas a Galería. Sube también esos archivos al repositorio.

El botón **Añadir foto principal** admite JPG, PNG y WebP hasta 12 MB, reduce el lado mayor a 800 píxeles y guarda una imagen incrustada de hasta un millón de caracteres. Debes guardar el celular después de preparar la foto.

Para un catálogo grande convienen rutas a archivos: las imágenes incrustadas consumen el espacio limitado del borrador local. Los archivos referenciados mediante rutas no están físicamente dentro del JSON exportado.

## Verificar el proyecto

Con Node.js instalado:

```bat
npm test
```

No necesitas `npm install` para esas pruebas. La aplicación publicada tampoco necesita Node ni dependencias externas.

### Resultado de verificación de esta entrega

Pasaron ocho pruebas automáticas de datos. Además, se probó en Chromium la edición de campos y cámaras, foto principal, comparativas, exportación JSON, prioridad del catálogo publicado, recuperación del borrador, importación v2/v3, conservación de extensiones, catálogos vacíos y errores HTTP. Se revisó el diseño de escritorio y móvil (390 px de ancho), sin desbordamiento horizontal de la página; la tabla sí permite desplazamiento horizontal. No se publicaron cambios en tu repositorio.
