/**
 * Created by dudko-av on 13.05.15.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('GeneralInformationController', GeneralInformationController);

	GeneralInformationController.$inject = ['$scope', 'dataService'];

	function GeneralInformationController ($scope, dataService) {
		$scope.incident = dataService.restoreData('incident') || {};
		$scope.companies = dataService.getCompanies();
		$scope.wellNumbers = dataService.getWellNumbers();
		$scope.incidentSeverities = dataService.getIncidentSeverities();
		$scope.validation = validation;
		$scope.toggleSeverity = toggleSeverity;

		$scope.datetimePicker = {
			format: 'MM/dd/yyyy hh:mm a',
			opened: false,
			open: function($e) {
				$e.preventDefault();
				$e.stopPropagation();
				this.opened = true;
			}
		};

		$scope.$on('$destroy', function ($e) {
			dataService.storeData(angular.copy($scope.generalInfo), 'generalInfo');
			dataService.storeData($scope.incident, 'incident');
			dataService.storeData(true, 'dirty');
			//debugger;
		});

		$scope.$watchCollection('incident.severities', function (newVal, oldVal) {
			if (newVal != oldVal) {
				$scope.incident.severitySelected = newVal.length ? newVal : '';
				//debugger;
			}
		});

		$scope.$watch('incident.wellNumber', function (newVal, oldVal) {
			if (newVal != oldVal) {
				//debugger;
				var well;
				angular.forEach($scope.wellNumbers, function (item) {
					if (item.name == newVal) {
						well = item;
					}
				});
				$scope.incident.region = well.region;
				$scope.incident.state = well.state;
				$scope.incident.fieldOffice = well.fieldOffice;
			}
		});

		function validation (input) {
			return {
				'has-error': input.$invalid && dataService.restoreData('dirty'),
				'has-success': input.$valid
			};
		}

		function toggleSeverity (description) {
			$scope.incident.severities = $scope.incident.severities || [];
			var index = $scope.incident.severities.indexOf('None Apply');
			if (description == 'None Apply' && index > -1) {
				$scope.incident.severities = [];
				return;
			} else if (description == 'None Apply' && index == -1) {
				$scope.incident.severities = ['None Apply'];
				return;
			}
			index = $scope.incident.severities.indexOf(description);
			if (index == -1) {
				$scope.incident.severities.push(description);
			} else {
				$scope.incident.severities.splice(index, 1);
			}
			//console.log($scope.incident.severities);
		}
	}

})();