
angular.module('parserTimes', [])
.directive('parserFormatterTimes', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "parser-formatter-times.html",
        scope: {
            text: "@",
            date: "=?"
        },
        controller: ["$scope", "$timeout", function ($scope,$timeout) {
            var vm = this;
            // bind time from isolate scope
            $scope.$watch("date", function (date) {
                if (date) {
                    vm.date = date;
                }
            });
            vm.isValid = true;
            $scope.$watch("vm.date", function (oldVal, newVal) {
                //validate  correct time
                if (oldVal) {
                    if (oldVal.length === 1 && oldVal >= 3) {
                        vm.date = '0';
                    }
                    if (oldVal.length === 2 && newVal < oldVal) {

                        vm.date += ':';
                    }

                    if (newVal > oldVal && oldVal.length === 3) {
                        vm.date = vm.date.substring(0, vm.date.length - 1);
                    }
                    if (newVal > oldVal && oldVal.length === 3) {
                        vm.date = vm.date.substring(0, vm.date.length - 1);
                    }
                    if (oldVal.length == 4 && oldVal.charAt(oldVal.length - 1) > 5) {
                        vm.date = oldVal.slice(0, -1);
                        vm.date = vm.date.concat(0);
                    }
                }
                $scope.date = vm.date;
            });
            vm.onBlur = function ($event) {
                
                if (vm.date && vm.date.length < 5 || vm.date && vm.date.match(/[a-z]/i) || vm.date && vm.date.match(/[\u05D0-\u05F3]+/g)) {
                    vm.isValid = false;
                } else {
                    vm.isValid = true;
                }
            }
        }],
        controllerAs: "vm"
    }
});
