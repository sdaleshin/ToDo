App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.Task = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false,
            created: 0
        },

        initialize: function () {
            if (this.isNew()) {
                this.set('created', Date.now());
            }
        },

        toggle: function () {
            return this.set('completed', !this.isCompleted());
        },

        isCompleted: function () {
            return this.get('completed');
        },

        matchesFilter: function (filter) {
            if (filter === 'all') {
                return true;
            }

            if (filter === 'active') {
                return !this.isCompleted();
            }

            return this.isCompleted();
        }
    });

    Entities.TaskCollection = Backbone.Collection.extend({
        model: Entities.Task,
        localStorage: new Backbone.LocalStorage('todo-tasks'),

        comparator: function(model){
            return -model.get('title');
        },

        getCompleted: function () {
            return this.filter(this._isCompleted);
        },

        getActive: function () {
            return this.reject(this._isCompleted);
        },

        _isCompleted: function (todo) {
            return todo.isCompleted();
        }
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