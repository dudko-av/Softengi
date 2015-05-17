/**
 * Created by dudko-av on 13.05.15.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('ReviewSubmitController', ReviewSubmitController);

	ReviewSubmitController.$inject = ['$scope', 'dataService'];

	function ReviewSubmitController ($scope, dataService) {
		var generalInfo = dataService.restoreData('generalInfo');
		$scope.correctiveActions = dataService.getCorrectiveActions();
		$scope.formValid = generalInfo ? generalInfo.$invalid : true;
		$scope.submit = submit;

		$scope.generalInformation = [
			{
				label: 'Date and Time of Incident',
				input: 'datetime',
			},
			{
				label: 'Reported By',
				input: 'reportedBy',
			},
			{
				label: 'Company of Reporter',
				input: 'companyOfReporter',
			},
			{
				label: 'Contact Number',
				input: 'contactNumber',
			},
			{
				label: 'Supervisor Name',
				input: 'supervisorName',
			},
			{
				label: 'High Level Description of Incident',
				input: 'description',
			},
			{
				label: 'Well Number',
				input: 'wellNumber',
			},
			{
				label: 'Region',
				input: 'region',
			},
			{
				label: 'State',
				input: 'state',
			},
			{
				label: 'Field Office',
				input: 'fieldOffice',
			},
			{
				label: 'Incident Severity',
				input: 'severitySelected',
			}
		];

		if (generalInfo) {
			angular.forEach($scope.generalInformation, function(item) {
				item.val = val(generalInfo[item.input]);
				item.invalid = generalInfo[item.input].$invalid;
			});
		}

		function val (input) {
			return input ? (getErrors(input.$error) ||
							(angular.isArray(input.$viewValue)
								? input.$viewValue.join('; ')
								: input.$viewValue ))
						: '';
		}

		function getErrors (errors) {
			var errorMessages = {
				required: 'This field is required. ',
				pattern: 'Pattern do not match. '
			};
			var message = '';
			angular.forEach(errors, function (val, key) {
				//debugger;
				message += errorMessages[key];
			});
			return message;
		}

		function submit () {
			dataService.initIncidentInstance();
			//debugger;
		}
	}

})();