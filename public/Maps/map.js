
var map = L.map('map');
map.setView([13.138849, 123.734634], 16);
var centerIcon = L.icon({
  iconUrl: 'Images/pin.png',
  iconSize: [41, 41],
  iconAnchor: [21, 21],
  popupAnchor: [1, -34],
});
var marker = L.marker([13.138849, 123.734634], { icon: centerIcon }).addTo(map);
marker.bindPopup("Legazpi City, Albay.").openPopup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var loader = document.querySelector('.loader');

function locationSuccess(position) {
  loader.style.display = 'none';
  console.log(position.coords.latitude, position.coords.longitude);
}

function locationError(error) {
  loader.style.display = 'none';
  console.error(error);
}

loader.style.display = 'block';
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

let time = document.getElementById("time");
let date = document.getElementById("date");
setInterval(() => {
  let a = new Date();
  time.innerHTML = a.toLocaleTimeString();
  date.innerHTML = a.toLocaleDateString();
}, 1000)

var bgy8LegCity = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              123.73460455585484,
              13.144434705194683
            ],
            [
              123.73454920009266,
              13.1494519627405
            ],
            [
              123.73337771202833,
              13.149450448117939
            ],
            [
              123.73289971822989,
              13.149465833128783
            ],
            [
              123.7330171259527,
              13.150030434679008
            ],
            [
              123.73248734776487,
              13.150175525469308
            ],
            [
              123.73253742089464,
              13.150441777739367
            ],
            [
              123.7322060528376,
              13.150494192286114
            ],
            [
              123.73189946465597,
              13.149309728286232
            ],
            [
              123.73233883963758,
              13.149174514111067
            ],
            [
              123.73189309642652,
              13.14845469799063
            ],
            [
              123.7322762011724,
              13.147500815097603
            ],
            [
              123.73172454241133,
              13.146884442167522
            ],
            [
              123.73135061109426,
              13.14660410014013
            ],
            [
              123.73126582682666,
              13.146672973356232
            ],
            [
              123.73013479465803,
              13.145713026276026
            ],
            [
              123.73042558203257,
              13.145245958086758
            ],
            [
              123.73094084894606,
              13.145005952094358
            ],
            [
              123.73107622697773,
              13.144913362425484
            ],
            [
              123.7315459065506,
              13.144421473536866
            ],
            [
              123.73209213764932,
              13.144137183914994
            ],
            [
              123.73231511804391,
              13.14433717406526
            ],
            [
              123.73287711754853,
              13.14397844999359
            ],
            [
              123.73342092298782,
              13.14405199214184
            ],
            [
              123.73365933384139,
              13.143666467740616
            ],
            [
              123.73292449252887,
              13.141682896375528
            ],
            [
              123.73456821575655,
              13.141412978384224
            ],
            [
              123.73456176978556,
              13.141268603578851
            ],
            [
              123.73479382475563,
              13.141287435079988
            ],
            [
              123.73492274418476,
              13.141237217740084
            ],
            [
              123.73505166361196,
              13.141048902625329
            ],
            [
              123.73505810958301,
              13.140860587365012
            ],
            [
              123.7353546242677,
              13.140509065160686
            ],
            [
              123.7360314512668,
              13.14076642968115
            ],
            [
              123.7360314512668,
              13.141011239584998
            ],
            [
              123.73607410904151,
              13.142033309231735
            ],
            [
              123.73566156686974,
              13.142428769220572
            ],
            [
              123.73595163558338,
              13.143081590664579
            ],
            [
              123.73613856875409,
              13.143012542324556
            ],
            [
              123.73641574552556,
              13.143709301954033
            ],
            [
              123.73460455585484,
              13.144434705194683
            ]
          ]
        ],
        "type": "Polygon"
      },
      "id": 0
    }
  ]
};

var bgy8LegCityStyle = {
  "color": "green",
  "weight": 3,
  "opacity": 0.65
};

L.geoJSON(bgy8LegCity, { style: bgy8LegCityStyle }).addTo(map);