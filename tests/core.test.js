import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {normalize,parse,newPhone,mergeCatalog,removePhone,flatPhone,display,safeImage,phoneSchema,empty,validate,catalogCSV} from '../core.js';
const file=JSON.parse(fs.readFileSync(new URL('../celulares.json',import.meta.url)));
const copy=()=>structuredClone(file);
function catalog(phones){return {version:3,celulares:phones,preferencias:{celulares_favoritos:[],notas_por_celular:{},etiquetas_por_celular:{}},comparativas:[]};}
test('Catálogo y plantilla completos válidos; ida y vuelta sin pérdida',()=>{
 const d=normalize(copy()).catalog;assert.deepEqual(parse(JSON.stringify(d)).catalog,d);
 validate(JSON.parse(fs.readFileSync(new URL('../plantilla-celular.json',import.meta.url))),phoneSchema);
});
test('Migración v1/v2: números, falso, nulos, IDs deterministas y referencias',()=>{
 const old={version:2,celulares:[{nombre:'A',ram:8,fav:true,imagen:'data:image/png;base64,'+'A'.repeat(8000)},{nombre:'B',ram:0}],comparativas:[{nombre:'AB',celulares:['A','B'],fav:true}]};
 const d=normalize(old).catalog;assert.equal(d.celulares[0].memoria.ram_gb,8);assert.equal(d.celulares[1].memoria.ram_gb,0);assert.equal(d.celulares[0].conectividad.nfc,null);assert.equal(d.celulares[0].multimedia.imagen_principal.length,8022);
 assert.equal(d.comparativas[0].celulares_ids[0],d.celulares[0].id);assert.equal(d.preferencias.celulares_favoritos[0],d.celulares[0].id);assert.equal(normalize(old.celulares).catalog.celulares[0].id,d.celulares[0].id);
 const incomplete=structuredClone(old);incomplete.comparativas[0].celulares=['A','Falta'];assert.equal(normalize(incomplete).warnings.length,1);
});
test('Renombrar no altera favoritos ni comparativas; eliminar limpia referencias',()=>{
 let d=copy();const ids=d.celulares.slice(0,2).map(p=>p.id);d.preferencias.celulares_favoritos=[ids[0]];d.preferencias.notas_por_celular[ids[0]]='Nota';d.comparativas=[{id:'c1',nombre:'Prueba',celulares_ids:ids,atributos_visibles:[],favorita:false,notas:''}];
 d.celulares[0].nombre='Nombre diferente';assert.doesNotThrow(()=>normalize(d));d=removePhone(d,ids[0]);assert.equal(d.comparativas.length,0);assert.deepEqual(d.preferencias.celulares_favoritos,[]);assert.deepEqual(d.preferencias.notas_por_celular,{});
});
test('Importación combina por ID sin duplicar y conserva campos adicionales',()=>{
 const d=copy();d.celulares[0].experimental={valor:17};const incoming=copy();incoming.celulares[0].nombre='Actualizado';incoming.celulares[0].experimental={valor:23};incoming.celulares[0].memoria.otro_campo='ABC';
 const out=mergeCatalog(d,incoming);assert.equal(out.celulares.length,d.celulares.length);assert.equal(out.celulares[0].nombre,'Actualizado');assert.equal(out.celulares[0].experimental.valor,23);assert.equal(parse(JSON.stringify(out)).catalog.celulares[0].memoria.otro_campo,'ABC');
});
test('Validación rechaza tipos inválidos, fechas, versiones, IDs y referencias',()=>{
 for(const bad of [null,{}, {version:4,celulares:[]},{version:2,celulares:[{nombre:'A',ram:true}]},{version:2,celulares:[{nombre:'A'},{nombre:'a'}]}])assert.throws(()=>normalize(bad));
 let d=copy();d.celulares[0].memoria.ram_gb='8';assert.throws(()=>normalize(d));d=copy();d.celulares[0].fecha_lanzamiento='2026-02-30';assert.throws(()=>normalize(d));
 d=copy();d.celulares[0].diseno.peso_g=-3;assert.throws(()=>normalize(d));d=copy();d.celulares[1].id=d.celulares[0].id;assert.throws(()=>normalize(d));
 d=copy();d.preferencias.celulares_favoritos=['inexistente'];assert.throws(()=>normalize(d));
 assert.throws(()=>parse('{"version":3,"__proto__":{"mal":true}}'));
});
test('Nulos, cero y falso distintos; listas de cámaras, video y pantallas se conservan',()=>{
 const p=newPhone();p.nombre='Prueba';p.conectividad.nfc=false;p.memoria.ram_gb=0;p.pantallas=[empty(phoneSchema.properties.pantallas.items),empty(phoneSchema.properties.pantallas.items)];
 p.camaras=[empty(phoneSchema.properties.camaras.items)];p.camaras[0].modos_video=[empty(phoneSchema.properties.camaras.items.properties.modos_video.items)];p.camaras[0].modos_video[0].fps=60;
 const d=parse(JSON.stringify(catalog([p]))).catalog;assert.equal(d.celulares[0].pantallas.length,2);assert.equal(d.celulares[0].camaras[0].modos_video[0].fps,60);
 assert.equal(display(false),'No');assert.equal(display(0),'0');assert.equal(display(null),'Sin dato');
 assert(flatPhone(p).some(r=>r.path==='camaras.0.modos_video.0.fps'&&r.value===60));
});
test('Catálogo vacío es válido y no reaparecen ejemplos',()=>assert.equal(normalize(catalog([])).catalog.celulares.length,0));
test('Imágenes restringidas a HTTP(S) y bitmap data URL; CSV neutraliza fórmulas',()=>{
 assert.equal(safeImage('javascript:alert(1)','https://ejemplo.com/'),null);assert.equal(safeImage('data:image/svg+xml,<svg/>','https://ejemplo.com/'),null);assert.equal(safeImage('./img/a.webp','https://ejemplo.com/app/'),'https://ejemplo.com/app/img/a.webp');
 const d=copy();d.celulares[0].nombre='=SUM(1,2)';assert(catalogCSV(d).includes('"\'=SUM(1,2)"'));
});
