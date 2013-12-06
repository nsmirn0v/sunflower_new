'use strict';

var app = angular.module('sunflower', [
  'ngRoute',
  'ngAnimate'
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			title: 'Home',
			templateUrl: 'views/home.html',
			controller: 'MainCtrl'
		})
		.when('/calendar', {
			title: 'Calendar',
			templateUrl: 'views/calendar.html',
			controller: 'MainCtrl'
		})
		.when('/gallery', {
			title: 'Gallery',
			templateUrl: 'views/gallery.html',
			controller: 'MainCtrl'
		})
		.when('/gallery/:picture', {
			title: 'Gallery',
			templateUrl: 'views/picture.html',
			controller: 'MainCtrl'
		})
		.when('/contact', {
			title: 'Contact',
			templateUrl: 'views/contact.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
