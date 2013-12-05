'use strict';

var app = angular.module('sunflower', [
  'ngRoute',
  'ngAnimate'
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainCtrl'
		})
		.when('/calendar', {
			templateUrl: 'views/calendar.html',
			controller: 'MainCtrl'
		})
		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'MainCtrl'
		})
		.when('/gallery', {
			templateUrl: 'views/gallery.html',
			controller: 'MainCtrl'
		})
		.when('/gallery/:picture', {
			templateUrl: 'views/picture.html',
			controller: 'MainCtrl'
		})
		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
