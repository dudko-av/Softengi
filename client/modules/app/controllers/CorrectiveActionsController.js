/**
 * Created by dudko-av on 13.05.15.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.controller('CorrectiveActionsController', CorrectiveActionsController);

	CorrectiveActionsController.$inject = ['$scope', '$modal', 'dataService'];

	function CorrectiveActionsController ($scope, $modal, dataService) {
		var MIN_RECORDS = 1;
		var MAX_RECORDS = 5;
		var modalInstance;

		$scope.maxRecords = MAX_RECORDS;
		$scope.correctiveActions = dataService.getCorrectiveActions();

		$scope.create = create;
		$scope.edit = edit;
		$scope.delete = deleteFn;

		/** Just wrapper */
		function create () {
			if ($scope.correctiveActions.length == MAX_RECORDS) { return; }
			edit();
		}

		function edit (record) {
			modalInstance = $modal.open({
				controller: 'ModalInstanceController',
				templateUrl: 'modules/app/views/corrective-actions-modal.html',
				resolve: {
					record: function () {
						return record ? angular.copy(record) : {};
					}
				}
			});

			modalInstance.result.then(function (record) {
				if (!record.hasOwnProperty('id')) {
					record.id = generateRecordId();
					$scope.correctiveActions.push(record);
				} else {
					for (var index = 0; index < $scope.correctiveActions.length; index++) {
						if ($scope.correctiveActions[index].id == record.id) {
							angular.extend($scope.correctiveActions[index], record);
							break;
						}
					}
				}
				//debugger;
			});
		}

		function deleteFn (record) {
			if (confirm('Are you sure to delete this record?') && $scope.correctiveActions.length > MIN_RECORDS) {
				for (var index = 0; index < $scope.correctiveActions.length; index++) {
					if ($scope.correctiveActions[index].id == record.id) {
						$scope.correctiveActions.splice(index, 1);
						break;
					}
				}
			}
		}

		function generateRecordId () {
			return Math.floor((Math.random() * 9999) + 1);
		}
	}

})();