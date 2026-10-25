import {phoneSchema,clone,empty,newPhone,newId,normalize,parse,validate,guard,mergeCatalog,removePhone,flatPhone,display,safeImage,catalogCSV} from './core.js';
const $=id=>document.getElementById(id);
const KEY='comparador-celulares-v3-borrador';
const LEGACY_KEYS=['comparador-celulares-json-borrador-v1','comparador-celulares-v2','comparador-celulares-v1'];
let data=null,selected=new Set(),editing=null,draft=null,readers=[],loading=false,imageBusy=false,imageTurn=0,attributeSet=null,visiblePaths=[];
const summaryPaths=new Set(['marca','modelo','region','procesador.modelo','memoria.ram_gb','memoria.ram_tipo','memoria.almacenamiento_gb','pantallas.0.diagonal_pulgadas','pantallas.0.tecnologia','pantallas.0.refresco_max_hz','camaras.0.resolucion_mp','bateria.capacidad_tipica_mah','bateria.carga_cable_max_w','diseno.peso_g','conectividad.nfc','red_movil.soporta_5g','software.sistema_operativo_actual']);
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function button(text,action,cls='secondary'){const b=node('button',text,cls);b.type='button';b.addEventListener('click',action);return b;}
function notice(text,error=false){$('aviso').textContent=text;$('aviso').className=error?'error':'';}
function active(){
  for(const el of document.querySelectorAll('button,input,select,textarea'))el.disabled=loading;
  for(const id of ['nuevo','exportar','csv','importar','limpiar','guardar-comparativa'])$(id).disabled=!data||loading;$('publicado').disabled=loading;$('recuperar').disabled=loading;}
function saveLocal(message){
  $('estado').textContent='Borrador local. Exporta el JSON y publícalo para compartir estos cambios.';
  try{localStorage.setItem(KEY,JSON.stringify(data));notice(message+' Guardado en este navegador.');}
  catch{notice(message+' No se pudo guardar el borrador (espacio insuficiente o almacenamiento bloqueado). Exporta el JSON antes de salir.',true);}
}
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=node('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function closeEditor(){imageTurn++;imageBusy=false;draft=null;editing=null;$('editor').hidden=true;$('foto').value='';}
function apply(catalog,label){data=catalog;selected=new Set(data.celulares.slice(0,2).map(p=>p.id));attributeSet=null;
  $('seccion').value='resumen';$('filtro-atributos').value='';$('buscar').value='';$('nombre-comparativa').value='';
  for(const id of ['solo-diferencias','mostrar-vacios','solo-favoritos','comps-favoritas'])$(id).checked=false;
  closeEditor();$('estado').textContent=label;active();render();}
async function loadPublished(){
  if(loading)return;loading=true;active();notice('Cargando celulares.json…');
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),15000);
  try{
    const r=await fetch(new URL('./celulares.json',document.baseURI),{cache:'no-store',signal:ctrl.signal});
    if(!r.ok)throw Error('HTTP '+r.status+'. Revisa que celulares.json esté junto a index.html.');
    const result=parse(await r.text());apply(result.catalog,'Catálogo publicado. El borrador local se recupera de forma explícita.');
    notice('Catálogo cargado: '+data.celulares.length+' celulares. '+result.warnings.join(' '));
  }catch(e){notice(location.protocol==='file:'?'Abre la carpeta con Live Server o un servidor HTTP; la carga de módulos y JSON no funciona mediante doble clic.':'No se pudo cargar el catálogo. '+(e.name==='AbortError'?'Tiempo de espera agotado.':e.message)+' Puedes reintentar o recuperar un borrador.',true);}
  finally{clearTimeout(timer);loading=false;active();}
}
function picture(src,alt){const url=safeImage(src,document.baseURI);if(!url)return null;const img=node('img');img.src=url;img.alt=alt;img.loading='lazy';img.referrerPolicy='no-referrer';img.addEventListener('error',()=>img.replaceWith(node('span','Imagen no disponible','muted')),{once:true});return img;}
function favorite(id){const a=data.preferencias.celulares_favoritos;data.preferencias.celulares_favoritos=a.includes(id)?a.filter(x=>x!==id):[...a,id];saveLocal('Favoritos actualizados.');renderCards();}
function renderCards(){
  const root=$('lista');root.replaceChildren();if(!data)return;
  const query=$('buscar').value.toLocaleLowerCase('es').trim();
  const phones=data.celulares.filter(p=>(!$('solo-favoritos').checked||data.preferencias.celulares_favoritos.includes(p.id))&&[p.nombre,p.marca,p.modelo,p.procesador.modelo].join(' ').toLocaleLowerCase('es').includes(query));
  $('cantidad').textContent=`${phones.length} / ${data.celulares.length}`;
  if(!phones.length)root.append(node('p','No hay celulares que coincidan.'));
  for(const p of phones){
    const card=node('article',undefined,'card'+(selected.has(p.id)?' selected':''));
    const img=picture(p.multimedia.imagen_principal,p.nombre);card.append(img||node('div','Sin imagen','placeholder'));
    const label=node('label',undefined,'check'),cb=node('input');cb.type='checkbox';cb.checked=selected.has(p.id);
    cb.addEventListener('change',()=>{if(cb.checked&&selected.size>=8){cb.checked=false;notice('Puedes comparar hasta 8 celulares a la vez.',true);return;}cb.checked?selected.add(p.id):selected.delete(p.id);attributeSet=null;renderCards();renderTable();});
    label.append(cb,node('strong',p.nombre));card.append(label,node('small',[p.marca,p.region].filter(Boolean).join(' · ')||'Variante sin especificar','muted'));
    const dl=node('dl');for(const [k,v] of [['Procesador',p.procesador.modelo],['RAM (GB)',p.memoria.ram_gb],['Almacenamiento (GB)',p.memoria.almacenamiento_gb],['Batería (mAh)',p.bateria.capacidad_tipica_mah]])dl.append(node('dt',k),node('dd',display(v)));card.append(dl);
    if(p.multimedia.galeria.length){const g=node('div',undefined,'card-gallery');for(const item of p.multimedia.galeria){const im=picture(item.url,item.texto_alternativo||p.nombre);if(im)g.append(im);}card.append(g);}
    const actions=node('div',undefined,'toolbar'),fav=button(data.preferencias.celulares_favoritos.includes(p.id)?'★ Favorito':'☆ Favorito',()=>favorite(p.id));fav.setAttribute('aria-pressed',String(data.preferencias.celulares_favoritos.includes(p.id)));
    actions.append(fav,button('Editar',()=>openEditor(p)),button('Eliminar',()=>{if(!confirm('¿Eliminar '+p.nombre+'? También se limpiarán sus referencias y comparativas con menos de dos celulares.'))return;data=removePhone(data,p.id);selected.delete(p.id);if(editing===p.id)closeEditor();saveLocal('Celular eliminado.');render();},'danger'));card.append(actions);root.append(card);
  }
}
function renderTable(){
  const out=$('tabla');out.replaceChildren();visiblePaths=[];$('quitar-filtro-guardado').hidden=!attributeSet;
  if(!data)return;const phones=data.celulares.filter(p=>selected.has(p.id));
  if(phones.length<2){out.append(node('p','Selecciona al menos dos celulares.'));return;}
  const maps=phones.map(p=>new Map(flatPhone(p).map(r=>[r.path,r]))),all=new Map();maps.forEach(m=>m.forEach((r,k)=>all.set(k,r)));
  const group=$('seccion').value,search=$('filtro-atributos').value.toLocaleLowerCase('es').trim();
  const rows=[...all.values()].filter(r=>{
    if(['id','nombre'].includes(r.path))return false;
    if(attributeSet&&!attributeSet.has(r.path))return false;
    if(!attributeSet&&group==='resumen'&&!summaryPaths.has(r.path))return false;
    if(!attributeSet&&group!=='resumen'&&group!=='todas'&&r.group!==group)return false;
    if(search&&!(r.label+' '+r.path).toLocaleLowerCase('es').includes(search))return false;
    const vals=maps.map(m=>display(m.get(r.path)?.value));
    if(!$('mostrar-vacios').checked&&vals.every(v=>v==='Sin dato'))return false;
    if($('solo-diferencias').checked&&vals.every(v=>v===vals[0]))return false;return true;
  });
  visiblePaths=rows.map(r=>r.path);if(!rows.length){out.append(node('p','No hay atributos que coincidan con estos filtros.'));return;}
  const table=node('table'),caption=node('caption','Comparación de '+phones.map(p=>p.nombre).join(' / '));table.append(caption);const head=node('thead'),hr=node('tr');
  for(const text of ['Característica',...phones.map(p=>p.nombre)]){const th=node('th',text);th.scope='col';hr.append(th);}head.append(hr);table.append(head);const body=node('tbody');
  for(const r of rows){const tr=node('tr'),th=node('th',r.label);th.scope='row';tr.append(th);for(const m of maps){const text=display(m.get(r.path)?.value);tr.append(node('td',text,text==='Sin dato'?'missing':''));}body.append(tr);}table.append(body);out.append(table);
}
function renderComparisons(){
  const root=$('comparativas');root.replaceChildren();if(!data)return;
  const comps=data.comparativas.filter(c=>!$('comps-favoritas').checked||c.favorita);
  if(!comps.length)root.append(node('p','No hay comparativas guardadas.','muted'));
  for(const c of comps){
    const el=node('article');el.append(node('strong',c.nombre),node('p',c.celulares_ids.map(id=>data.celulares.find(p=>p.id===id)?.nombre||id).join(' / '),'muted'));
    const bar=node('div',undefined,'toolbar'),fav=button(c.favorita?'★ Favorita':'☆ Favorita',()=>{c.favorita=!c.favorita;saveLocal('Comparativa actualizada.');renderComparisons();});fav.setAttribute('aria-pressed',String(!!c.favorita));
    bar.append(button('Cargar',()=>{if(c.celulares_ids.length>8){notice('Esta comparativa contiene más de 8 celulares. Reduce su lista en el JSON para cargarla.',true);return;}selected=new Set(c.celulares_ids);attributeSet=c.atributos_visibles?.length?new Set(c.atributos_visibles):null;$('seccion').value='todas';$('filtro-atributos').value='';$('solo-diferencias').checked=false;$('mostrar-vacios').checked=true;renderCards();renderTable();notice('Comparativa cargada: '+c.nombre);}),fav,button('Eliminar',()=>{if(!confirm('¿Eliminar la comparativa '+c.nombre+'?'))return;data.comparativas=data.comparativas.filter(x=>x.id!==c.id);saveLocal('Comparativa eliminada.');renderComparisons();},'danger'));
    el.append(bar);if(c.notas)el.append(node('p',c.notas));root.append(el);
  }
}
function render(){renderCards();renderTable();renderComparisons();}
// A schema-driven editor: all defined fields are editable, and unknown fields
// remain in the draft so saving never silently strips imported extensions.
function flush(){readers.forEach(read=>read());}
function schemaEditor(value,schema,onChange,path){
  if(schema.type==='object'&&!schema['x-editor']){
    const container=node('div',undefined,'fields');
    for(const [key,sub] of Object.entries(schema.properties||{})){
      const editor=schemaEditor(value[key],sub,v=>value[key]=v,path?path+'.'+key:key);
      if(sub.type==='object'||(sub.type==='array'&&sub.items.type==='object')){const panel=node('details',undefined,'panel');panel.append(node('summary',sub.title||key),editor);container.append(panel);}
      else{const label=node('label',sub.title||key);editor.setAttribute('aria-label',sub.title||key);label.append(editor);container.append(label);}
    }return container;
  }
  if(schema.type==='array'&&schema.items.type==='object'){
    const container=node('div',undefined,'array');
    value.forEach((item,i)=>{const el=node('div',undefined,'array-item');el.append(node('strong',`${schema.items.title} ${i+1}`),schemaEditor(item,schema.items,()=>{},path+'.'+i),button('Quitar este elemento',()=>{try{flush();if(!confirm('¿Quitar este elemento?'))return;value.splice(i,1);renderEditor();}catch(e){notice(e.message,true);}},'danger'));container.append(el);});
    container.append(button('+ Añadir '+schema.items.title.toLowerCase(),()=>{try{flush();if(value.length>=schema.maxItems)throw Error('Se alcanzó el límite de elementos.');value.push(empty(schema.items));renderEditor(path);}catch(e){notice(e.message,true);}}));return container;
  }
  if(schema['x-editor']==='json'){
    const area=node('textarea');area.rows=5;area.value=JSON.stringify(value,null,2);readers.push(()=>{const v=JSON.parse(area.value||'{}');guard(v);validate(v,schema,path);onChange(v);});return area;
  }
  if(schema.type==='array'){
    const area=node('textarea');area.rows=3;area.placeholder='Un elemento por línea';area.value=value.join('\n');area.addEventListener('input',()=>onChange(area.value.split('\n').map(s=>s.trim()).filter(Boolean)));return area;
  }
  const types=Array.isArray(schema.type)?schema.type:[schema.type];
  if(types.includes('boolean')){
    const input=node('select');for(const [v,t] of [['','Sin dato'],['true','Sí'],['false','No']]){const opt=node('option',t);opt.value=v;input.append(opt);}input.value=value===null?'':String(value);input.addEventListener('change',()=>onChange(input.value===''?null:input.value==='true'));return input;
  }
  const input=node('input');input.type=types.includes('number')?'number':schema.format==='date'?'date':'text';input.value=value??'';input.placeholder=types.includes('null')?'Sin dato':'';
  if(input.type==='number'){input.step='any';if(schema.minimum!==undefined)input.min=schema.minimum;if(schema.maximum!==undefined)input.max=schema.maximum;}
  if(schema.maxLength)input.maxLength=schema.maxLength;
  if(path==='id')input.readOnly=true;
  input.addEventListener('input',()=>onChange(input.value===''?(types.includes('null')?null:''):input.type==='number'?Number(input.value):input.value));
  readers.push(()=>{if(input.validity.badInput)throw Error(path+': número inválido.');});return input;
}
function renderEditor(openPath){
  const open=[...$('campos').querySelectorAll('details[open]')].map(d=>d.querySelector('summary').textContent);
  readers=[];$('campos').replaceChildren(schemaEditor(draft,phoneSchema,()=>{},''));
  for(const d of $('campos').querySelectorAll('details'))if(open.includes(d.querySelector('summary').textContent)||openPath&&d.querySelector('summary').textContent===phoneSchema.properties[openPath.split('.')[0]]?.title)d.open=true;
  $('raw').value=JSON.stringify(draft,null,2);
}
function openEditor(phone){
  if(draft&&!confirm('¿Descartar los cambios del editor actual?'))return;
  imageTurn++;imageBusy=false;editing=phone?.id||null;draft=phone?clone(phone):newPhone();
  $('editor').hidden=false;$('titulo-editor').textContent=phone?'Editar '+phone.nombre:'Agregar celular';
  $('nota-personal').value=data.preferencias.notas_por_celular[draft.id]||'';$('etiquetas').value=(data.preferencias.etiquetas_por_celular[draft.id]||[]).join('\n');$('foto').value='';$('raw-panel').open=false;
  $('campos').replaceChildren();renderEditor();$('editor').scrollIntoView({behavior:'smooth',block:'start'});
}
$('form').addEventListener('submit',e=>{
  e.preventDefault();if(!draft)return;
  try{
    if(imageBusy)throw Error('Espera a que termine de prepararse la foto.');flush();guard(draft);validate(draft,phoneSchema,'celular');
    if(editing&&draft.id!==editing)throw Error('No cambies el ID de un celular existente.');
    const next=clone(data),index=next.celulares.findIndex(p=>p.id===draft.id);
    if(!editing&&index>=0)throw Error('El ID ya existe.');
    if(index>=0)next.celulares[index]=clone(draft);else next.celulares.push(clone(draft));
    next.preferencias.notas_por_celular[draft.id]=$('nota-personal').value;
    next.preferencias.etiquetas_por_celular[draft.id]=$('etiquetas').value.split('\n').map(s=>s.trim()).filter(Boolean);
    data=normalize(next).catalog;if(selected.size<8)selected.add(draft.id);const name=draft.nombre;closeEditor();saveLocal('Guardado: '+name+'.');render();
  }catch(e){notice(e.message,true);}
});
$('raw-panel').addEventListener('toggle',()=>{if($('raw-panel').open&&draft){try{flush();$('raw').value=JSON.stringify(draft,null,2);}catch(e){notice(e.message,true);}}});
$('raw-aplicar').addEventListener('click',()=>{
  try{const value=JSON.parse($('raw').value);guard(value);validate(value,phoneSchema,'celular');if(editing&&value.id!==editing)throw Error('El ID del celular existente debe mantenerse.');
    const isolated={version:3,celulares:[value],preferencias:{celulares_favoritos:[],notas_por_celular:{},etiquetas_por_celular:{}},comparativas:[]};draft=normalize(isolated).catalog.celulares[0];renderEditor();notice('JSON cargado en el formulario. Pulsa Guardar celular para confirmar.');
  }catch(e){notice('JSON del celular: '+e.message,true);}
});
$('foto').addEventListener('change',async()=>{
  const file=$('foto').files[0];if(!file||!draft)return;const turn=++imageTurn;imageBusy=true;
  let url;
  try{
    if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Usa JPG, PNG o WebP.');if(file.size>12_000_000)throw Error('La foto supera 12 MB.');
    url=URL.createObjectURL(file);const img=new Image();await new Promise((ok,fail)=>{img.onload=ok;img.onerror=()=>fail(Error('No se pudo leer la imagen.'));img.src=url;});
    if(turn!==imageTurn||!draft)return;
    const scale=Math.min(1,800/Math.max(img.width,img.height)),cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(img.width*scale));cv.height=Math.max(1,Math.round(img.height*scale));cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);
    const result=cv.toDataURL('image/webp',.8);if(result.length>1_000_000)throw Error('La imagen sigue siendo demasiado grande.');flush();draft.multimedia.imagen_principal=result;renderEditor();notice('Foto preparada. Guarda el celular para conservarla.');
  }catch(e){if(turn===imageTurn)notice(e.message,true);}finally{if(url)URL.revokeObjectURL(url);if(turn===imageTurn)imageBusy=false;}
});
$('cancelar').addEventListener('click',()=>{if(confirm('¿Cerrar el editor sin guardar sus cambios?'))closeEditor();});
$('nuevo').addEventListener('click',()=>openEditor(null));
$('exportar').addEventListener('click',()=>{if(draft){notice('Guarda o cierra el editor antes de exportar. Sus cambios aún no están en el catálogo.',true);return;}download('celulares.json',JSON.stringify(normalize(data).catalog,null,2),'application/json');notice('JSON exportado. Incluye preferencias y notas; al publicarlo serán visibles.');});
$('csv').addEventListener('click',()=>{if(draft){notice('Guarda o cierra el editor antes de exportar.',true);return;}download('celulares.csv',catalogCSV(data),'text/csv;charset=utf-8');});
$('importar').addEventListener('change',async()=>{
  const input=$('importar'),file=input.files[0];if(!file)return;
  try{
    if(file.size>25_000_000)throw Error('El archivo supera 25 MB.');const result=parse(await file.text()),replace=$('modo-importar').value==='replace';
    if(!confirm(`${replace?'Reemplazar el catálogo completo':'Combinar por ID (el importado reemplaza los registros coincidentes)'} con ${result.catalog.celulares.length} celulares y ${result.catalog.comparativas.length} comparativas? Se cerrará el editor. Exporta antes si necesitas un respaldo.`))return;
    if(loading)throw Error('Espera a que termine la carga del catálogo y vuelve a importar.');
    const next=replace||!data?result.catalog:mergeCatalog(data,result.catalog);apply(next,'Borrador importado.');saveLocal('Importación completada. '+result.warnings.join(' '));
  }catch(e){notice('No se importó el archivo: '+e.message,true);}finally{input.value='';}
});
$('recuperar').addEventListener('click',()=>{
  try{
    let result=null;const failed=[];
    for(const key of [KEY,...LEGACY_KEYS]){try{const raw=localStorage.getItem(key);if(raw!==null){result=parse(raw);break;}}catch{failed.push(key);}}
    if(!result)throw Error(failed.length?'No se pudo leer un borrador válido.':'No hay borradores en este navegador y dirección.');
    if(!confirm('¿Recuperar el borrador local y reemplazar la vista actual? Puede contener información anterior a la publicada.'))return;
    apply(result.catalog,'Borrador local recuperado.');notice('Borrador recuperado. '+result.warnings.join(' '));
  }catch(e){notice(e.message,true);}
});
$('publicado').addEventListener('click',()=>{if(data&&!confirm('¿Recargar el JSON publicado? La vista y el editor se reemplazarán. El último borrador guardado no se borra.'))return;loadPublished();});
$('limpiar').addEventListener('click',()=>{selected.clear();attributeSet=null;renderCards();renderTable();});
$('guardar-comparativa').addEventListener('click',()=>{
  const name=$('nombre-comparativa').value.trim();if(!name||selected.size<2){notice('Escribe un nombre y selecciona al menos dos celulares.',true);return;}
  if(!visiblePaths.length){notice('Ajusta los filtros para mostrar al menos un atributo antes de guardar.',true);return;}
  const c={id:newId('comp'),nombre:name,celulares_ids:[...selected],atributos_visibles:[...visiblePaths],favorita:false,notas:''};
  try{const next=clone(data);next.comparativas.push(c);data=normalize(next).catalog;$('nombre-comparativa').value='';saveLocal('Comparativa guardada.');renderComparisons();}catch(e){notice(e.message,true);}
});
for(const id of ['buscar','solo-favoritos'])$(id).addEventListener('input',renderCards);
for(const id of ['seccion','filtro-atributos','solo-diferencias','mostrar-vacios'])$(id).addEventListener('input',()=>{if(id==='seccion')attributeSet=null;renderTable();});
$('comps-favoritas').addEventListener('change',renderComparisons);
$('quitar-filtro-guardado').addEventListener('click',()=>{attributeSet=null;renderTable();});
for(const [key,schema] of Object.entries(phoneSchema.properties))if(schema.type==='object'||schema.type==='array'&&schema.items.type==='object'){const opt=node('option',schema.title);opt.value=key;$('seccion').append(opt);}
window.addEventListener('beforeunload',e=>{if(draft){e.preventDefault();e.returnValue='';}});
loadPublished();
