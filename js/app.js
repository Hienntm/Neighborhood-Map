var map;
var locations = [
    { title: 'Central Park Zoo', location: { lat: 40.767017, lng: -73.971966 } },
    { title: 'The Metropolitan Museum Of Art', location: { lat: 40.779187, lng: -73.963535 } },
    { title: 'Rockefeller Center', location: { lat: 40.75861, lng: -73.978209 } },
    { title: 'The Press Lounge', location: { lat: 40.764543, lng: -73.995958 } },
    { title: 'Broadway Dance Center', location: { lat: 40.759447, lng: -73.989612 } },
    { title: 'Unitarian Church Of All Souls', location: { lat: 40.775329, lng: -73.958195 } },
    { title: 'Gaonnuri Restaurant', location: { lat: 40.747742, lng: -73.987875 } },
    { title: 'Halal Restaurant', location: { lat: 40.793134, lng: -73.940832 } },
    { title: 'Hot Bread Kitchen', location: { lat: 40.798315, lng: -73.943913 } },
    { title: 'Silvana', location: { lat: 40.804454, lng: -73.955898 } },
    { title: 'New York Public Library', location: { lat: 40.802981, lng: -73.953536 } },
    { title: 'American Museum Of Natural History', location: { lat: 40.781324, lng: -73.973988 } },
    { title: 'Broadway Theatre', location: { lat: 40.763365, lng: -73.98307 } },
];

var locations_title = [];
locations.forEach(function(location){
    locations_title.push(location.title);
});

//NEWYORK TIMES API    
function loadData(position) {

    var NYT_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + position + "&sort=newest&api-key=ce617c645d934270aa9e45a0a2e0df8d";
    $.getJSON({
        url: NYT_url,
        method: 'GET',
    }).done(function (data) {
        articles = data.response.docs;
        var items = "";
        for (i = 0; i < articles.length; i++) {
            var article = articles[i];
            items += '<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p class="snippet">' + article.snippet + '</p>' + '</li>';
        }
        infowindow.setContent(
            "<div class='infowindow'>" +
            "<h2 class='title'>" + position + "</h2>" +
            "<h3 class='nytHeader'>New York Times Articles About This Place<h3>" +
            "<ul class='nytItem'>" + items + "</ul>" +
            "</div>");      
    }).fail(function (e) {
        infowindow.setContent(
            "<div class='infowindow'>" +
            "<h2 class='title'>" + position + "</h2>" +
            "<h3 class='nytHeader'>New York Times Articles could not be loaded<h3>" +
            "</div>"); 
    }); 
    
};


//initialize the map
var markers = [];
var infowindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.784869, lng: -73.96967 },
        zoom: 13,
        mapTypeControl: false
    });

    infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",   
        });

        markers.push(marker);
        
        //Display infowindow when clicking on markers
        marker.addListener('click', function () {
            this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            loadData(this.title);
            infowindow.open(map, this);          
        });
    }

    infowindow.addListener('closeclick', function() {
        markers.forEach(function(marker) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        });    
    });
}

