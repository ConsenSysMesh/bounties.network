$(function() {
    var i = "box",
        n = {
            init: function() {
                this.scroll_animate(), $("#b2top").click(function() {
                    $("html, body").stop().animate({
                        scrollTop: 0
                    })
                }), 
				$("#overview-aside-nav ul").navscroll({
                    sec: 1e3,
                    url_hash: !1,
                    head_hight: 0
                })
            },
            scroll_animate: function() {
                $(window).scroll(function() {
                    for (var i = window.innerHeight, n = $(".anim").length, o = 0; o < n; o++) $(window).scrollTop() > $(".anim").eq(o).offset().top - i / 4 && $(".anim").eq(o).addClass("on")
                })
            },
        };
    n.init()
});


// Google Map Custom js
var marker;
var image = 'images/map-marker.png';
function initMap() {
var myLatLng = {lat: 39.79, lng: -86.14};

// Specify features and elements to define styles.
var styleArray = [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0D1319"
            },
            {
                "lightness": "5"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0D1319"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#0D1319"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0D1319"
            },
            {
                "lightness": "20"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-20"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-20"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0D1319"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "lightness": "5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#333333"
            },
            {
                "lightness": "2"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "lightness": "6"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];
		
var map = new google.maps.Map(document.getElementById('map'), {
  center: myLatLng,
  scrollwheel: false,
   // Apply the map style array to the map.
  styles: styleArray,
  zoom: 7
});

var directionsDisplay = new google.maps.DirectionsRenderer({
  map: map
});

// Create a marker and set its position.
marker = new google.maps.Marker({
  map: map,
  icon: image,
  draggable: true,
  animation: google.maps.Animation.DROP,
  position: myLatLng
});
marker.addListener('click', toggleBounce);
}

function toggleBounce() {
if (marker.getAnimation() !== null) {
  marker.setAnimation(null);
} else {
  marker.setAnimation(google.maps.Animation.BOUNCE);
}
}
