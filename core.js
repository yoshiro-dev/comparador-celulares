import {catalogSchema, phoneSchema} from './schema.js';
export {phoneSchema};
export const clone = value => structuredClone(value);
const isObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function guard(value,depth=0){
  if(depth>35)throw Error('El JSON tiene demasiados niveles.');
  if(Array.isArray(value)){if(value.length>10000)throw Error('Lista demasiado larga.');value.forEach(v=>guard(v,depth+1));}
  else if(isObject(value))for(const [k,v] of Object.entries(value)){
    if(['__proto__','prototype','constructor'].includes(k))throw Error('Clave no permitida: '+k);
    guard(v,depth+1);
  }
}
export function validate(value,schema,path='datos'){
  if('const' in schema&&value!==schema.const)throw Error(`${path}: se esperaba ${schema.const}.`);
  if(!schema.type)return;
  const types=Array.isArray(schema.type)?schema.type:[schema.type];
  const actual=value===null?'null':Array.isArray(value)?'array':typeof value;
  if(!types.includes(actual))throw Error(`${path}: tipo inválido; se esperaba ${types.join(' o ')}.`);
  if(value===null)return;
  if(actual==='number'){
    if(!Number.isFinite(value)||(schema.minimum!==undefined&&value<schema.minimum)||(schema.maximum!==undefined&&value>schema.maximum))throw Error(`${path}: número fuera de rango.`);
  }else if(actual==='string'){
    if((schema.minLength&&value.trim().length<schema.minLength)||(schema.maxLength&&value.length>schema.maxLength)||(schema.pattern&&!new RegExp(schema.pattern).test(value)))throw Error(`${path}: texto inválido.`);
    if(schema.format==='date'&&(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value))throw Error(`${path}: usa una fecha válida AAAA-MM-DD.`);
  }else if(actual==='array'){
    if((schema.minItems&&value.length<schema.minItems)||(schema.maxItems&&value.length>schema.maxItems))throw Error(`${path}: cantidad de elementos no permitida.`);
    if(schema.uniqueItems&&new Set(value.map(v=>JSON.stringify(v))).size!==value.length)throw Error(`${path}: hay elementos repetidos.`);
    value.forEach((v,i)=>validate(v,schema.items,`${path}[${i}]`));
  }else if(actual==='object'){
    for(const key of schema.required||[])if(!(key in value))throw Error(`${path}.${key}: falta este campo.`);
    for(const [key,v] of Object.entries(value)){
      if(schema.properties?.[key])validate(v,schema.properties[key],`${path}.${key}`);
      else if(isObject(schema.additionalProperties))validate(v,schema.additionalProperties,`${path}.${key}`);
    }
  }
}
export function empty(schema){
  if(schema.type==='object')return Object.fromEntries(Object.entries(schema.properties||{}).map(([k,s])=>[k,empty(s)]));
  if(schema.type==='array')return [];
  if(schema.type==='string')return '';
  return null;
}
function fill(value,schema){
  if(schema.type==='object'){
    const result=clone(value||{});
    for(const [k,s] of Object.entries(schema.properties||{}))result[k]=k in result?fill(result[k],s):empty(s);
    return result;
  }
  if(schema.type==='array')return (value||[]).map(v=>fill(v,schema.items));
  return value;
}
export function newId(prefix='cel'){return `${prefix}-${crypto.randomUUID()}`;}
export function newPhone(){const p=empty(phoneSchema);p.id=newId();return p;}
export function legacyId(name){let hash=2166136261;for(const c of name.trim().toLowerCase()){hash=Math.imul(hash^c.codePointAt(0),16777619)>>>0;}return 'legacy-'+hash.toString(16);}
const legacyFields={chip:'procesador.modelo',ram:'memoria.ram_gb',almacenamiento:'memoria.almacenamiento_gb',bateria:'bateria.capacidad_tipica_mah',carga:'bateria.carga_cable_max_w',peso:'diseno.peso_g'};
export function setPath(o,path,value){const keys=path.split('.');let at=o;for(const k of keys.slice(0,-1))at=at[k];at[keys.at(-1)]=value;}
function legacyNumber(v,key){if(v===null||v===undefined||v==='')return null;if(!['string','number'].includes(typeof v)||!Number.isFinite(Number(v))||Number(v)<0)throw Error(`Dato antiguo inválido: ${key}.`);return Number(v);}
export function migrateLegacy(raw){
  const rows=Array.isArray(raw)?raw:raw.celulares;
  if(!Array.isArray(rows))throw Error('El archivo necesita una lista celulares.');
  const warnings=[], used=new Set(), favorites=[];
  const phones=rows.map(old=>{
    if(!isObject(old)||typeof old.nombre!=='string'||!old.nombre.trim())throw Error('Un celular antiguo no tiene nombre válido.');
    const p=empty(phoneSchema);p.nombre=old.nombre.trim();p.id=legacyId(p.nombre);
    if(used.has(p.id))throw Error('Nombres antiguos duplicados o colisión de ID: '+p.nombre);used.add(p.id);
    for(const [k,path] of Object.entries(legacyFields))setPath(p,path,k==='chip'?(old[k]??null):legacyNumber(old[k],k));
    if(old.pantalla!==undefined||old.hz!==undefined){const s=empty(phoneSchema.properties.pantallas.items);s.id='principal';s.rol='principal';s.diagonal_pulgadas=legacyNumber(old.pantalla,'pantalla');s.refresco_max_hz=legacyNumber(old.hz,'hz');p.pantallas=[s];}
    if(old.antutu!==undefined){const t=empty(phoneSchema.properties.pruebas.items);t.id='antutu-heredado';t.nombre='AnTuTu';t.categoria='benchmark';t.resultados.puntuacion=legacyNumber(old.antutu,'antutu');t.resultados.notas='Dato heredado sin versión ni fuente verificada; no usar para declarar un ganador.';p.pruebas=[t];}
    p.multimedia.imagen_principal=old.imagen??null;
    p.metadatos.observaciones='Importado de un catálogo anterior. Especificaciones sin verificación adicional.';
    const extras=Object.fromEntries(Object.entries(old).filter(([k])=>!['nombre','chip','ram','almacenamiento','bateria','carga','peso','pantalla','hz','antutu','imagen','fav'].includes(k)));
    if(Object.keys(extras).length)p.datos_anteriores=extras;
    if(old.fav===true)favorites.push(p.id);
    return p;
  });
  const byName=new Map(phones.map(p=>[p.nombre.toLowerCase(),p.id]));
  const comps=[];
  if(raw.comparativas!==undefined&&!Array.isArray(raw.comparativas))throw Error('comparativas debe ser una lista.');
  for(const [i,c] of (raw.comparativas||[]).entries()){
    if(!isObject(c)||typeof c.nombre!=='string'||!Array.isArray(c.celulares))throw Error('Comparativa antigua inválida.');
    const ids=[...new Set(c.celulares.map(n=>typeof n==='string'?byName.get(n.toLowerCase()):undefined).filter(Boolean))];
    if(ids.length<2){warnings.push(`Se omitió la comparativa «${c.nombre}»: faltan celulares.`);continue;}
    if(ids.length<c.celulares.length)warnings.push(`Se retiraron referencias faltantes en «${c.nombre}».`);
    comps.push({id:'comp-'+legacyId(c.nombre),nombre:c.nombre,celulares_ids:ids,atributos_visibles:[],favorita:c.fav===true,notas:''});
  }
  return {catalog:{version:3,celulares:phones,preferencias:{celulares_favoritos:favorites,notas_por_celular:{},etiquetas_por_celular:{}},comparativas:comps},warnings};
}
export function normalize(raw){
  guard(raw);
  let result;
  if(isObject(raw)&&raw.version===3)result={catalog:clone(raw),warnings:[]};
  else if(Array.isArray(raw)||(isObject(raw)&&[undefined,1,2].includes(raw.version)))result=migrateLegacy(raw);
  else throw Error('Versión o estructura de catálogo no compatible.');
  const d=result.catalog;
  // Validate before filling so malformed objects cannot be hidden by defaults.
  validate(d,catalogSchema);
  d.celulares=d.celulares.map(p=>fill(p,phoneSchema));
  const ids=new Set();for(const p of d.celulares){if(ids.has(p.id))throw Error('ID de celular repetido: '+p.id);ids.add(p.id);}
  const compIds=new Set();for(const c of d.comparativas){if(compIds.has(c.id))throw Error('ID de comparativa repetido: '+c.id);compIds.add(c.id);for(const id of c.celulares_ids)if(!ids.has(id))throw Error('Comparativa con celular inexistente: '+id);}
  const pref=d.preferencias;
  pref.celulares_favoritos??=[];pref.notas_por_celular??={};pref.etiquetas_por_celular??={};
  for(const id of [...pref.celulares_favoritos,...Object.keys(pref.notas_por_celular),...Object.keys(pref.etiquetas_por_celular)])if(!ids.has(id))throw Error('Preferencias con celular inexistente: '+id);
  return result;
}
export function parse(text){if(text.length>25_000_000)throw Error('El archivo supera 25 MB.');return normalize(JSON.parse(text));}
export function mergeCatalog(current,incoming){
  const out=clone(current);const byId=new Map(out.celulares.map(p=>[p.id,p]));incoming.celulares.forEach(p=>byId.set(p.id,clone(p)));out.celulares=[...byId.values()];
  const comps=new Map(out.comparativas.map(c=>[c.id,c]));incoming.comparativas.forEach(c=>comps.set(c.id,clone(c)));out.comparativas=[...comps.values()];
  const importedIds=new Set(incoming.celulares.map(p=>p.id));
  out.preferencias.celulares_favoritos=[...new Set([...out.preferencias.celulares_favoritos.filter(id=>!importedIds.has(id)),...incoming.preferencias.celulares_favoritos])];
  for(const key of ['notas_por_celular','etiquetas_por_celular']){
    for(const id of importedIds)delete out.preferencias[key][id];
    Object.assign(out.preferencias[key],incoming.preferencias[key]);
  }
  for(const [k,v] of Object.entries(incoming.preferencias))if(!['celulares_favoritos','notas_por_celular','etiquetas_por_celular'].includes(k))out.preferencias[k]=clone(v);
  for(const [k,v] of Object.entries(incoming))if(!['version','celulares','preferencias','comparativas'].includes(k))out[k]=clone(v);
  return normalize(out).catalog;
}
export function removePhone(data,id){
  const d=clone(data);d.celulares=d.celulares.filter(p=>p.id!==id);
  d.preferencias.celulares_favoritos=d.preferencias.celulares_favoritos.filter(x=>x!==id);
  delete d.preferencias.notas_por_celular[id];delete d.preferencias.etiquetas_por_celular[id];
  d.comparativas=d.comparativas.map(c=>({...c,celulares_ids:c.celulares_ids.filter(x=>x!==id)})).filter(c=>c.celulares_ids.length>=2);
  return normalize(d).catalog;
}
export function display(v){if(v===null||v===undefined||v==='')return 'Sin dato';if(typeof v==='boolean')return v?'Sí':'No';if(Array.isArray(v))return v.length?v.map(display).join(', '):'Sin dato';if(isObject(v))return Object.keys(v).length?JSON.stringify(v):'Sin dato';return String(v);}
export function flatPhone(phone){
  const rows=[];
  function walk(v,s,path,labels){
    if(s.type==='object'&&!s['x-editor'])for(const [key,sub] of Object.entries(s.properties||{}))walk(v?.[key],sub,path?path+'.'+key:key,[...labels,sub.title||key]);
    else if(s.type==='array'&&s.items.type==='object')(v||[]).forEach((item,i)=>walk(item,s.items,path+'.'+i,[...labels,`${s.items.title} ${i+1}`]));
    else rows.push({path,label:labels.join(' › '),group:path.split('.')[0],value:v??null});
  }
  walk(phone,phoneSchema,'',[]);return rows;
}
export function safeImage(src,base){
  if(typeof src!=='string'||!src)return null;
  if(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(src)&&src.length<=1_000_000)return src;
  try{const u=new URL(src,base);if(['http:','https:'].includes(u.protocol))return u.href;}catch{}
  return null;
}
export function csvCell(v){let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function catalogCSV(data){const maps=data.celulares.map(p=>new Map(flatPhone(p).map(r=>[r.path,r.value])));const cols=[...new Set(maps.flatMap(m=>[...m.keys()]))];return '\ufeff'+[cols.map(csvCell).join(','),...maps.map(m=>cols.map(k=>csvCell(display(m.get(k)))).join(','))].join('\r\n');}
