App.module('TaskApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = Marionette.Controller.extend({
        initialize: function(){
            this.tasks = App.request("task:entities");
            this.layoutView = this.getLayoutView();
            this.listenTo(this.layoutView, 'show', this.showRegions);
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

        getLayoutView: function () {
            return new List.LayoutView();
        },

        getHeaderView: function() {
            return new List.HeaderView();
        },

        getFooterView: function() {
            return new List.FooterView();
        },

        getTaskListView: function() {
            return new List.TaskListView();
        }
    });


});