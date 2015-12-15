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
            this.listenTo(this.headerView, 'task:create', this.createTask);
            this.layoutView.headerRegion.show(this.headerView);

            this.footerView = this.getFooterView();
            this.listenTo(this.footerView, 'task:completed:remove', this.removeCompletedTasks);
            this.layoutView.footerRegion.show(this.footerView);

            this.taskListView = this.getTaskListView();
            this.listenTo(this.taskListView, 'childview:task:remove', this.removeTask);
            this.listenTo(this.taskListView, 'childview:task:toggle', this.toggleTask);
            this.listenTo(this.taskListView, 'childview:task:update', this.updateTask);
            this.listenTo(this.taskListView, 'task:toggle:all', this.toggleAllTasks);
            this.layoutView.mainRegion.show(this.taskListView);
        },

        createTask: function(task){
            this.tasks.create(task);
        },

        removeCompletedTasks: function(){
            var completed = this.tasks.getCompleted();
            completed.forEach(function (task) {
                task.destroy();
            });
        },

        toggleAllTasks: function(options){
            this.tasks.each(function (task) {
                task.save({ completed: options.isChecked });
            });
        },

        removeTask: function(view, options){
            view.model.destroy();
        },

        toggleTask: function(view, options){
            view.model.toggle().save();
        },

        updateTask: function(view, task){
            if(task.title){
                view.model.set(task).save();
            }else{
                view.model.destroy();
            }
        },

        initializeBackboneRadio: function(){
            var filterState = App.request("filterState:instance");
            var filterChannel = Backbone.Radio.channel('filter');
            filterChannel.reply('filterState', function () {
                return filterState;
            });

            var newFilter = this.options.filter && this.options.filter.trim() || 'all';
            filterChannel.request('filterState').set('filter', newFilter);
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