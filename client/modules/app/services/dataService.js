(function () {
	'use strict';

	angular
		.module('app')
		.service('dataService', dataService);

	dataService.$inject = ['localDataStorage'];

	function dataService (localDataStorage) {
		this.localDataStorage = localDataStorage;
		this.companies = [
			{id: 1, name: 'CompanyA'},
			{id: 2, name: 'CompanyB'},
			{id: 3, name: 'CompanyC'}
		];

		this.wellNumbers = [
			{
				id: 1,
				name: 'Well-01',
				region: 'South',
				state: 'Oklahoma',
				fieldOffice: 'Ringwood'
			},
			{
				id: 2,
				name: 'Well-02',
				region: 'North',
				state: 'Montana',
				fieldOffice: 'Sidney'
			},
			{
				id: 3,
				name: 'Well-03',
				region: 'North',
				state: 'North Dakota',
				fieldOffice: 'Tioga'
			}
		];

		this.correctiveActions = [
			{
				id: 1,
				description: 'Corrective Action #1',
				actionBy: 'John Doe',
				company: 'CompanyA',
				date: new Date()
			},
			{
				id: 2,
				description: 'Corrective Action #2',
				actionBy: 'John Doe',
				company: 'CompanyA',
				date: new Date()
			},
			{
				id: 3,
				description: 'Corrective Action #3',
				actionBy: 'John Doe',
				company: 'CompanyA',
				date: new Date()
			},
			{
				id: 4,
				description: 'Corrective Action #4',
				actionBy: 'John Doe',
				company: 'CompanyA',
				date: new Date()
			}
		];

		this.incidentSeverities = [
			{description: 'Loss of well control'},
			{description: 'Fatality(ies)'},
			{description: 'Hospitalization or medical treatment'},
			{description: 'Spill offsite > 50 Bbls'},
			{description: 'Spill to water, any amount'},
			{description: 'Property damage'}
		];

		this.incidentInstance = {
			"workflowCreationInformation":{
				"workflowTypeName": "Incident Report",
				"name": "Report - 2015.05.09"
			},
			"workflowStepUpdateInformation":{
				"stepIdOrName": "Initial Step",
				"fields":[
					{"name":"Date and Time of Incident","values":["2013-05-13T15:40:00"]},
					{"name":"Reported By","values":["John Doe"]},
					{"name":"Company of Reporter","values":["CompanyA"]},
					{"name":"Contact Number","values":["405.234.9751"]},
					{"name":"Supervisor Name","values":["Aaron Moore"]},
					{"name":"High Level Description of Incident","values":["description"]},
					{"name":"Well Number","values":["Well-01"]},
					{"name":"Region","values":["South"]},
					{"name":"State","values":["Oklahoma"]},
					{"name":"Field Office","values":["Ringwood"]},
					{"name":"Incident Severity (Check all that Apply)","values":["Loss of well control", "Spill offsite > 50 Bbls"]},
					{"name":"Description of Corrective Action (1)","values":["description"]},
					{"name":"Action Taken By (name) (1)","values":["James Bucci"]},
					{"name":"Company (1)","values":["CompanyA"]},
					{"name":"Date (1)","values":["2013-05-22T09:00:00"]},
					{"name":"Description of Corrective Action (2)","values":["description"]},
					{"name":"Action Taken By (name) (2)","values":["Michael Mondt"]},
					{"name":"Company (2)","values":["CompanyB"]},
					{"name":"Date (2)","values":["2013-05-11T13:35:00"]}
				]
			}
		};

		this.data = [];
	}

	dataService.prototype.getCompanies = function () {
		return this.companies;
	};

	dataService.prototype.getWellNumbers = function () {
		return this.wellNumbers;
	};

	dataService.prototype.getCorrectiveActions = function () {
		return this.correctiveActions;
	};

	dataService.prototype.getIncidentSeverities = function () {
		return this.incidentSeverities;
	};

	dataService.prototype.getIncidentInstance = function () {
		return this.incidentInstance;
	}

	dataService.prototype.storeData = function (data, key) {
		this.data[key] = data;
	};

	dataService.prototype.restoreData = function (key) {
		return this.data[key];
	}

	dataService.prototype.initIncidentInstance = function () {
		var incident = this.data['incident'];
		var report = {
			"workflowCreationInformation":{
				"workflowTypeName": "Incident Report",
				"name": "Report - 2015.05.09"
			},
			"workflowStepUpdateInformation":{
				"stepIdOrName": "Initial Step",
				"fields":[
					{"name":"Date and Time of Incident","values":[incident.datetime]},
					{"name":"Reported By","values":[incident.reportedBy]},
					{"name":"Company of Reporter","values":[incident.companyOfReporter]},
					{"name":"Contact Number","values":[incident.contactNumber]},
					{"name":"Supervisor Name","values":[incident.supervisorName]},
					{"name":"High Level Description of Incident","values":[incident.description]},
					{"name":"Well Number","values":[incident.wellNumber]},
					{"name":"Region","values":[incident.region]},
					{"name":"State","values":[incident.state]},
					{"name":"Field Office","values":[incident.fieldOffice]},
					{"name":"Incident Severity (Check all that Apply)","values":incident.severities},

/*					{"name":"Description of Corrective Action (1)","values":["description"]},
					{"name":"Action Taken By (name) (1)","values":["James Bucci"]},
					{"name":"Company (1)","values":["CompanyA"]},
					{"name":"Date (1)","values":["2013-05-22T09:00:00"]},
					{"name":"Description of Corrective Action (2)","values":["description"]},
					{"name":"Action Taken By (name) (2)","values":["Michael Mondt"]},
					{"name":"Company (2)","values":["CompanyB"]},
					{"name":"Date (2)","values":["2013-05-11T13:35:00"]}*/
				]
			}
		};
		angular.forEach(this.correctiveActions, function(actions, index) {
			angular.forEach(actions, function(val, key) {
				//debugger;
				var obj = {};
				obj.values = [val];
				switch (key) {
					case 'description':
						obj.name = 'Description of Corrective Action (' + (index + 1) + ')';
						break;
					case 'actionBy':
						obj.name = 'Action Taken By (name) (' + (index + 1) + ')';
						break;
					case 'company':
						obj.name = 'Company (' + (index + 1) + ')';
						break;
					case 'date':
						obj.name = 'Date (' + (index + 1) + ')';
						break;
				}
				if (obj.hasOwnProperty('name')) {
					report.workflowStepUpdateInformation.fields.push(obj);
				}
			});
		});
		debugger;
		this.incidentInstance = report;
		this.localDataStorage.storeData('report', report);
		return report;
	}

})();