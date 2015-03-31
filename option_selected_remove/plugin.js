Selectize.define('option_selected_remove', function (options) {
        if (this.settings.mode === 'single') return;
        var self = this;

        options = $.extend({
            spanClass: 'selectize-dropdown-option-closebox',
            closeClass: 'selectize-dropdown-option-close',

            html: function (data) {
                return (
                '<span class="' + data.spanClass + '"><a href="javascript:void()" title="Deselect Item" class="' + data.closeClass + ' circle-delete"></a></span>'
                );
            }
        }, options);

        self.refreshOptions = (function () {
            var original = self.refreshOptions;
            return function () {
                original.apply(self, arguments);
                var $dropdown_option = $(options.html(options));

                if (!self.settings.hideSelected) {
                    $('.option.selected').append($dropdown_option);
                }

                // add event listener
                this.$dropdown_content.on('click', 'a.' + options.closeClass, function (e) {
                    e.preventDefault();
                    if (self.isLocked) return;

                    var $item = $(e.currentTarget).parent().parent();
                    self.setActiveItem($item);
                    if (self.deleteSelection()) {
                        self.setCaret(self.items.length);
                    }
                });
            };
        })();

    });
