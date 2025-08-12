// script.js
// Basit, temiz ve iyi yorumlu kod. Haversine + Leaflet + Nominatim.

const addressInput = document.getElementById('addressInput');
const suggestions = document.getElementById('suggestions');

addressInput.addEventListener('input', async () => {
  const val = addressInput.value.trim();
  if (val.length < 3) {
    suggestions.innerHTML = '';
    return;
  }
  try {
const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5&countrycodes=az`, {
  headers: {
    'Accept-Language': 'az, tr, en'
  }
});

    const places = await res.json();
    suggestions.innerHTML = '';

    places.forEach(place => {
      const option = document.createElement('option');
      option.value = place.display_name;
      suggestions.appendChild(option);
    });
  } catch (err) {
    console.error('Autocomplete hatası:', err);
  }
});


(() => {
  // Config
  const MAX_RESULTS = 4;
  const DEFAULT_CENTER = [40.4093, 49.8671]; // Baku center
  const map = L.map('map', {zoomControl:true}).setView(DEFAULT_CENTER, 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // markers layer groups to clear easily
  const storeLayer = L.layerGroup().addTo(map);
  const userMarkerLayer = L.layerGroup().addTo(map);

  // Elements
  const addressInput = document.getElementById('addressInput');
  const searchBtn = document.getElementById('searchBtn');
  const gpsBtn = document.getElementById('gpsBtn');
  const resultsList = document.getElementById('results');
  const infoBox = document.getElementById('info');
  const title = document.getElementById('title');
  const footerText = document.getElementById('footerText');

  // Language toggles
  const langEnBtn = document.getElementById('lang-en');
  const langAzBtn = document.getElementById('lang-az');
  let lang = 'en'; // default

  function setText() {
    if (lang === 'en') {
      title.textContent = 'Nearby IQOS Stores';
      addressInput.placeholder = 'Type address or place (e.g. Neftçilər metro)';
      searchBtn.textContent = 'Search';
      infoBox.textContent = 'Enter address or use GPS to find nearest stores.';
      footerText.textContent = 'By Aziz · Beta test · There’s still a lot that needs fixing :(';
    } else {
      title.textContent = 'Ən Yaxın IQOS Mağazaları';
      addressInput.placeholder = 'Ünvan və ya yer yazın (məs: Neftçilər metro)';
      searchBtn.textContent = 'Axtar';
      infoBox.textContent = 'Ən yaxın mağazaları tapmaq üçün ünvan yazın və ya GPS istifadə edin.';
      footerText.textContent = 'By Aziz · Beta test ·Hələ düzəldilməli çox şey var :(';
    }
  }
  setText();

  langEnBtn.addEventListener('click', () => { lang='en'; langEnBtn.classList.add('active'); langAzBtn.classList.remove('active'); setText(); renderResults(currentDistances); });
  langAzBtn.addEventListener('click', () => { lang='az'; langAzBtn.classList.add('active'); langEnBtn.classList.remove('active'); setText(); renderResults(currentDistances); });

  // Haversine distance (km)
  function haversine(lat1, lon1, lat2, lon2) {
    if ([lat1,lon1,lat2,lon2].some(v=>v===null||v===undefined)) return Infinity;
    const R = 6371;
    const toRad = v => v * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Utilities
  function clearLayers(){
    storeLayer.clearLayers();
    userMarkerLayer.clearLayers();
  }

  // Keep latest distances for re-render on language switch
  let currentDistances = [];

  // render list + markers
  function renderResults(distances) {
    currentDistances = distances;
    resultsList.innerHTML = '';
    storeLayer.clearLayers();

    if (!distances || distances.length === 0) {
      resultsList.innerHTML = `<li class="no-results">${lang === 'en' ? 'No stores found.' : 'Mağaza tapılmadı.'}</li>`;
      return;
    }

    distances.slice(0, MAX_RESULTS).forEach(item => {
      const li = document.createElement('li');

      const name = document.createElement('div');
      name.className = 'title';
      name.textContent = (lang === 'en' ? item.name_en : item.name_az);

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = `${item.address} · ${item.distance.toFixed(2)} km`;

      li.appendChild(name);
      li.appendChild(meta);

      if (item.note) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = item.note;
        li.appendChild(note);
      }

      resultsList.appendChild(li);

      // Map marker
      if (item.lat !== null && item.lng !== null) {
        const m = L.marker([item.lat, item.lng]).addTo(storeLayer);
        m.bindPopup(`<strong>${(lang==='en'?item.name_en:item.name_az)}</strong><br>${item.address}<br>${item.distance.toFixed(2)} km`);
      }
    });

    // fit map to markers
    const allMarkers = [];
    storeLayer.eachLayer(l => allMarkers.push(l.getLatLng()));
    userMarkerLayer.eachLayer(l => allMarkers.push(l.getLatLng()));
    if (allMarkers.length > 0) {
      const bounds = L.latLngBounds(allMarkers);
      map.fitBounds(bounds.pad(0.3));
    }
  }

  // Main search by coordinates (userLat, userLng)
  function searchByCoords(userLat, userLng) {
    if (!userLat || !userLng) return;
    infoBox.textContent = lang === 'en' ? 'Found your location. Calculating nearest stores...' : 'Yeriniz tapıldı. Ən yaxın mağazalar hesablanır...';
    clearLayers();

    // add user marker
    const um = L.circleMarker([userLat, userLng], {radius:8, color:'#ff5722', fillColor:'#ffb199', fillOpacity:0.9}).addTo(userMarkerLayer);
    um.bindPopup(lang === 'en' ? 'You are here' : 'Siz buradasınız').openPopup();

    // compute distances against stores that have lat/lng
    const computed = stores.map(s => {
      return {
        ...s,
        distance: haversine(userLat, userLng, s.lat, s.lng)
      };
    }).filter(x => x.distance !== Infinity) // only with coords
      .sort((a,b) => a.distance - b.distance);

    if (computed.length === 0) {
      resultsList.innerHTML = `<li>${lang === 'en' ? 'No stores with coordinates yet. Fill stores.js' : 'Hazırda koordinatı olan mağaza yoxdur. stores.js faylını doldurun.'}</li>`;
      return;
    }

    renderResults(computed);
  }

  // Nominatim address -> coords
  async function geocodeAddress(text) {
    const q = encodeURIComponent(text);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1&addressdetails=0`;
    try {
      const r = await fetch(url, {headers:{'Accept':'application/json'}});
      const data = await r.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // Event handlers
  searchBtn.addEventListener('click', async () => {
    const text = addressInput.value.trim();
    if (!text) {
      alert(lang === 'en' ? 'Please type an address or place.' : 'Zəhmət olmasa ünvan və ya yer yazın.');
      return;
    }
    infoBox.textContent = lang === 'en' ? 'Looking up address...' : 'Ünvan axtarılır...';
    const coords = await geocodeAddress(text);
    if (coords) {
      searchByCoords(coords.lat, coords.lng);
    } else {
      alert(lang === 'en' ? 'Address not found. Try more specific text.' : 'Ünvan tapılmadı. Daha dəqiq yazın.');
      infoBox.textContent = lang === 'en' ? 'Enter address or use GPS to find nearest stores.' : 'Ən yaxın mağazaları tapmaq üçün ünvan yazın və ya GPS istifadə edin.';
    }
  });

  gpsBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert(lang === 'en' ? 'Geolocation not supported by this browser.' : 'Bu brauzer coğrafi yerləşməni dəstəkləmir.');
      return;
    }
    infoBox.textContent = lang === 'en' ? 'Obtaining device location...' : 'Cihazın yeri alınıır...';
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      searchByCoords(latitude, longitude);
    }, err => {
      console.warn(err);
      alert(lang === 'en' ? 'Unable to get location. Make sure location permission is allowed.' : 'Yer alınmadı. İcazələrin açıldığından əmin olun.');
      infoBox.textContent = lang === 'en' ? 'Enter address or use GPS to find nearest stores.' : 'Ən yaxın mağazaları tapmaq üçün ünvan yazın və ya GPS istifadə edin.';
    }, {timeout:10000});
  });

  // Allow Enter to search
  addressInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });

  // On load: if some stores have coords, draw them faintly
  window.addEventListener('load', () => {
    // draw all stores (small grey markers) so user sees network
    stores.forEach(s => {
      if (s.lat !== null && s.lng !== null) {
        L.circleMarker([s.lat, s.lng], {radius:5, color:'#2b7a78', fillOpacity:0.6}).addTo(storeLayer).bindPopup((lang==='en'?s.name_en:s.name_az));
      }
    });
  });


  
})();
