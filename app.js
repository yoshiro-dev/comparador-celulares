const CLAVE="comparador-celulares-json-borrador-v1";
const CLAVE_V2="comparador-celulares-v2";
const CLAVE_V1="comparador-celulares-v1";
const IMG_RE=/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const IMG_MAX=250000;
let publicado={celulares:[],comparativas:[]};
let publicadoDisponible=false;
let cargando=false;
const campos=[
{k:"nombre",t:"Nombre",tipo:"text"},
{k:"chip",t:"Procesador",tipo:"text"},
{k:"antutu",t:"AnTuTu (aprox.)",tipo:"number"},
{k:"ram",t:"RAM (GB)",tipo:"number"},
{k:"almacenamiento",t:"Almacenamiento (GB)",tipo:"number"},
{k:"pantalla",t:"Pantalla (pulgadas)",tipo:"number",paso:"0.01"},
{k:"hz",t:"Refresco (Hz)",tipo:"number"},
{k:"bateria",t:"Batería (mAh)",tipo:"number"},
{k:"carga",t:"Carga (W)",tipo:"number"},
{k:"peso",t:"Peso (g)",tipo:"number"}
];
const filas=[
{k:"chip",t:"Procesador"},
{k:"antutu",t:"AnTuTu (aprox.)",mejor:"max",f:v=>v.toLocaleString("es-MX")},
{k:"ram",t:"RAM",mejor:"max",f:v=>v+" GB"},
{k:"almacenamiento",t:"Almacenamiento",mejor:"max",f:v=>v+" GB"},
{k:"pantalla",t:"Pantalla",f:v=>v+" pulgadas"},
{k:"hz",t:"Tasa de refresco",mejor:"max",f:v=>v+" Hz"},
{k:"bateria",t:"Batería",mejor:"max",f:v=>v+" mAh"},
{k:"carga",t:"Carga rápida",mejor:"max",f:v=>v+" W"},
{k:"peso",t:"Peso",mejor:"min",f:v=>v+" g"}
];

const $=id=>document.getElementById(id);
const lista=$("lista"),salida=$("salida"),avisoEl=$("aviso"),form=$("form"),importar=$("importar");
const soloFav=$("soloFav"),soloFavComp=$("soloFavComp"),listaComps=$("listaComps");
const nombreComp=$("nombreComp"),archivoImg=$("f-imagen");

function aviso(msg,error=false){
avisoEl.textContent=msg;
avisoEl.className=error?"error":"";
}

function imagenURLValida(s){
if(!s||s.length>2048)return false;
try{
const u=new URL(s,document.baseURI);
return ["http:","https:"].includes(u.protocol);
}catch{return false;}
}

function validar(c){
if(!c||typeof c!=="object")return null;
const o={};
for(const f of campos){
const v=c[f.k];
if(f.tipo==="text"){
if(typeof v!=="string"||!v.trim())return null;
o[f.k]=v.trim().slice(0,80);
}else{
if(!["number","string"].includes(typeof v)||String(v).trim()==="")return null;
const n=Number(v);
if(!Number.isFinite(n)||n<0)return null;
o[f.k]=n;
}
}
o.fav=c.fav===true;
if(typeof c.imagen==="string"){
const s=c.imagen.trim();
if((s.length<=IMG_MAX&&IMG_RE.test(s))||imagenURLValida(s))o.imagen=s;
}
return o;
}

function validarComp(k){
if(!k||typeof k!=="object"||typeof k.nombre!=="string"||!k.nombre.trim()||!Array.isArray(k.celulares))return null;
const n=k.celulares.filter(x=>typeof x==="string").map(x=>x.slice(0,80)).slice(0,10);
if(n.length<2)return null;
return {nombre:k.nombre.trim().slice(0,80),celulares:n,fav:k.fav===true};
}

function leer(d){
const arr=Array.isArray(d)?d:d&&d.celulares;
const brutos=Array.isArray(arr)?arr:[];
const rawComp=d&&!Array.isArray(d)&&Array.isArray(d.comparativas)?d.comparativas:[];
const cel=brutos.map(validar).filter(Boolean);
const comp=rawComp.map(validarComp).filter(Boolean);
return {cel,comp,omitidos:brutos.length-cel.length+rawComp.length-comp.length};
}

// The published JSON is authoritative on each page load. Never silently
// replace it with an old localStorage snapshot. Recovery is an explicit action.
function leerDocumento(d){
if(!Array.isArray(d)&&(!d||typeof d!=="object"||!Array.isArray(d.celulares)))
throw new Error("se esperaba un objeto con celulares o una lista de celulares");
if(!Array.isArray(d)&&d.version!==undefined&&![1,2].includes(d.version))
throw new Error("versión de JSON no compatible");
if(!Array.isArray(d)&&d.comparativas!==undefined&&!Array.isArray(d.comparativas))
throw new Error("comparativas debe ser una lista");
const r=leer(d);
if(r.omitidos)throw new Error("hay "+r.omitidos+" registros inválidos; corrige el archivo antes de cargarlo");
const nombres=r.cel.map(c=>c.nombre.toLowerCase());
if(new Set(nombres).size!==nombres.length)throw new Error("hay celulares con nombres repetidos");
return {celulares:r.cel,comparativas:r.comp};
}

function borradorLocal(){
let error=false;
for(const clave of [CLAVE,CLAVE_V2,CLAVE_V1]){
try{
const raw=localStorage.getItem(clave);
if(raw!==null)return leerDocumento(JSON.parse(raw));
}catch{error=true;}
}
throw new Error(error?"no se pudo leer el borrador local":"no hay un borrador guardado en este navegador");
}

let celulares=[],comparativas=[];
const seleccion=new Set();
let editando=null;
let imagenNueva=null;
let imagenProcesando=false;
let imagenTurno=0;

function guardar(){
try{
localStorage.setItem(CLAVE,JSON.stringify({version:2,celulares,comparativas}));
return true;
}catch(e){
aviso("No se pudo guardar el borrador (almacenamiento lleno o bloqueado). Exporta el JSON para conservar los cambios.",true);
return false;
}
}

function persistir(msg){
$("estado").textContent="Borrador local: exporta celulares.json y súbelo al repositorio para publicar estos cambios.";
if(guardar())aviso((msg||"Borrador guardado.")+" Solo en este navegador.");
}

function upsert(c){
const i=celulares.findIndex(y=>y.nombre.toLowerCase()===c.nombre.toLowerCase());
if(i>=0){
const anterior=celulares[i].nombre;
if(anterior!==c.nombre){
comparativas.forEach(k=>{k.celulares=k.celulares.map(n=>n===anterior?c.nombre:n);});
if(seleccion.delete(anterior))seleccion.add(c.nombre);
}
if(!c.imagen&&celulares[i].imagen)c.imagen=celulares[i].imagen;
celulares[i]=c;
}else celulares.push(c);
}

function descargar(nombre,texto,tipo){
const url=URL.createObjectURL(new Blob([texto],{type:tipo}));
const a=document.createElement("a");
a.href=url;
a.download=nombre;
document.body.append(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
}

function celdaCsv(v){
let s=String(v);
if(/^[=+\-@]/.test(s))s="'"+s;
return '"'+s.replace(/"/g,'""')+'"';
}

function reducirImagen(file){
return new Promise((res,rej)=>{
if(!/^image\/(jpeg|png|webp)$/.test(file.type))return rej(new Error("usa JPG, PNG o WebP"));
const url=URL.createObjectURL(file);
const img=new Image();
img.onload=()=>{
const e=Math.min(1,480/Math.max(img.width,img.height));
const cv=document.createElement("canvas");
cv.width=Math.max(1,Math.round(img.width*e));
cv.height=Math.max(1,Math.round(img.height*e));
cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
URL.revokeObjectURL(url);
let d=cv.toDataURL("image/webp",0.8);
if(!d.startsWith("data:image/webp"))d=cv.toDataURL("image/jpeg",0.8);
res(d);
};
img.onerror=()=>{
URL.revokeObjectURL(url);
rej(new Error("no se pudo leer la imagen"));
};
img.src=url;
});
}

function boton(texto,clase,fn,label){
const b=document.createElement("button");
b.type="button";
b.className=clase;
b.textContent=texto;
if(label)b.setAttribute("aria-label",label);
b.addEventListener("click",fn);
return b;
}

function botonFav(x,fn){
const b=boton(x.fav?"★ Favorito":"☆ Favorito","sec",fn,"Favorito: "+x.nombre);
b.setAttribute("aria-pressed",String(!!x.fav));
return b;
}

function pintarLista(){
lista.replaceChildren();
const vis=celulares.filter(c=>!soloFav.checked||c.fav);
if(!vis.length){
lista.textContent="No hay celulares para mostrar.";
return;
}
vis.forEach(c=>{
const card=document.createElement("article");
card.className="card";
if(c.imagen){
const im=document.createElement("img");
im.src=c.imagen;
im.alt="";
card.append(im);
}else{
const ph=document.createElement("div");
ph.className="ph";
ph.setAttribute("aria-hidden","true");
ph.textContent="📱";
card.append(ph);
}
const l=document.createElement("label");
const cb=document.createElement("input");
cb.type="checkbox";
cb.checked=seleccion.has(c.nombre);
cb.addEventListener("change",()=>{
if(cb.checked)seleccion.add(c.nombre);else seleccion.delete(c.nombre);
render();
});
l.append(cb,c.nombre);
const a=document.createElement("div");
a.className="acciones";
a.append(
botonFav(c,()=>{
c.fav=!c.fav;
persistir();
pintarLista();
}),
boton("Editar","sec",()=>editar(c),"Editar "+c.nombre),
boton("Eliminar","peligro",()=>{
if(!confirm("¿Eliminar "+c.nombre+"?"))return;
celulares=celulares.filter(x=>x.nombre!==c.nombre);
seleccion.delete(c.nombre);
pintarLista();
render();
persistir("Eliminado: "+c.nombre);
},"Eliminar "+c.nombre)
);
card.append(l,a);
lista.append(card);
});
}

function pintarComps(){
listaComps.replaceChildren();
const vis=comparativas.filter(k=>!soloFavComp.checked||k.fav);
if(!vis.length){
listaComps.textContent="Aún no hay comparativas para mostrar.";
return;
}
vis.forEach(k=>{
const d=document.createElement("div");
d.className="item";
const t=document.createElement("div");
const n=document.createElement("strong");
n.textContent=k.nombre;
const s=document.createElement("div");
s.textContent=k.celulares.join(" vs ");
t.append(n,s);
const a=document.createElement("div");
a.className="acciones";
a.append(
boton("Cargar","sec",()=>cargarComp(k),"Cargar comparativa "+k.nombre),
botonFav(k,()=>{
k.fav=!k.fav;
persistir();
pintarComps();
}),
boton("Eliminar","peligro",()=>{
if(!confirm("¿Eliminar la comparativa "+k.nombre+"?"))return;
comparativas=comparativas.filter(x=>x!==k);
pintarComps();
persistir("Comparativa eliminada");
},"Eliminar comparativa "+k.nombre)
);
d.append(t,a);
listaComps.append(d);
});
}

function cargarComp(k){
const ok=k.celulares.filter(n=>celulares.some(c=>c.nombre===n));
if(ok.length<2){
aviso("Esa comparativa ya no tiene suficientes celulares",true);
return;
}
seleccion.clear();
ok.forEach(n=>seleccion.add(n));
pintarLista();
render();
aviso("Comparativa cargada: "+k.nombre+(ok.length<k.celulares.length?" (faltan algunos celulares)":""));
}

function render(){
const sel=celulares.filter(c=>seleccion.has(c.nombre));
salida.replaceChildren();
if(sel.length<2){
salida.textContent="Elige al menos 2 celulares para comparar.";
return;
}
const tabla=document.createElement("table");
const cap=tabla.createCaption();
cap.className="sr";
cap.textContent="Comparativa de celulares";
const hr=tabla.createTHead().insertRow();
const th0=document.createElement("th");
th0.scope="col";
th0.textContent="Característica";
hr.append(th0);
sel.forEach(c=>{
const th=document.createElement("th");
th.scope="col";
if(c.imagen){
const im=document.createElement("img");
im.src=c.imagen;
im.alt="";
th.append(im);
}
th.append(c.nombre);
hr.append(th);
});
const tb=tabla.createTBody();
filas.forEach(f=>{
const tr=tb.insertRow();
const th=document.createElement("th");
th.scope="row";
th.textContent=f.t;
tr.append(th);
const vals=sel.map(c=>c[f.k]);
const best=f.mejor?(f.mejor==="max"?Math.max(...vals):Math.min(...vals)):null;
const empate=best!==null&&vals.every(v=>v===best);
sel.forEach(c=>{
const v=c[f.k];
const td=tr.insertCell();
td.textContent=f.f?f.f(v):v;
if(best!==null&&v===best&&!empate){
td.className="gana";
const s=document.createElement("span");
s.className="sr";
s.textContent=" (mejor)";
td.append(s);
}
});
});
salida.append(tabla);
}

const contCampos=form.querySelector(".campos");
campos.forEach(f=>{
const w=document.createElement("div");
const l=document.createElement("label");
l.htmlFor="f-"+f.k;
l.textContent=f.t;
const i=document.createElement("input");
i.id="f-"+f.k;
i.name=f.k;
i.type=f.tipo;
i.required=true;
if(f.tipo==="number"){
i.min="0";
i.step=f.paso||"1";
i.inputMode="decimal";
}
w.append(l,i);
contCampos.append(w);
});

function editar(c){
imagenTurno++;
imagenProcesando=false;
editando=c.nombre;
imagenNueva=null;
archivoImg.value="";
campos.forEach(f=>{$("f-"+f.k).value=c[f.k];});
$("guardarCel").textContent="Actualizar celular";
$("cancelar").hidden=false;
$("detalle").open=true;
$("f-nombre").focus();
}

function salirEdicion(){
imagenTurno++;
imagenProcesando=false;
editando=null;
imagenNueva=null;
form.reset();
archivoImg.value="";
$("guardarCel").textContent="Guardar celular";
$("cancelar").hidden=true;
}

archivoImg.addEventListener("change",async()=>{
const f=archivoImg.files[0];
const turno=++imagenTurno;
imagenProcesando=false;
imagenNueva=null;
if(!f)return;
try{
imagenProcesando=true;
const d=await reducirImagen(f);
if(turno!==imagenTurno)return;
if(d.length>IMG_MAX)throw new Error("la imagen sigue muy pesada");
imagenNueva=d;
aviso("Imagen lista");
}catch(err){
if(turno!==imagenTurno)return;
archivoImg.value="";
aviso("Error con la imagen: "+err.message,true);
}finally{if(turno===imagenTurno)imagenProcesando=false;}
});

form.addEventListener("submit",e=>{
e.preventDefault();
if(imagenProcesando){aviso("Espera a que termine de prepararse la imagen.",true);return;}
const c=validar(Object.fromEntries(new FormData(form)));
if(!c){
aviso("Revisa los datos del formulario",true);
return;
}
if(editando&&celulares.some(x=>x.nombre!==editando&&x.nombre.toLowerCase()===c.nombre.toLowerCase())){
aviso("Ya existe otro celular con ese nombre.",true);return;
}
const previo=celulares.find(x=>x.nombre.toLowerCase()===(editando||c.nombre).toLowerCase());
c.fav=previo?previo.fav:false;
if(imagenNueva)c.imagen=imagenNueva;
else if(previo&&previo.imagen)c.imagen=previo.imagen;
if(editando&&editando!==c.nombre){
celulares=celulares.filter(x=>x.nombre!==editando);
comparativas.forEach(k=>{k.celulares=k.celulares.map(n=>n===editando?c.nombre:n);});
seleccion.delete(editando);
}
upsert(c);
seleccion.add(c.nombre);
salirEdicion();
pintarLista();
pintarComps();
render();
persistir("Guardado: "+c.nombre);
});

$("cancelar").addEventListener("click",()=>{
salirEdicion();
aviso("Edición cancelada");
});

$("guardarComp").addEventListener("click",()=>{
const nom=nombreComp.value.trim();
const nombres=celulares.filter(c=>seleccion.has(c.nombre)).map(c=>c.nombre);
if(!nom){
aviso("Ponle nombre a la comparativa",true);
nombreComp.focus();
return;
}
if(nombres.length<2){
aviso("Selecciona al menos 2 celulares",true);
return;
}
const i=comparativas.findIndex(k=>k.nombre.toLowerCase()===nom.toLowerCase());
const nueva={nombre:nom.slice(0,80),celulares:nombres,fav:i>=0?comparativas[i].fav:false};
if(i>=0)comparativas[i]=nueva;else comparativas.push(nueva);
nombreComp.value="";
pintarComps();
persistir("Comparativa guardada: "+nueva.nombre);
});

soloFav.addEventListener("change",pintarLista);
soloFavComp.addEventListener("change",pintarComps);

$("expJson").addEventListener("click",()=>{
descargar("celulares.json",JSON.stringify({version:2,celulares,comparativas},null,2),"application/json");
aviso("Exportado celulares.json");
});

$("expCsv").addEventListener("click",()=>{
const cols=[...campos.map(f=>f.k),"favorito"];
const enc=cols.map(celdaCsv).join(",");
const cuerpo=celulares.map(c=>[...campos.map(f=>c[f.k]),c.fav?"si":"no"].map(celdaCsv).join(",")).join("\n");
descargar("celulares.csv","\ufeff"+enc+"\n"+cuerpo,"text/csv;charset=utf-8");
aviso("Exportado celulares.csv");
});

importar.addEventListener("change",async()=>{
const f=importar.files[0];
if(!f)return;
try{
if(f.size>20000000)throw new Error("el archivo pesa más de 20 MB");
const d=leerDocumento(JSON.parse(await f.text()));
const r={cel:d.celulares,comp:d.comparativas,omitidos:0};
r.cel.forEach(upsert);
r.comp.forEach(k=>{
const i=comparativas.findIndex(x=>x.nombre.toLowerCase()===k.nombre.toLowerCase());
if(i>=0)comparativas[i]=k;else comparativas.push(k);
});
pintarLista();
pintarComps();
render();
persistir("Importados "+r.cel.length+" celulares y "+r.comp.length+" comparativas"+(r.omitidos?" ("+r.omitidos+" omitidos por datos inválidos)":""));
}catch(e){
aviso("Error al importar: "+e.message,true);
}
importar.value="";
});

function aplicar(datos){
celulares=structuredClone(datos.celulares);
comparativas=structuredClone(datos.comparativas);
seleccion.clear();
celulares.slice(0,2).forEach(c=>seleccion.add(c.nombre));
soloFav.checked=false;
soloFavComp.checked=false;
salirEdicion();
pintarLista();
pintarComps();
render();
}

function bloquear(valor){
document.querySelectorAll("button,input").forEach(el=>{el.disabled=valor;});
}

async function cargarPublicado(){
if(cargando)return;
cargando=true;
bloquear(true);
$("reintentar").hidden=true;
aviso("Cargando celulares.json…");
const controlador=new AbortController();
const limite=setTimeout(()=>controlador.abort(),15000);
try{
const respuesta=await fetch(new URL("./celulares.json",document.baseURI),{
cache:"no-store",signal:controlador.signal
});
if(!respuesta.ok)throw new Error("HTTP "+respuesta.status+": revisa que celulares.json esté junto a index.html");
const datos=leerDocumento(await respuesta.json());
publicado=datos;
publicadoDisponible=true;
aplicar(publicado);
bloquear(false);
$("estado").textContent="Mostrando el catálogo publicado. Puedes recuperar tu borrador local con el botón correspondiente.";
aviso("Catálogo cargado: "+celulares.length+" celulares.");
}catch(e){
// Keep the currently visible data; never erase a draft because a fetch failed.
bloquear(!publicadoDisponible);
$("recuperar").disabled=false;
$("reintentar").hidden=false;
$("reintentar").disabled=false;
const detalle=location.protocol==="file:"
?"Abre el proyecto con un servidor local (por ejemplo, Live Server) o desde GitHub Pages; no mediante doble clic."
:e.name==="AbortError"?"Se agotó el tiempo de espera. Reintenta la carga.":e.message;
aviso("No se pudo cargar celulares.json. "+detalle,true);
}finally{
clearTimeout(limite);
cargando=false;
}
}

$("reset").addEventListener("click",()=>{
if(!confirm("¿Volver al catálogo publicado? Los cambios visibles se reemplazarán. Puedes exportarlos primero; el último borrador local no se borra."))return;
cargarPublicado();
});
$("reintentar").addEventListener("click",cargarPublicado);
$("recuperar").addEventListener("click",()=>{
try{
const datos=borradorLocal();
if(!confirm("¿Cargar el último borrador local? Reemplazará la vista actual y puede contener datos anteriores al JSON publicado. Exporta antes si necesitas conservar la vista actual."))return;
aplicar(datos);
bloquear(false);
$("estado").textContent="Mostrando un borrador local. Exporta el JSON para conservarlo o publicarlo.";
aviso("Borrador recuperado; el JSON publicado no se ha modificado.");
}catch(e){aviso(e.message,true);}
});

cargarPublicado();
