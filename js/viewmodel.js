function ViewModel() {
    this.locations = ko.observableArray(locations);
    
    this.searchInput = ko.observable();
    
    //filter locations]
    this.filterLocations = function() {
           
        var keyword = this.searchInput().toUpperCase();

        $(".location:not(:contains("+ keyword + "))").css("display", "none");
        
        if(this.searchInput() === "") {
            $(".location").css("display", "block");
        }
    }

    this.resetLocations = function() {
         $(".location").css("display", "block");
    }
    
}

ko.applyBindings(new ViewModel());
