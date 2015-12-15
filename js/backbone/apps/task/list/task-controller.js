App.module('TaskApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = Marionette.Controller.extend({
        initialize: function(){
            this.tasks = App.request("task:entities");
            this.layoutView = this.getLayoutView();
            this.listenTo(this.layoutView, 'show', this.showRegions);
            this.initializeBackboneRadio();
            App.mainRegion.show(this.layoutView);
        },
        showRegions: function (view) {
            this.headerView = this.getHeaderView();
            this.layoutView.headerRegion.show(this.headerView);

            this.footerView = this.getFooterView();
            this.layoutView.footerRegion.show(this.footerView);

            this.taskListView = this.getTaskListView();
            this.layoutView.mainRegion.show(this.taskListView);
        },

        initializeBackboneRadio: function(){
            var filterState = App.request("filterState:instance");
            var filterChannel = Backbone.Radio.channel('filter');
            filterChannel.reply('filterState', function () {
                return filterState;
            });
        },

        getLayoutView: function () {
            return new List.LayoutView();
        },

        getHeaderView: function() {
            return new List.HeaderView({collection: this.tasks});
        },

        getFooterView: function() {
            return new List.FooterView({collection: this.tasks});
        },

        getTaskListView: function() {
            return new List.TaskListView({collection: this.tasks});
        }
    });


});