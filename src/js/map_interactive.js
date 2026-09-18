/* Aqua Max - Mapa interactivo (Leaflet + tiles CARTO).
   CARTO basemaps no aplican la politica de bloqueo de los servidores
   voluntarios de OpenStreetMap (por eso no sale "access blocked").
   Si no hay internet o los tiles fallan, se conserva automaticamente
   el mapa SVG offline de map.js como respaldo. */
"use strict";
(function(){
var TILES_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
var TILES_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function instColor(estado){
  if(estado === "En revision") return "#e67e22";
  if(estado === "Proxima") return "#f1c40f";
  return "#1e88e5";
}
function stateColor(e){
  if(e === "ALERTA") return "#e74c3c";
  if(e === "Advertencia") return "#e67e22";
  return "#27ae60";
}
function sevColor(s){
  if(s === 4) return "#e74c3c";
  if(s === 3) return "#e67e22";
  if(s === 2) return "#f1c40f";
  return "#27ae60";
}
function instPos(t){
  var base = (typeof comunaCoord !== "undefined" && comunaCoord[t.comuna]) || {lat:3.42, lng:-76.53};
  var j = (typeof _jitter === "function") ? _jitter(t.nombre, 0.018, 0.016) : {dx:0, dy:0};
  return [base.lat + j.dy, base.lng + j.dx];
}
function instPopup(t){
  return "<b>" + t.nombre + "</b><br>Comuna: " + t.comuna + "<br>" + (t.sede || "") +
    "<br>Sensores: " + t.sensores + " - Ahorro: " + (t.ahorro || 0).toLocaleString("es-CO") + " L" +
    "<br>Estado: <b style='color:" + instColor(t.estado) + "'>" + t.estado + "</b>";
}

function buildInteractive(){
  var container = document.getElementById("map");
  if(!container || !window.L) return false;
  container.innerHTML = "";
  container.style.height = "480px";
  var map = L.map(container, {zoomControl: true, scrollWheelZoom: true}).setView([3.425, -76.53], 12);
  // Expone el mapa para que main.js refresque los tiles al navegar a #mapa
  window.__aquaLeafletMap = map;
  window.__aquaInvalidateMap = function(){ try{ map.invalidateSize(); }catch(err){} };

  var loaded = 0, failed = 0, decided = false;
  var tl = L.tileLayer(TILES_URL, {maxZoom: 19, attribution: TILES_ATTR, subdomains: "abcd"});
  tl.on("tileload", function(){ loaded++; });
  tl.on("tileerror", function(){ failed++; maybeFallback(); });
  tl.addTo(map);

  function maybeFallback(){
    if(decided) return;
    if(loaded > 0){ decided = true; return; }
    if(failed >= 3){ decided = true; fallback(); }
  }
  setTimeout(function(){
    if(!decided){ decided = true; if(loaded === 0){ fallback(); } }
  }, 6000);

  // Instituciones (240)
  if(typeof institucionesData !== "undefined" && Array.isArray(institucionesData)){
    institucionesData.forEach(function(t){
      L.circleMarker(instPos(t), {radius: 5, color: instColor(t.estado), weight: 1, fillOpacity: 0.85})
        .bindPopup(instPopup(t)).addTo(map);
    });
  }
  // Sensores (8)
  if(typeof sensoresData !== "undefined" && Array.isArray(sensoresData)){
    sensoresData.forEach(function(s){
      L.circleMarker([s.lat, s.lng], {radius: 10, color: stateColor(s.estado), weight: 2, fillColor: "#ffffff", fillOpacity: 0.9})
        .bindPopup("<b>Sensor " + s.id + "</b><br>" + s.nombre + "<br>" + s.institucion + " (" + s.zona + ")" +
          "<br>Flujo: <b>" + s.flujoActual.toFixed(1) + " L/s</b> (normal " + s.flujoNormal.toFixed(1) + " L/s)" +
          "<br>Estado: <b style='color:" + stateColor(s.estado) + "'>" + s.estado + "</b>").addTo(map);
    });
  }
  // Zonas de falla
  if(typeof zonasFallas !== "undefined" && Array.isArray(zonasFallas)){
    zonasFallas.forEach(function(z){
      L.circleMarker([z.lat, z.lng], {radius: 16, color: sevColor(z.severidad), weight: 2, fillOpacity: 0.2})
        .bindPopup("<b>Zona: " + z.nombre + "</b><br>Severidad: " + z.severidad + "/4<br>" + z.descripcion).addTo(map);
    });
  }

  // Leyenda + panel de info (reutilizan las clases del mapa SVG)
  var legend = document.createElement("div");
  legend.className = "aqm-legend";
  legend.style.cssText = "position:absolute;bottom:10px;left:10px;z-index:1000;background:rgba(255,255,255,0.94);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.18);font-size:0.75rem";
  legend.innerHTML = "<span><i style='background:#1e88e5'></i>Institucion Optimo</span>" +
    "<span><i style='background:#e67e22'></i>En revision</span>" +
    "<span><i style='background:#f1c40f'></i>Proxima</span>" +
    "<span><i style='background:#e74c3c'></i>Alerta sensor</span>" +
    "<span><i style='background:#27ae60'></i>Sensor normal</span>";
  container.appendChild(legend);

  var nInst = (typeof institucionesData !== "undefined" && Array.isArray(institucionesData)) ? institucionesData.length : 0;
  var info = document.createElement("div");
  info.className = "aqm-info";
  info.id = "aqm-info";
  info.style.cssText = "position:absolute;top:10px;left:10px;z-index:1000;background:rgba(255,255,255,0.94);border-radius:8px;padding:8px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.18);font-size:0.8rem;max-width:280px";
  info.innerHTML = "<b>Mapa interactivo</b> - " + nInst + " instituciones vinculadas.<br>Haz clic o toca un punto para ver su informacion.";
  container.appendChild(info);

  // Evita que el resize de map.js redibuje el SVG encima de Leaflet
  if(typeof mapaReady !== "undefined"){ mapaReady = false; }
  window.__aquaMapInteractive = true;
  // Refresca tiles por si el contenedor cambio de tamano al construirse
  setTimeout(function(){ try{ map.invalidateSize(); }catch(err){} }, 150);
  setTimeout(function(){ try{ map.invalidateSize(); }catch(err){} }, 700);
  return true;
}

function fallback(){
  // Sin tiles: restaura el mapa SVG offline de map.js
  if(typeof _drawMap === "function"){
    if(typeof mapaReady !== "undefined"){ mapaReady = true; }
    _drawMap();
  }
}

function init(){
  if(window.L && buildInteractive()){ return; }
  // Sin Leaflet (offline / CDN bloqueado): el SVG de map.js sigue activo.
}
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
})();
