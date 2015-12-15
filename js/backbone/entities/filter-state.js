App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.FilterState = Backbone.Model.extend({
        defaults: {
            filter: 'all'
        }
    });

    var API = {
        getFilterStateInstance: function () {
            return new Entities.FilterState();
        }
    }

    App.reqres.setHandler("filterState:instance", function () {
        return API.getFilterStateInstance();

    });

});