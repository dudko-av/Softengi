(function () {
	'use strict'

	angular
		.module('app')
		.service('localDataStorage', localDataStorage);

	localDataStorage.$inject = [];

	function localDataStorage () {}

	localDataStorage.prototype.storeData = function (key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	localDataStorage.prototype.restoreData = function (key) {
		return JSON.parse(window.localStorage.getItem(key));
	};

})();