App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.Task = Backbone.Model.extend({
        urlRoot: "/api/users"
    });

    Entities.TaskCollection = Backbone.Collection.extend({
        model: Entities.Task,
        localStorage: new Backbone.LocalStorage('todo-tasks')
    });

    var API = {
        getTaskEntities: function () {
            var tasks = new Entities.TaskCollection();
            tasks.fetch();
            return tasks;
        }
    }

    App.reqres.setHandler("task:entities", function () {
        return API.getTaskEntities();

    });

});