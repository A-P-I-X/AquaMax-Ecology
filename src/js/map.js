/* Aqua Max - Mapa 100% OFFLINE: plano SVG vectorial de Cali.
   Sin L (Leaflet), sin peticiones a OSM/Hot/CARTO.
   100% funcional offline: cero bloqueos. */
"use strict";
var __mapCache = null;
function _mapColorBySeverity(sev){ if(sev===4) return "#e74c3c"; if(sev===3) return "#e67e22"; if(sev===2) return "#f1c40f"; return "#27ae60"; }
function _mapStateColor(state){ if(state==="ALERTA") return "#e74c3c"; if(state==="Advertencia") return "#e67e22"; return "#27ae60"; }
function _mapInstColor(estado){ if(estado==="En revision") return "#e67e22"; if(estado==="Proxima") return "#f1c40f"; return "#1e88e5"; }
function _mapPoints(){
  var all = [];
  if(typeof institucionesData !== "undefined" && Array.isArray(institucionesData)){
    institucionesData.forEach(function(it, i){ all.push({type:"inst", index:i, data:it}); });
  }
  if(typeof zonasFallas !== "undefined" && Array.isArray(zonasFallas)){
    zonasFallas.forEach(function(z, i){ all.push({type:"zona", index:i, data:z}); });
  }
  if(typeof sensoresData !== "undefined" && Array.isArray(sensoresData)){
    sensoresData.forEach(function(s, i){ all.push({type:"sensor", index:i, data:s}); });
  }
  return all;
}
function _mapPos(p, w, h){
  if(p.type === "inst"){
    var base = comunaCoord[p.data.comuna] || {lat:3.42, lng:-76.53};
    var j = _jitter(p.data.nombre, 0.018, 0.016);
    return proyectar(base.lat + j.dy, base.lng + j.dx, w, h);
  }
  return proyectar(p.data.lat, p.data.lng, w, h);
}
function _drawMap(){
  var container = document.getElementById("map");
  if(!container) return;
  var w = Math.max(320, container.clientWidth || 640);
  var h = 460;
  var html = [];
  html.push("<svg viewBox='0 0 " + w + " " + h + "' width='100%' height='" + h + "px' class='aqua-map-svg'>");
  html.push("<defs><linearGradient id='aqBg' x1='0' y1='0' x2='0' y2='1'>");
  html.push("<stop offset='0%' stop-color='#eaf4ff'/><stop offset='100%' stop-color='#d4e8f7'/>");
  html.push("</linearGradient></defs>");
  html.push("<rect width='" + w + "' height='" + h + "' fill='url(#aqBg)'/>");
  // Rio principal + avenidas (marco urbano decorativo)
  var r1x1 = Math.round(w*0.42), r1cx = Math.round(w*0.46), r1cy = Math.round(h*0.42);
  var r1x2 = Math.round(w*0.36), r1y2 = Math.round(h*0.85);
  html.push("<path d='M " + r1x1 + " 0 Q " + r1cx + " " + r1cy + " " + r1x2 + " " + r1y2 + "' stroke='#5aa9e6' stroke-width='4' fill='none' opacity='0.6'/>");
  var r2y1 = Math.round(h*0.70);
  html.push("<path d='M 0 " + r2y1 + " Q " + Math.round(w*0.5) + " " + Math.round(h*0.64) + " " + w + " " + Math.round(h*0.72) + "' stroke='#7ab8e8' stroke-width='2' fill='none' opacity='0.45'/>");
  var mainRoad = Math.round(w*0.62);
  html.push("<line x1='" + mainRoad + "' y1='0' x2='" + (mainRoad-3) + "' y2='" + h + "' stroke='#e8e8e8' stroke-width='6' opacity='0.8'/>");
  var xOff = 14, yTitle = 24, ySub = 40;
  html.push("<text x='" + xOff + "' y='" + yTitle + "' font-size='13' font-weight='700' fill='#0b3b66'>Santiago de Cali - Red Aqua Max (offline)</text>");
  html.push("<text x='" + xOff + "' y='" + ySub + "' font-size='10' fill='#4a6a8a'>Instituciones por comuna + sensores + zonas de falla</text>");
  var all = _mapPoints();
  all.forEach(function(p, idx){
    var xy = _mapPos(p, w, h), x = xy[0], y = xy[1];
    var color, r, label, extra = "";
    if(p.type === "inst"){
      color = _mapInstColor(p.data.estado); r = 4; label = "";
      extra = "<title>" + p.data.nombre + " (" + p.data.comuna + ")</title>";
    } else if(p.type === "sensor"){
      color = _mapStateColor(p.data.estado); r = 9; label = "S" + (p.index+1);
      extra = "<title>Sensor " + p.data.id + " - " + p.data.institucion + "</title>";
    } else {
      color = _mapColorBySeverity(p.data.severidad); r = Math.max(6, 3 + p.data.severidad*2); label = "!" + p.data.severidad;
      if(p.data.severidad >= 3){
        html.push("<circle cx='" + x + "' cy='" + y + "' r='" + (r+12) + "' fill='" + color + "' opacity='0.18'/>");
      }
      extra = "<title>" + p.data.nombre + "</title>";
    }
    html.push("<circle cx='" + x + "' cy='" + y + "' r='" + r + "' fill='" + color + "' stroke='#fff' stroke-width='1.5' class='aqm-pt' data-idx='" + idx + "'>" + extra + "</circle>");
    if(label){
      html.push("<text x='" + x + "' y='" + (y+3) + "' text-anchor='middle' font-size='8.5' fill='#fff' font-weight='bold' pointer-events='none'>" + label + "</text>");
    }
  });
  html.push("</svg>");
  var nInst = (typeof institucionesData !== "undefined" && Array.isArray(institucionesData)) ? institucionesData.length : 0;
  html.push("<div class='aqm-legend'><span><i style='background:#1e88e5'></i>Institucion Optimo</span><span><i style='background:#e67e22'></i>En revision</span><span><i style='background:#f1c40f'></i>Proxima</span><span><i style='background:#e74c3c'></i>Alerta sensor</span><span><i style='background:#27ae60'></i>Sensor normal</span></div>");
  html.push("<div id='aqm-info' class='aqm-info'>Toca un punto: " + nInst + " instituciones vinculadas en el mapa</div>");
  container.innerHTML = html.join("");
  bindMapClicks();
}
function proyectar(lat, lng, w, h){
  var minLat=3.24, maxLat=3.52, minLng=-76.66, maxLng=-76.45;
  var x = ((lng-minLng)/(maxLng-minLng))*w;
  var y = ((maxLat-lat)/(maxLat-minLat))*h;
  return [Math.round(x), Math.round(y)];
}
var comunaCoord = {
  "Comuna 1":{lat:3.470,lng:-76.528},"Comuna 2":{lat:3.476,lng:-76.533},
  "Comuna 3":{lat:3.452,lng:-76.532},"Comuna 4":{lat:3.440,lng:-76.519},
  "Comuna 5":{lat:3.462,lng:-76.537},"Comuna 6":{lat:3.455,lng:-76.548},
  "Comuna 7":{lat:3.432,lng:-76.540},"Comuna 8":{lat:3.445,lng:-76.515},
  "Comuna 9":{lat:3.460,lng:-76.522},"Comuna 10":{lat:3.435,lng:-76.510},
  "Comuna 11":{lat:3.420,lng:-76.520},"Comuna 12":{lat:3.410,lng:-76.530},
  "Comuna 13":{lat:3.400,lng:-76.538},"Comuna 14":{lat:3.390,lng:-76.525},
  "Comuna 15":{lat:3.360,lng:-76.530},"Comuna 16":{lat:3.370,lng:-76.515},
  "Comuna 17":{lat:3.340,lng:-76.540},"Comuna 18":{lat:3.330,lng:-76.550},
  "Comuna 19":{lat:3.422,lng:-76.540},"Comuna 20":{lat:3.425,lng:-76.555},
  "Comuna 21":{lat:3.400,lng:-76.565},
  
};
function _jitter(str, ampx, ampy){
  var h1 = 0;
  for(var i = 0; i < str.length; i++){ h1 = (h1*31 + str.charCodeAt(i)) >>> 0; }
  var dx = (((h1 % 1000) / 1000) - 0.5) * ampx;
  var dy = (((Math.floor(h1/1000) % 1000) / 1000) - 0.5) * ampy;
  return {dx:dx, dy:dy};
}
function bindMapClicks(){
  var container = document.getElementById("map");
  if(!container) return;
  var info = document.getElementById("aqm-info");
  var all = _mapPoints();
  container.querySelectorAll(".aqm-pt").forEach(function(el){
    el.addEventListener("click", function(){
      var idx = parseInt(el.getAttribute("data-idx"), 10);
      var p = all[idx];
      if(!p){ if(info){ info.textContent = "Punto no disponible"; } return; }
      if(!info) return;
      if(p.type === "inst"){
        var t = p.data;
        info.innerHTML = "<b>" + t.nombre + "</b><br>Comuna: " + t.comuna + "<br>" + t.sede +
          "<br>Sensores: " + t.sensores + " - Ahorro: " + t.ahorro.toLocaleString("es-CO") + " L" +
          "<br>Estado: <b style='color:" + _mapInstColor(t.estado) + "'>" + t.estado + "</b>";
      } else if(p.type === "sensor"){
        var s = p.data;
        info.innerHTML = "<b>Sensor " + s.id + "</b><br>" + s.nombre + "<br>" + s.institucion + " (" + s.zona + ")" +
          "<br>Flujo: <b>" + s.flujoActual.toFixed(1) + " L/s</b> (normal " + s.flujoNormal.toFixed(1) + " L/s)" +
          "<br>Estado: <b style='color:" + _mapStateColor(s.estado) + "'>" + s.estado + "</b>";
      } else {
        var z = p.data;
        info.innerHTML = "<b>Zona: " + z.nombre + "</b><br>Severidad: " + z.severidad + "/4<br>" + z.descripcion;
      }
    });
  });
}
var mapaReady = false;
function mapResizeCheck(){
  if(mapaReady){ _drawMap(); }
}
window.addEventListener("resize", mapResizeCheck);
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded", function(){ _drawMap(); mapaReady = true; });
} else {
  _drawMap(); mapaReady = true;
}
