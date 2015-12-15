App.module('TaskApp.List', function (List, App, Backbone, Marionette, $, _) {

    var filterChannel = Backbone.Radio.channel('filter');

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

        ui: {
            input: '#new-todo'
        },

        events: {
            'keypress @ui.input': 'onInputKeypress',
            'keyup @ui.input': 'onInputKeyup'
        },

        onInputKeyup: function (e) {
            var ESC_KEY = 27;

            if (e.which === ESC_KEY) {
                this.render();
            }
        },

        onInputKeypress: function (e) {
            var ENTER_KEY = 13;
            var todoText = this.ui.input.val().trim();

            if (e.which === ENTER_KEY && todoText) {
                this.trigger('task:create', { title: todoText });
                this.ui.input.val('');
            }
        }
    });

    List.FooterView = Marionette.ItemView.extend({
        template: '#template-footer',
        ui: {
            filters: '#filters a',
            completed: '.completed a',
            active: '.active a',
            all: '.all a',
            summary: '#todo-count',
            clear: '#clear-completed'
        },

        events: {
            'click @ui.clear': 'onClearClick'
        },

        collectionEvents: {
            all: 'render'
        },

        templateHelpers: {
            activeCountLabel: function () {
                return (this.activeCount === 1 ? 'item' : 'items') + ' left';
            }
        },

        initialize: function () {
            this.listenTo(filterChannel.request('filterState'), 'change:filter', this.updateFilterSelection, this);
        },

        serializeData: function () {
            var active = this.collection.getActive().length;
            var total = this.collection.length;

            return {
                activeCount: active,
                totalCount: total,
                completedCount: total - active
            };
        },

        onRender: function () {
            this.$el.parent().toggle(this.collection.length > 0);
            this.updateFilterSelection();
        },

        updateFilterSelection: function () {
            this.ui.filters.removeClass('selected');
            this.ui[filterChannel.request('filterState').get('filter')]
                .addClass('selected');
        },

        onClearClick: function () {
            var completed = this.collection.getCompleted();
            completed.forEach(function (todo) {
                todo.destroy();
            });
        }
    });

    List.TaskItemView = Marionette.ItemView.extend({
        template: '#template-task-item',

        tagName: 'li',

        className: function () {
            return this.model.get('completed') ? 'completed' : 'active';
        },

        ui: {
            edit: '.edit',
            destroy: '.destroy',
            label: 'label',
            toggle: '.toggle'
        },

        events: {
            'click @ui.destroy': 'deleteModel',
            'dblclick @ui.label': 'onEditClick',
            'keydown @ui.edit': 'onEditKeypress',
            'focusout @ui.edit': 'onEditFocusout',
            'click @ui.toggle': 'toggle'
        },

        modelEvents: {
            change: 'render'
        },

        deleteModel: function () {
            this.model.destroy();
        },

        toggle: function () {
            this.model.toggle().save();
        },

        onEditClick: function () {
            this.$el.addClass('editing');
            this.ui.edit.focus();
            this.ui.edit.val(this.ui.edit.val());
        },

        onEditFocusout: function () {
            var todoText = this.ui.edit.val().trim();
            if (todoText) {
                this.model.set('title', todoText).save();
                this.$el.removeClass('editing');
            } else {
                this.destroy();
            }
        },

        onEditKeypress: function (e) {
            var ENTER_KEY = 13;
            var ESC_KEY = 27;

            if (e.which === ENTER_KEY) {
                this.onEditFocusout();
                return;
            }

            if (e.which === ESC_KEY) {
                this.ui.edit.val(this.model.get('title'));
                this.$el.removeClass('editing');
            }
        }
    });

    List.TaskListView = Marionette.CompositeView.extend({
        template: '#template-task-list',
        childView: List.TaskItemView,

        childViewContainer: '#todo-list',

        ui: {
            toggle: '#toggle-all'
        },

        events: {
            'click @ui.toggle': 'onToggleAllClick'
        },

        collectionEvents: {
            'change:completed': 'render',
            all: 'setCheckAllState'
        },

        initialize: function () {
            this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
        },

        filter: function (child) {
            var filteredOn = filterChannel.request('filterState').get('filter');
            return child.matchesFilter(filteredOn);
        },

        setCheckAllState: function () {
            function reduceCompleted(left, right) {
                return left && right.get('completed');
            }

            var allCompleted = this.collection.reduce(reduceCompleted, true);
            this.ui.toggle.prop('checked', allCompleted);
            this.$el.parent().toggle(!!this.collection.length);
        },

        onToggleAllClick: function (e) {
            var isChecked = e.currentTarget.checked;

            this.collection.each(function (todo) {
                todo.save({ completed: isChecked });
            });
        }
    });

});
