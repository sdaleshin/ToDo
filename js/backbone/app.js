App = new Backbone.Marionette.Application();

App.addRegions({
    mainRegion: "#todoapp"
});

App.on('start', function (options) {
    if (Backbone.history) {
        Backbone.history.start();
    }
});
