angular
    .module('numeric', [])
    .directive('numeric', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $(element[0]).numericInput({ allowFloat: false });
                }
            }
        }
    ])
    .directive('numericFloat', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $(element[0]).numericInput({ allowFloat: true });
                }
            }
        }
    ]);