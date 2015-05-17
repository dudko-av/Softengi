(function () {
	'use strict';

	angular
		.module('app')
		.controller('ReportController', ReportController);

	ReportController.$inject = ['$scope', 'localDataStorage'];

	function ReportController ($scope, localDataStorage) {
		$scope.report = localDataStorage.restoreData('report');
		$scope.render = render;

		function render (values) {
			return values.join('; ');
		}
	}

})();