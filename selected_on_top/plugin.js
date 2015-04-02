Selectize.define('selected_on_top', function (options) {
        if (this.settings.mode === 'single') return;
        var self = this;


        self.refreshOptions = (function () {
            var original = self.refreshOptions;
            return function () {
                if (!self.settings.hideSelected) {
                    var opts= self.options;
                    var selOpts=self.getValue();
                    var i = 0,n;
                    if ($.isArray(selOpts)) {
                        for (i, n = selOpts.length; i < n; i++) {
                            var val = selOpts[i];
                            opts[val].$order = i;
                        }
                    } else {
                        opts[selOpts].$order = 1;
                    }

                    Object.keys(opts).forEach(function (key) {
                        opts[key].$order += 1;
                    });

                    self.options=opts;
                }
                original.apply(self, arguments);
            };
        })();

    });
