App.module('TaskApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = Marionette.Controller.extend({
        initialize: function(){
//            var tasks = App.request("user:entities");
//            this.layout = this.getLayoutView();
//            this.listenTo(this.layout, 'show', this.showRegions);
        },
        showRegions: function (view) {

        },

        getLayoutView: function () {
            //return new List.Layout();
        }
    });


});