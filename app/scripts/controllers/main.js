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
	icon: 'fa-camera',
	url: '/gallery'
}];

var aboutPics = {
	mission: 'http://imageshack.com/a/img921/4271/KKN28c.jpg',
	owner: 'http://imageshack.com/a/img923/6964/c0SpyJ.jpg'
};

var aboutItems = [{
		thumb: 'http://imagizer.imageshack.us/v2/640x480q90/921/m6XAad.jpg',
		title: "Learn/Play Room",
		text: "Blah blah blah"
	},{
		thumb: 'http://imagizer.imageshack.us/v2/640x480q90/922/MFGSFt.jpg',
		title: "Nap Room",
		text: "Blah blah blah"
	},{
		thumb: 'http://imagizer.imageshack.us/v2/640x480q90/921/i4R4GB.jpg',
		title: "Play Ground",
		text: "Blah blah blah"
	}
];

/* Items for carousel */
var carouselItems = [{
	url: 'http://imageshack.com/a/img924/360/lCrKns.jpg',
	h: 'Sunflower Child Care',
	p: 'Just what your child needs to learn through playing',
	active: true
}];

var carouselItemsMobile = [{
	url: 'http://imagizer.imageshack.us/v2/1024x768q90/405/z26i.jpg',
	h: 'Sunflower Child Care',
	p: 'Just what your child needs to learn through playing',
	active: true
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
}];

var _thumbs = [
	'http://imagizer.imageshack.us/v2/280x200q90/921/KKN28c.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/MFGSFt.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/m6XAad.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/UmOAot.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/i4R4GB.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/foHZn7.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/S1PcHW.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/pS984i.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/aOnyyR.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/923/ZxD6Pr.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/4pbsrd.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/NLF4wL.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/924/jErclA.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/923/n9ch9A.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/923/KFLyLv.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/924/uYmSvf.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/bcMkm2.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/uG2OeC.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/922/9H3wRL.jpg',
	'http://imagizer.imageshack.us/v2/280x200q90/921/CjjXRQ.jpg'
];

var _fullSizes = [
	'http://imagizer.imageshack.us/v2/1024x768q90/921/KKN28c.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/MFGSFt.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/m6XAad.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/UmOAot.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/i4R4GB.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/foHZn7.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/S1PcHW.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/pS984i.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/aOnyyR.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/923/ZxD6Pr.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/4pbsrd.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/NLF4wL.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/924/jErclA.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/923/n9ch9A.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/923/KFLyLv.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/924/uYmSvf.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/bcMkm2.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/uG2OeC.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/922/9H3wRL.jpg',
	'http://imagizer.imageshack.us/v2/1024x768q90/921/CjjXRQ.jpg'
]

var pictures = _thumbs.map(function (thumb, i) {
	return {
		name: 'p' + (i + 1),
		thumb: thumb,
		fullsize: _fullSizes[i],
	}
});

_thumbs.forEach(function(thumbUrl, i) {
	pictures[i].thumb = thumbUrl;
});


/* Controllers */
var app = angular.module('sunflower');

/* Main controller */
app.controller('MainCtrl', ['$scope', '$routeParams', '$location',
	function ($scope, $routeParams) {
	var result;

	$scope.carouselItems = carouselItems;
	$scope.carouselItemsMobile = carouselItemsMobile;
	$scope.morningSchedule = morningSchedule;
	$scope.afternoonSchedule = afternoonSchedule;
	$scope.pictures = pictures;
	$scope.aboutPics = aboutPics;
	$scope.aboutItems = aboutItems;

	$scope.findPicture = function (name) {
		var pictures = $scope.pictures,
			length = pictures.length,
			i = 0;

		for (; i < length; i++) {
			if (pictures[i].name === name) {
				return {
					curr: pictures[i],
					prev: (i - 1 < 0) ? pictures[length - 1] : pictures[i - 1],
					next: (i + 1 >= length) ? pictures[0] : pictures[i + 1]
				};
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
app.controller('NavCtrl', ['$scope', '$location', '$rootScope',
	function ($scope, $location, $rootScope) {
		$scope.menuItems = menuItems;
		$scope.show = true;

		$scope.$on('$routeChangeSuccess', function(event, current) {
			$rootScope.title = current.$$route.title;

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

			$scope.show = !(/gallery\/.+/.test($location.path()));
			$scope.scalable = $scope.show ? 'no' : 'yes';
		});
	}]);
