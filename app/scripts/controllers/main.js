'use strict';

/* Menu items for header */
var menuItems = [{
	name: 'Home',
	icon: 'fa-home',
	url: '/'
}, {
	name: 'Calendar',
	icon: 'fa-calendar-o',
	url: '/calendar'
}, {
	name: 'Gallery',
	icon: 'fa-picture-o',
	url: '/gallery'
}, {
	name: 'Contact',
	icon: 'fa-envelope-o',
	url: '/contact'
}];

/* Items for carousel */
var carouselItems = [{
	url: 'http://imageshack.com/a/img405/1989/z26i.jpg',
	h: 'Sunflower Child Care',
	p: 'Just what your child needs to learn through playing',
	active: true
}, {
	url: 'http://imageshack.com/a/img6/4425/wnnk.jpg',
	h: 'Friendly Enviroment',
	p: 'Let your child spend a day in a playful and friendly enviroment'
}, {
	url: 'http://imageshack.com/a/img841/2199/e0y5.jpg',
	h: 'Making new friends',
	p: 'Great way to get used to communicating with other kids around and make friends'
}];

var carouselItemsMobile = [{
	url: 'http://imagizer.imageshack.us/v2/1024x768q90/405/z26i.jpg',
	url1: 'http://imagizer.imageshack.us/v2/800x600q90/405/z26i.jpg',
	h: 'Sunflower Child Care',
	p: 'Just what your child needs to learn through playing',
	active: true
}, {
	// url: 'http://imagizer.imageshack.us/v2/1024x768q90/6/wnnk.jpg',
	url: 'http://imagizer.imageshack.us/v2/800x600q90/6/wnnk.jpg',
	h: 'Friendly Enviroment',
	p: 'Let your child spend a day in a playful and friendly enviroment'
}, {
	// url: 'http://imagizer.imageshack.us/v2/1024x768q90/841/e0y5.jpg',
	url: 'http://imagizer.imageshack.us/v2/800x600q90/841/e0y5.jpg',
	h: 'Making new friends',
	p: 'Great way to get used to communicating with other kids around and make friends'
}];

/* Activities for daily schedule */
var morningSchedule = [{
	time: '8:00AM - 9:00AM',
	description: 'Arrival time, Free Play'
}, {
	time: '9:00AM - 9:30AM',
	description: 'Breakfast'
}, {
	time: '9:30AM - 10:00AM',
	description: 'Clean up, Free Play'
}, {
	time: '10:00AM - 10:30AM',
	description: 'Academics (Letters, Numbers, Science, Art, etc)'
}, {
	time: '10:30AM - 11:00AM',
	description: 'Snack Time'
}, {
	time: '11:00AM - 12:00PM',
	description: 'Outside Play'
}];

var afternoonSchedule = [{
		time: '12:00 PM - 12:40PM',
		description: 'Lunch'
	}, {
		time: '12:40PM - 1:00PM',
		description: 'Clean up, Preparing for Nap'
	}, {
		time: '1:00PM - 3:00PM',
		description: 'Nap Time'
	}, {
		time: '3:00PM - 3:30PM',
		description: 'Wake up time'
	}, {
		time: '3:30PM - 4:00PM',
		description: 'Snack Time'
	}, {
		time: '4:00PM - 4:30PM',
		description: 'Story time'
	}, {
		time: '4:30PM - 5:30PM',
		description: 'Outside/Inside Free Play'
	}, {
		time: '5:30PM - 6:00PM',
		description: 'Prepare for pick-up'
	}, {
		time: '6:00PM',
		description: 'Childcare closes'
	}
];

/* Pictures */
var pictures = [{
	name: 'p1',
	fullsize: 'http://imageshack.com/a/img43/8645/kv56.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/43/kv56.jpg'
},	{
	name: 'p2',
	fullsize: 'http://imageshack.com/a/img209/1721/gyy6.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg'
},	{
	name: 'p3',
	fullsize: 'http://imageshack.com/a/img585/4802/8cea.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg'
},	{
	name: 'p4',
	fullsize: 'http://imageshack.com/a/img407/1734/ef0k.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg'
},	{
	name: 'p5',
	fullsize: 'http://imageshack.com/a/img825/1971/pp7d.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg'
},	{
	name: 'p6',
	fullsize: 'http://imageshack.com/a/img692/9776/awkh.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg'
},	{
	name: 'p7',
	fullsize: 'http://imageshack.com/a/img41/9346/qbtt.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg'
},	{
	name: 'p8',
	fullsize: 'http://imageshack.com/a/img689/5892/qfab.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg'
}, {
	name: 'p2',
	fullsize: 'http://imageshack.com/a/img209/1721/gyy6.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg'
},	{
	name: 'p3',
	fullsize: 'http://imageshack.com/a/img585/4802/8cea.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg'
},	{
	name: 'p4',
	fullsize: 'http://imageshack.com/a/img407/1734/ef0k.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg'
},	{
	name: 'p5',
	fullsize: 'http://imageshack.com/a/img825/1971/pp7d.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg'
},	{
	name: 'p6',
	fullsize: 'http://imageshack.com/a/img692/9776/awkh.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg'
},	{
	name: 'p7',
	fullsize: 'http://imageshack.com/a/img41/9346/qbtt.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg'
},	{
	name: 'p8',
	fullsize: 'http://imageshack.com/a/img689/5892/qfab.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg'
}, {
	name: 'p2',
	fullsize: 'http://imageshack.com/a/img209/1721/gyy6.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/209/gyy6.jpg'
},	{
	name: 'p3',
	fullsize: 'http://imageshack.com/a/img585/4802/8cea.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/585/8cea.jpg'
},	{
	name: 'p4',
	fullsize: 'http://imageshack.com/a/img407/1734/ef0k.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/407/ef0k.jpg'
},	{
	name: 'p5',
	fullsize: 'http://imageshack.com/a/img825/1971/pp7d.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/825/pp7d.jpg'
},	{
	name: 'p6',
	fullsize: 'http://imageshack.com/a/img692/9776/awkh.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/692/awkh.jpg'
},	{
	name: 'p7',
	fullsize: 'http://imageshack.com/a/img41/9346/qbtt.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/41/qbtt.jpg'
},	{
	name: 'p8',
	fullsize: 'http://imageshack.com/a/img689/5892/qfab.jpg',
	thumb: 'http://imagizer.imageshack.us/v2/320x240q90/c/689/qfab.jpg'
}];

/* Controllers */
var app = angular.module('sunflower')

/* Main controller */
app.controller('MainCtrl', ['$scope', '$routeParams', '$location',
	function ($scope, $routeParams, $location) {
	var result;

	$scope.carouselItems = carouselItems;
	$scope.carouselItemsMobile = carouselItemsMobile;
	$scope.morningSchedule = morningSchedule;
	$scope.afternoonSchedule = afternoonSchedule;
	$scope.pictures = pictures;

	$scope.findPicture = function (name) {
		var pictures = $scope.pictures,
			length = pictures.length,
			i = 0;

		for (; i < length; i++) {
			if (pictures[i].name == name) {
				return {
					curr: pictures[i],
					prev: (i - 1 < 0) ? pictures[length - 1] : pictures[i - 1],
					next: (i + 1 >= length) ? pictures[0] : pictures[i + 1]
				}
			}
		}

		return null;
	};

	if ($routeParams.picture) {
		result = $scope.findPicture($routeParams.picture);
		$scope.curr = result.curr;
		$scope.prev = result.prev;
		$scope.next = result.next;
	}
}]);

/* Controller for navbar */
app.controller('NavCtrl', ['$scope', '$location',
	function ($scope, $location) {
		$scope.menuItems = menuItems;
		$scope.show = true;

		$scope.$on('$routeChangeSuccess', function() {
			$scope.menuItems.forEach(function(item) {
				var regex = new RegExp(item.url),
					path = $location.path();

				item.isActive = false;
				if (item.url === '/' && path === '/') {
					item.isActive = true;
				} else if (item.url === '/') {
					item.isActive = false;
				} else {
					item.isActive = regex.test(path);
				}
			});

			$scope.show = !(/gallery\/.+/.test($location.path()))
			console.debug("show: ", $scope.show);
		});
	}]);