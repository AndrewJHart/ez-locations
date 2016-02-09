// calling the locateme function when the document finishes loading
$(function() {
    locateMe();
});

// function to locate the user
var locateMe = function () {
  	var map_element= $('#map');
    if (navigator.geolocation) {
       var position= navigator.geolocation.getCurrentPosition(loadMap);
    } else {
      map_element.innerHTML = "Geolocation is not supported by this browser.";
    }
},

// load the mop using the position
loadMap = function (position) {
  var loading= $('#loading'),
      latitude=position.coords.latitude,
      longitude=position.coords.longitude,
      myLatlng = new google.maps.LatLng(latitude, longitude),
     	
      //Initializing the options for the map
     	myOptions = {
         center: myLatlng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
      },

  		// Creating the map in teh DOM
      map_element = document.getElementById("map"),
      map = new google.maps.Map(map_element,myOptions),
  		
      // Adding markers to it
      marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'You are here'
      }),
  		
      // Adding the Marker content to it
      infowindow = new google.maps.InfoWindow({
          content: "<h2>You are here :)</h2>",
        	//Settingup the maxwidth
          maxWidth: 300
      });
  		
      // Event listener to trigger the marker content
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);});
};
