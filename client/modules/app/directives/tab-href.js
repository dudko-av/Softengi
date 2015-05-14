(function () {
	'use strict';

	angular
		.module('app')
		.directive('tabHref', tabHref);

	function tabHref() {
		var directive = {
			link: link,
			restrict: 'AEC',
			scope: {
				'tab-href': '@'
			}
		};
		return directive;

		function link(scope, element, attrs) {
			debugger;
		}
	}

})();