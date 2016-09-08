'use strict';

function ViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
    self.markers = ko.observableArray(markers);
    self.searchInput = ko.observable();

    //Display infowindow and change marker color when clicking on markers
    self.loadInfoWindow = function() {
        lastActiveMarker.setIcon(defaultMarker);
        var currentLocation = this.title;
        var index = locations_title.indexOf(currentLocation);
        loadData(currentLocation);
        markers[index].setIcon(activeMarker);    
        infowindow.open(map, markers[index]); 
        lastActiveMarker = markers[index];
    };

    // ( ☰ ICON ) toggle menu when clicking the hamburger icon
    self.menuStatus = ko.observable(0);
    self.toggleMenu = function() {
        var current = self.menuStatus();
        self.menuStatus(current+1);
    };
    
    // (Filter BUTTON) filter locations list 
    self.filterLocations = function() {
        //close opened infowindow
        infowindow.close();

        //captialize keyword         
        var keyword = self.searchInput().toUpperCase();
        var filterResult = self.locations().filter(function(location){
            //captialize location name and find index of keyword within
            var containKeyword = location.title.toUpperCase().indexOf(keyword);
            return containKeyword !== -1;  
        });
        self.locations(filterResult);
        
        //filter markers on map
        filterResult.forEach(function(location, index){
            filterResult[index] = location.title;
        });
        markers.forEach(function(marker){
            if (filterResult.indexOf(marker.title) === -1)
                marker.setVisible(false);
        });
    };

    // (Reset BUTTON) reset locations list and markers
    self.resetLocations = function() {
        //reset locations list
        self.locations(locations);
        //reset markers
        markers.forEach(function(marker){
            marker.setVisible(true);
        });
    };
}

var vimo = new ViewModel();

ko.applyBindings(vimo);    





