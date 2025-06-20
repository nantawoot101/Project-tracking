angular
    .module('app')
    .service('$forthNotify', [
        '$translate',
        'WizardHandler',
        function ($translate, WizardHandler) {
            var modal = null;
            var loading = function (message, onClick) {
                var textBack = $translate.instant('Back');
                var _onClick = function () {
                    modal.hide();
                    try {
                        if (jQuery.isFunction(onClick)) {
                            onClick();
                        }
                    } catch (e) { }
                    try {
                        WizardHandler.wizard().previous();
                    } catch (e) { }
                };
                modal = UIkit.modal.dialog(([
                    '<div class="uk-margin uk-modal-content">' + message + ' ' + $translate.instant('Please specify new conditions.') +'</div>',
                    '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-back">' + textBack + '</button></div>'
                ]).join(""), {bgclose: false});

                modal.element.find(".js-modal-back").on("click", _onClick);
                modal.show();
            };
            var hide = function () {
                try {
                    if (modal != null) {
                        modal.hide();
                        modal = null;
                    }
                } catch (e) {}
            }
            return {
                loading: loading,
                hide: hide
            }
        }
    ])
;