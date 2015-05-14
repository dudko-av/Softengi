/**
 * Created by dudko-av on 13.05.15.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('GeneralInformationController', GeneralInformationController);

	GeneralInformationController.$inject = ['$scope'];

	function GeneralInformationController ($scope) {
		$scope.incident = {};
		$scope.companies = companies();
		$scope.wellNumbers = wellNumbers();

		function companies() {
			return [
				{id: 1, name: 'CompanyA'},
				{id: 2, name: 'CompanyB'},
				{id: 3, name: 'CompanyC'}
			];
		}
		function wellNumbers() {
			return [
				{id: 1, name: 'Well-01'},
				{id: 2, name: 'Well-02'},
				{id: 3, name: 'Well-03'}
			];
		}

		$scope.$on('$destroy', function() {
			debugger;
		});
	}

})();