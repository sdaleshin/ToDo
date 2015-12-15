App = new Backbone.Marionette.Application();

App.addRegions({
    mainRegion: "#main-region"
});

App.on('start', function (options) {
    if (Backbone.history) {
        Backbone.history.start();
    }
});
