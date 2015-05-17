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
			.state('tabset', {
				url: '/',
				views: {
					tabset: {templateUrl: '/modules/app/views/tabset.html'}
				}
			})
			.state('tabset.general_information', {
				url: 'general_information',
				controller: 'GeneralInformationController',
				views: {
					'generalInformation': {templateUrl: '/modules/app/views/general-information.html'}
				}
			})
			.state('tabset.corrective_actions', {
				url: 'corrective_actions',
				controller: 'CorrectiveActionsController',
				views: {
					'correctiveActions': {templateUrl: '/modules/app/views/corrective-actions.html'}
				}
			})
			.state('tabset.review_submit', {
				url: 'review_submit',
				controller: 'ReviewSubmitController',
				views: {
					'reviewSubmit': {templateUrl: '/modules/app/views/review-submit.html'}
				}
			})
			.state('view_report', {
				url: '^/report/view',
				controller: 'ReportController',
				views: {
					'reportView': {templateUrl: '/modules/app/views/report-view.html'}
				}
			});
	}

})();