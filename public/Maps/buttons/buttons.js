var userMarker = null;
var color = null
var marker2 = null;
var circle = null;
var redIcon = L.icon({
  iconUrl: 'Images/home.png',
  iconSize: [41, 41],
  iconAnchor: [21, 21],
  popupAnchor: [1, -34],
});
map.on('click', function (event) {
  if (userMarker) {
    map.removeLayer(userMarker);
  }
  let lat = event.latlng.lat;
  let lng = event.latlng.lng;
  userMarker = L.marker([lat, lng]).addTo(map);
  let popupContent = `Is this your location?<br>Latitude: ${lat}<br>Longitude: ${lng}`;
  userMarker.bindPopup(popupContent).openPopup();
  userMarker.on('click', function (event) {
    let confirmation = confirm('Is this your correct location?');
    if (confirmation) {
      if (marker2) {
        map.removeLayer(marker2);
      }
      if (circle) {
        map.removeLayer(circle);
      }
      map.removeLayer(userMarker);
      userLocation = {
        lat: lat,
        lng: lng
      };
      marker2 = L.marker([userLocation.lat, userLocation.lng], { icon: redIcon }).addTo(map);
      marker2.bindPopup("My Location").openPopup();
    } else if (navigator.geolocation) {
      map.removeLayer(userMarker);
      userMarker = null;
      navigator.geolocation.getCurrentPosition(function (position) {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, function (error) {
        console.log(error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
});

function findUserLocation() {
  if (marker2) {
    map.removeLayer(marker2);
  }
  if (circle) {
    map.removeLayer(circle);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker2 = L.marker([userLocation.lat, userLocation.lng], { icon: redIcon }).addTo(map);
      marker2.bindPopup("My Location").openPopup();
    }, function (error) {
      console.log(error);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
var situtation = null;
function dirtyHigh() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'yellow';
  circle.setStyle({ color: color });
  situation = "Murky and High Flow Rate";
  circle.setRadius(30);
}

function dirtyLow() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'orange';
  circle.setStyle({ color: color });
  situation = "Murky and Low Flow Rate";
  circle.setRadius(30);
}

function cleanHigh() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'cyan';
  circle.setStyle({ color: color });
  situation = "Clear and High Flow Rate";
  circle.setRadius(30);
}

function cleanLow() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'purple';
  circle.setStyle({ color: color });
  situation = "Clear and Low Flow Rate";
  circle.setRadius(30);
}

function normal() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'green';
  circle.setStyle({ color: color });
  situation = "Normal";
  circle.setRadius(30);
}

function burst() {
  if (circle) {
    map.removeLayer(circle);
  }
  circle = L.circle([userLocation.lat, userLocation.lng]).addTo(map);
  color = 'red';
  circle.setStyle({ color: color });
  situation = "Burst";
  circle.setRadius(30);
}


var marker3 = null;
function findDistLocation() {
  if (marker3) {
    map.removeLayer(marker3);
  }
  var distIcon = L.icon({
    iconUrl: 'Images/waterdistrict.png',
    iconSize: [41, 41],
    iconAnchor: [21, 21],
    popupAnchor: [1, -34],
  });
  marker3 = L.marker([13.148342, 123.747763], { icon: distIcon }).addTo(map);
  marker3.bindPopup("Legazpi City Water District").openPopup();
}


async function SAVE() {
  const dataObject = {
    lat: userLocation.lat,
    lng: userLocation.lng,
    time: time.innerHTML,
    date: date.innerHTML,
    color: color,
    situation: situation
  };
  //console.log(dataObject);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObject)
  };
  const response = await fetch('/api', options);
  const jsonData = await response.json();
  //console.log('Data received from the server:', jsonData);
};

const circleMarkers = new Map();
getData();
async function getData() {
  try {
    const response = await fetch('/api');
    const jsonData = await response.json();
    const currentTime = Date.now();
    const validCircleIds = new Set();
    jsonData.forEach((item) => {
      const lat = item.lat;
      const lng = item.lng;
      const color = item.color;
      const date = item.date;
      const time = item.time;
      const situation = item.situation;
      const timestamp = item.timestamp;
      const circleId = item._id;
      const timeDifferenceHours = (currentTime - timestamp) / (1000 * 60 * 60);
      if (timeDifferenceHours < 24) {
        let circle = circleMarkers.get(circleId);
        if (!circle) {
          circle = L.circle([lat, lng]).addTo(map);
          circle.setStyle({ color: color });
          let popupContent2 = `${situation}<br>Latitude: ${lat}<br>Longitude: ${lng}<br>Date and Time<br>Date: ${date} Time: ${time}`;
          circle.on('mouseover', () => {
            circle.bindPopup(popupContent2).openPopup();
          });
          circle.on('mouseout', () => {
            circle.closePopup();
          });
          circleMarkers.set(circleId, circle);
        } else {
          circle.setLatLng([lat, lng]);
          circle.setStyle({ color: color });
        }
        validCircleIds.add(circleId);
      }
    });
    circleMarkers.forEach((circle, circleId) => {
      if (!validCircleIds.has(circleId)) {
        map.removeLayer(circle);
        circleMarkers.delete(circleId);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
setInterval(getData, 1000);