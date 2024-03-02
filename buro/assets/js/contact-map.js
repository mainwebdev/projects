
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const office = { lat: 47.02491722908095, lng: 28.832540282718945 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("contact-map"), {
    zoom: 11,
    center: office,
  });

}