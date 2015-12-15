App.module('TaskApp.List', function (List, App, Backbone, Marionette, $, _) {
    List.LayoutView = Marionette.LayoutView.extend({
        template: '#template-layout',

        regions: {
            headerRegion: "#header",
            mainRegion: "#main",
            footerRegion: "#footer"
        }
    });

    List.HeaderView = Marionette.ItemView.extend({
        template: '#template-header',

//        ui: {
//            'editUserButton':'.edit'
//        },
//        triggers: {
//            'click @ui.editUserButton': 'edit:user:entity'
//        }
    });

    List.FooterView = Marionette.ItemView.extend({
        template: '#template-footer',
    });

    List.TaskItemView = Marionette.ItemView.extend({
        template: '#template-task-item',
    });

    List.TaskListView = Marionette.ItemView.extend({
        template: '#template-task-list',
    });

});
