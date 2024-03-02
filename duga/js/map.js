var map,
  markers = [],
  styles = [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#444444',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          weight: '0.40',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on',
        },
        {
          saturation: '-40',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#333366',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          hue: '#ff0000',
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
        {
          weight: '1.25',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#dddcdc',
        },
      ],
    },
  ];

var data = [
  {
    position: { lat: 55.756679, lng: 37.522259 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 1</a></div>',
  },
  {
    position: { lat: 55.849301, lng: 37.379274 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 2</a></div>',
  },
  {
    position: { lat: 56.180916, lng: 38.334667 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 3</a></div>',
  },
  {
    position: { lat: 60.008770, lng: 30.425264 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 4</a></div>',
  },
  {
    position: { lat: 59.788371, lng: 30.183671 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 5</a></div>',
  },
  {
    position: { lat: 59.804951, lng: 30.491154 },
    content: '<div class="map-popup"><a href="./single-project.html">RC Scandi Klubb 6</a></div>',
  },
]

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 58.026282, lng: 33.721908 },
    zoom: 6,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: styles
  });

  var icons = {
    marker: {
      url: './img/icons/map_icon.svg',
      scaledSize: new google.maps.Size(24, 32), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    },
  };

  data.forEach(function(opts) {
    var infowindow = new google.maps.InfoWindow({
      content: opts.content
    });

    var marker = new google.maps.Marker({
      position: { lat: opts.position.lat, lng: opts.position.lng },
      map: map,
      icon: icons.marker,
    });

    markers.push(marker);
    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });
  })
}

$(document).mouseup(function (e){
  var div = $(".gm-style-iw-a");

  if (!div.is(e.target) && div.has(e.target).length === 0) {
    div.remove();
  }
});