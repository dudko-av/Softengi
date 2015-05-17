(function () {
	'use strict';

	angular
		.module('app')
		.directive('tabActive', tabActive);

	tabActive.$inject = ['$rootScope', '$state'];

	function tabActive ($rootScope, $state) {
		var directive = {
			restrict: 'A',
			link: link
		};
		return directive;

		function link (scope, elem, attrs) { //debugger;
			scope.tabActive = {};
			scope.tabActive[$state.current.url] = true;
			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
				scope.tabActive[toState.url] = true;
			});
		}
	}

})();