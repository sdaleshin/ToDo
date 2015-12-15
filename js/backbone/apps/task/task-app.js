App.module('TaskApp', function (TaskApp, App, Backbone, Marionette, $, _) {

    TaskApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "*filter": "taskList"
        }
    });

    var API = {
        taskList: function (filter) {
            return new TaskApp.List.Controller({filter: filter})
        }

    };

    App.addInitializer(function () {
        return new TaskApp.Router({ controller: API });
    })

});