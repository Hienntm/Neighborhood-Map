function ViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
    self.markers = ko.observableArray(markers);
    self.searchInput = ko.observable();
   
    //Display infowindow when clicking on list items
    self.loadInfoWindow = function() {
        var currentLocation = this.title;
        var index = locations_title.indexOf(currentLocation);
        loadData(currentLocation);
        markers[index].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        infowindow.open(map, markers[index]); 
    };

    // ( ☰ ICON ) toggle menu when clicking the hamburger icon
    self.menuStatus = ko.observable(0);
    self.toggleMenu = function() {
        var current = self.menuStatus();
        self.menuStatus(current+1);
    };
    
    // (Filter BUTTON) filter locations list 
    self.filterLocations = function() {
        //captialize keyword         
        var keyword = self.searchInput().toUpperCase();
        var filterResult = self.locations().filter(function(location){
            //captialize location name and find index of keyword within
            var containKeyword = location.title.toUpperCase().indexOf(keyword);
            return containKeyword !== -1;  
        });
        self.locations(filterResult);

        console.log(filterResult);
        filterResult.forEach(function(location, index){
            filterResult[index] = location.title;
        })
        
        //filter markers on map
        markers.forEach(function(marker){
            if (filterResult.indexOf(marker.title) === -1)
                marker.setVisible(false);
        });
    };

    // (Reset BUTTON) reset locations list
    self.resetLocations = function() {
        self.locations(locations);
    };
}

var vimo = new ViewModel();

ko.applyBindings(vimo);



