'use strict';
var app = angular.module('sunflower', [
    'ngRoute',
    'ngAnimate'
  ]);
app.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      title: 'Home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    }).when('/calendar', {
      title: 'Calendar',
      templateUrl: 'views/calendar.html',
      controller: 'MainCtrl'
    }).when('/gallery', {
      title: 'Gallery',
      templateUrl: 'views/gallery.html',
      controller: 'MainCtrl'
    }).when('/gallery/:picture', {
      title: 'Gallery',
      templateUrl: 'views/picture.html',
      controller: 'MainCtrl'
    }).when('/contact', {
      title: 'Contact',
      templateUrl: 'views/contact.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
var menuItems = [
    {
      name: 'Home',
      icon: 'fa-home',
      url: '/'
    },
    {
      name: 'Calendar',
      icon: 'fa-calendar-o',
      url: '/calendar'
    },
    {
      name: 'Gallery',
      icon: 'fa-camera',
      url: '/gallery'
    }
  ];
var aboutPics = {
    mission: 'http://imagizer.imageshack.us/v2/800x600q90/20/bxj4.jpg',
    owner: 'http://imagizer.imageshack.us/v2/1024x768q90/822/stdl.jpg'
  };
var aboutItems = [
    {
      thumb: 'http://imagizer.imageshack.us/v2/800x600q90/560/v9iy.jpg',
      title: 'Learn/Play Room',
      text: 'Blah blah blah'
    },
    {
      thumb: 'http://imagizer.imageshack.us/v2/800x600q90/14/2djo.jpg',
      title: 'Nap Room',
      text: 'Blah blah blah'
    },
    {
      thumb: 'http://imagizer.imageshack.us/v2/1024x768q90/829/b7bw.jpg',
      title: 'Play Ground',
      text: 'Blah blah blah'
    }
  ];
var carouselItems = [{
      url: 'http://imageshack.com/a/img405/1989/z26i.jpg',
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
var morningSchedule = [
    {
      time: '8:00AM - 9:00AM',
      description: 'Arrival time, Free Play'
    },
    {
      time: '9:00AM - 9:30AM',
      description: 'Breakfast'
    },
    {
      time: '9:30AM - 10:00AM',
      description: 'Clean up, Free Play'
    },
    {
      time: '10:00AM - 10:30AM',
      description: 'Academics (Letters, Numbers, Science, Art, etc)'
    },
    {
      time: '10:30AM - 11:00AM',
      description: 'Snack Time'
    },
    {
      time: '11:00AM - 12:00PM',
      description: 'Outside Play'
    }
  ];
var afternoonSchedule = [
    {
      time: '12:00 PM - 12:40PM',
      description: 'Lunch'
    },
    {
      time: '12:40PM - 1:00PM',
      description: 'Clean up, Preparing for Nap'
    },
    {
      time: '1:00PM - 3:00PM',
      description: 'Nap Time'
    },
    {
      time: '3:00PM - 3:30PM',
      description: 'Wake up time'
    },
    {
      time: '3:30PM - 4:00PM',
      description: 'Snack Time'
    },
    {
      time: '4:00PM - 4:30PM',
      description: 'Story time'
    },
    {
      time: '4:30PM - 5:30PM',
      description: 'Outside/Inside Free Play'
    },
    {
      time: '5:30PM - 6:00PM',
      description: 'Prepare for pick-up'
    },
    {
      time: '6:00PM',
      description: 'Childcare closes'
    }
  ];
var pictures = [
    {
      name: 'p1',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/822/stdl.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/822/stdl.jpg'
    },
    {
      name: 'p2',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/829/b7bw.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/829/b7bw.jpg'
    },
    {
      name: 'p3',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/14/2djo.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/14/2djo.jpg'
    },
    {
      name: 'p4',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/20/bxj4.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/20/bxj4.jpg'
    },
    {
      name: 'p5',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/560/v9iy.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/560/v9iy.jpg'
    },
    {
      name: 'p6',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/833/q8lr.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/833/q8lr.jpg'
    },
    {
      name: 'p7',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/23/9y4m.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/23/9y4m.jpg'
    },
    {
      name: 'p8',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/16/r0qr.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/16/r0qr.jpg'
    },
    {
      name: 'p9',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/266/f2bm.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/266/f2bm.jpg'
    },
    {
      name: 'p10',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/689/qfab.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/689/qfab.jpg'
    },
    {
      name: 'p11',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/694/3add.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/694/3add.jpg'
    },
    {
      name: 'p12',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/41/qbtt.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/41/qbtt.jpg'
    },
    {
      name: 'p14',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/825/pp7d.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/825/pp7d.jpg'
    },
    {
      name: 'p16',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/407/ef0k.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/407/ef0k.jpg'
    },
    {
      name: 'p17',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/585/8cea.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/585/8cea.jpg'
    },
    {
      name: 'p20',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/43/kv56.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/43/kv56.jpg'
    },
    {
      name: 'p21',
      fullsize: 'http://imagizer.imageshack.us/v2/1024x768q90/209/gyy6.jpg',
      thumb: 'http://imagizer.imageshack.us/v2/320x240q90/209/gyy6.jpg'
    }
  ];
var app = angular.module('sunflower');
app.controller('MainCtrl', [
  '$scope',
  '$routeParams',
  '$location',
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
      var pictures = $scope.pictures, length = pictures.length, i = 0;
      for (; i < length; i++) {
        if (pictures[i].name === name) {
          return {
            curr: pictures[i],
            prev: i - 1 < 0 ? pictures[length - 1] : pictures[i - 1],
            next: i + 1 >= length ? pictures[0] : pictures[i + 1]
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
  }
]);
app.controller('NavCtrl', [
  '$scope',
  '$location',
  '$rootScope',
  function ($scope, $location, $rootScope) {
    $scope.menuItems = menuItems;
    $scope.show = true;
    $scope.$on('$routeChangeSuccess', function (event, current) {
      $rootScope.title = current.$$route.title;
      $scope.menuItems.forEach(function (item) {
        var regex = new RegExp(item.url), path = $location.path();
        item.isActive = false;
        if (item.url === '/' && path === '/') {
          item.isActive = true;
        } else if (item.url === '/') {
          item.isActive = false;
        } else {
          item.isActive = regex.test(path);
        }
      });
      $scope.show = !/gallery\/.+/.test($location.path());
      $scope.scalable = $scope.show ? 'no' : 'yes';
    });
  }
]);