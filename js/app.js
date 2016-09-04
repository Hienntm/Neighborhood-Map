var map;
var locations = [
    { title: 'CENTRAL PARK ZOO', location: { lat: 40.767017, lng: -73.971966 } },
    { title: 'THE METROPOLITAN MUSEUM OF ART', location: { lat: 40.779187, lng: -73.963535 } },
    { title: 'ROCKEFELLER CENTER', location: { lat: 40.75861, lng: -73.978209 } },
    { title: 'THE PRESS LOUNGE', location: { lat: 40.764543, lng: -73.995958 } },
    { title: 'BROADWAY DANCE CENTER', location: { lat: 40.759447, lng: -73.989612 } },
    { title: 'UNITARIAN CHURCH OF ALL SOULS', location: { lat: 40.775329, lng: -73.958195 } },
    { title: 'GAONNURI RESTAURANT', location: { lat: 40.747742, lng: -73.987875 } },
    { title: 'HALAL RESTAURANT', location: { lat: 40.793134, lng: -73.940832 } },
    { title: 'HOT BREAD KITCHEN', location: { lat: 40.798315, lng: -73.943913 } },
    { title: 'SILVANA', location: { lat: 40.804454, lng: -73.955898 } },
    { title: 'NEW YORK PUBLIC LIBRARY', location: { lat: 40.802981, lng: -73.953536 } },
    { title: 'AMERICAN MUSEUM OF NATURAL HISTORY', location: { lat: 40.781324, lng: -73.973988 } },
    { title: 'BROADWAY THEATRE', location: { lat: 40.763365, lng: -73.98307 } },
];
var markers = [];

var locations_title = [];
for (var i = 0; i < locations.length; i++) {
    locations_title.push(locations[i].title);
}

//NEWYORK TIMES API    
function loadData(position) {

    var NYT_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + position + "&sort=newest&api-key=ce617c645d934270aa9e45a0a2e0df8d"

    $.ajax({
        url: NYT_url,
        method: 'GET',
    }).done(function (data) {
        $(".nytHeader").text('New York Times Articles About This Place');
        articles = data.response.docs;
        for (i = 0; i < articles.length; i++) {
            var article = articles[i];
            $(".nytItem").append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p class="snippet">' + article.snippet + '</p>' + '</li>');
        };
    }).fail(function (e) {
        $(".nytHeader").text('New York Times Articles could not be loaded');
    });
}

//initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.784869, lng: -73.96967 },
        zoom: 13,
        mapTypeControl: false
    });

    var infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < locations.length; i++) {

        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        markers.push(marker);

        //Display infowindow when clicking on markers
        marker.addListener('click', function () {
            infowindow.setContent(
                "<div class='infowindow'>" +
                "<h2 class='title'>" + this.title + "</h2>" +
                "<h3 class='nytHeader'><h3>" +
                "<ul class='nytItem'></ul>" +
                "</div>"
            );
            loadData(this.title);
            infowindow.open(map, this);
        });

    }

    //Display infowindow when clicking on list items
    $(".location").on("click", function () {
        var currentlocation = this.innerHTML
        var index = locations_title.indexOf(currentlocation);
        infowindow.setContent(
            "<div class='infowindow'>" +
            "<h2 class='title'>" + currentlocation + "</h2>" +
            "<h3 class='nytHeader'><h3>" +
            "<ul class='nytItem'></ul>" +
            "</div>"
        );
        loadData(currentlocation);
        infowindow.open(map, markers[index]);

        console.log(this);
    });

}

//toggle menu when clicking the hamburger icon
function toggleMenu() {
    $("#list").toggleClass("hidden");
    
}
$("#menu").on("click", toggleMenu);

//toggle button when clicking the filter/reset button
function toggleButton() {
    $("#filter").toggleClass("hidden");
    $("#reset").toggleClass("hidden");
}
$("#filter").on("click", toggleButton);
$("#reset").on("click", toggleButton);