(function () {
	'use strict';

	angular
		.module('app')
		.controller('ModalInstanceController', ModalInstanceController);

	ModalInstanceController.$inject = ['$scope', '$modalInstance', 'record', 'dataService'];

	function ModalInstanceController ($scope, $modalInstance, record, dataService) {
		$scope.record = record;
		$scope.companies = dataService.getCompanies();
		$scope.validation = validation;
		$scope.openDatepicker = openDatepicker;
		/** Modal buttons */
		$scope.ok = submit;
		$scope.cancel = cancel;

		function cancel () {
			$modalInstance.dismiss('cancel');
		}

		function validation (input) {
			return {
				'has-error': input.$invalid && (input.$dirty || $scope.actions.$submited),
				'has-success': input.$valid
			};
		}

		function submit () {
			$scope.actions.$submited = true;
			if ($scope.actions.$valid) {
				$modalInstance.close($scope.record);
			}
			//debugger;
		}

		function openDatepicker ($e) {
			$e.preventDefault();
			$e.stopPropagation();
			this.opened = true;
		}
	}

})();