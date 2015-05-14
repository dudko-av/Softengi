(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function config($stateProvider, $urlRouterProvider, $locationProvider) {
		/** Default page */
		$urlRouterProvider.otherwise('/general_information');

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$stateProvider
			.state('general_information', {
				url: '^/general_information',
				controller: 'GeneralInformationController',
				views: {
					'generalInformation': {templateUrl: '/modules/app/views/general-information.html'}
				}
			})
			.state('corrective_actions', {
				url: '^/corrective_actions',
				controller: 'CorrectiveActionsController',
				views: {
					'correctiveActions': {templateUrl: '/modules/app/views/corrective-actions.html'}
				}
			})
			.state('review_submit', {
				url: '^/review_submit',
				controller: 'ReviewSubmitController',
				views: {
					'reviewSubmit': {templateUrl: '/modules/app/views/review-submit.html'}
				}
			});
	}

})();